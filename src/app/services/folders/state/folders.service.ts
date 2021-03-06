import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {createFolder, Folder} from '../../../models/folder.model';
import {FoldersStore} from './folders.store';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {createSite, Site} from '../../../models/site.model';
import {arrayAdd, arrayRemove, arrayUpdate} from '@datorama/akita';
import {FoldersQuery} from './folders.query';

@Injectable({providedIn: 'root'})
export class FoldersService {

  constructor(
    private foldersStore: FoldersStore,
    private foldersQuery: FoldersQuery,
    private http: HttpClient
  ) {
  }

  async getFolders(): Promise<void> {
    await this.http.get<Folder[]>(`${environment.apiUrl}/folders`).pipe(
      map(o => o.map(f => createFolder(f))),
      tap(o => this.foldersStore.set(o))
    ).toPromise();
  }

  async createFolder(folder: Folder): Promise<void> {
    await this.http.post<Folder>(`${environment.apiUrl}/folders`, folder).pipe(
      map(f => createFolder(f)),
      tap(f => this.foldersStore.add(f))
    ).toPromise();
  }

  async updateFolder(folder: Folder): Promise<void> {
    await this.http.put<Folder>(`${environment.apiUrl}/folders/${folder.id}`, folder).pipe(
      map(f => createFolder(f)),
      tap(f => this.foldersStore.update(f.id, f))
    ).toPromise();
  }

  async deleteFolder(folderId: number): Promise<void> {
    await this.http.delete(`${environment.apiUrl}/folders/${folderId}`).toPromise();
    await this.getFolders(); // refresh so that sorts will be up to date
  }

  async createSite(site: Site): Promise<void> {
    await this.http.post<Site>(`${environment.apiUrl}/sites`, site).pipe(
      map(s => createSite(s)),
      tap(s => this.foldersStore.update(site.folderId, ({sites}) => ({
        sites: arrayAdd(sites, s)
      })))
    ).toPromise();
  }

  async updateSite(site: Site, oldFolderId: number): Promise<void> {
    await this.http.put<Site>(`${environment.apiUrl}/sites/${site.id}`, site).pipe(
      map(s => createSite(s)),
      tap(s => {
        if (s.folderId === oldFolderId) {
          this.foldersStore.update(site.folderId, ({sites}) => ({
            sites: arrayUpdate(sites, s.id, s)
          }));
        } else {
          this.foldersStore.update(oldFolderId, ({sites}) => ({
            sites: arrayRemove(sites, s.id)
          }));
          this.foldersStore.update(s.folderId, ({sites}) => ({
            sites: arrayAdd(sites, s)
          }));
        }
      })
    ).toPromise();
  }

  async deleteSite(folderId: number, siteId: number): Promise<void> {
    await this.http.delete(`${environment.apiUrl}/sites/${siteId}`).toPromise();
    await this.getFolders(); // refresh so that sorts will be up to date
  }

  toggleEditMode(): void {
    this.foldersStore.update({editMode: !this.foldersQuery.getEditMode()});
  }

  updateSiteCache(folderId: number, siteId: number, params: Partial<Site>): void {
    this.foldersStore.update(folderId, ({sites}) => ({
      sites: arrayUpdate(sites, siteId, params)
    }));
  }

  async updateSiteSort(movedSites: { id: number; sort: number }[]): Promise<void> {
    await this.http.patch(`${environment.apiUrl}/site-sorts`, {data: movedSites}).toPromise();
  }

  async moveFolder(folder: Folder, direction: number): Promise<void> {
    const oldSort = folder.sort;
    const newSort = this.foldersQuery.normalizeSort(folder.sort + direction);

    const otherFolder = this.foldersQuery.findFolderBySort(newSort);
    this.foldersStore.update(folder.id, {sort: newSort});
    this.foldersStore.update(otherFolder.id, {sort: oldSort});

    const movedFolders = [{id: folder.id, sort: newSort}, {id: otherFolder.id, sort: oldSort}];
    await this.http.patch(`${environment.apiUrl}/folder-sorts`, {data: movedFolders}).toPromise();
  }
}
