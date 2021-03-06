import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {createSite, Site} from '../../../../models/site.model';
import {FoldersService} from '../../../../services/folders/state/folders.service';
import {environment} from '../../../../../environments/environment';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {FoldersQuery} from '../../../../services/folders/state/folders.query';
import {createSiteImage} from '../../../../models/site-image.model';

@Component({
  selector: 'app-create-edit-site-modal',
  templateUrl: './create-edit-site-modal.component.html',
  styleUrls: ['./create-edit-site-modal.component.scss']
})
export class CreateEditSiteModalComponent implements OnInit, OnDestroy {
  @Input() openModal: Observable<Site>;

  fileList: [] = [];
  site: Site;
  isVisible = false;
  check = faCheckCircle;
  folderId: number;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private foldersService: FoldersService,
    public foldersQuery: FoldersQuery,
  ) { }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(site => {
      this.site = site.id === 0 ? site : createSite(site);
      this.folderId = site.folderId;
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveSite(): Promise<void> {
    if (this.site.id === 0) {
      await this.foldersService.createSite(this.site);
    } else {
      await this.foldersService.updateSite(this.site, this.folderId);
    }

    this.closeModal();
  }

  closeModal(): void {
    this.fileList = [];
    this.isVisible = false;
  }

  getUploadPath(): string {
    return `${environment.apiUrl}/site-image`;
  }

  handleChange({file}): void {
    const status = file.status;

    if (status === 'done') {
      this.site.siteImage = createSiteImage(file.response);
    }
  }
}
