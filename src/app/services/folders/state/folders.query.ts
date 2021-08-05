import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FoldersStore, FoldersState } from './folders.store';
import {Observable} from 'rxjs';
import {Folder} from '../../../models/folder.model';
import {map, tap} from 'rxjs/operators';
import {NzSelectOptionInterface} from 'ng-zorro-antd/select';

@Injectable({ providedIn: 'root' })
export class FoldersQuery extends QueryEntity<FoldersState> {
  folders$: Observable<Folder[]> = this.selectAll();

  gridFormattedFolders$: Observable<Folder[][]> = this.folders$.pipe(
      map(o => {
        const filterAndSorted = o.filter(f => f.show).sort((a, b) => a.sort - b.sort);
        const gridFormattedFolders: Folder[][] = [];
        let temp: Folder[] = [];
        let counter = 0;

        for (const folder of filterAndSorted) {
          counter++;
          if (counter > 3) {
            counter = 0;
            gridFormattedFolders.push(temp);
            temp = [];
          }
          temp.push(folder);
        }
        if (temp.length > 0) {
          gridFormattedFolders.push(temp);
        }

        return gridFormattedFolders;
      })
  );

  folderOptions$: Observable<NzSelectOptionInterface[]> = this.folders$.pipe(
    map(folders => folders.map(folder => {
      return {
        label: folder.name,
        value: folder.id
      };
    }))
  );

  editMode$: Observable<boolean> = this.select('editMode');

  constructor(
    protected store: FoldersStore
  ) {
    super(store);
  }

  getEditMode(): boolean {
    return this.getValue().editMode;
  }

  findFolderBySort(sort: number): Folder {
    return this.getAll().find(f => f.sort === sort);
  }

  normalizeSort(sort: number): number {
    const maxSort = Math.max(...this.getAll().map(f => f.sort));
    if (sort > maxSort) {
      sort = 1;
    } else if (sort < 1) {
      sort = maxSort;
    }

    return sort;
  }

}
