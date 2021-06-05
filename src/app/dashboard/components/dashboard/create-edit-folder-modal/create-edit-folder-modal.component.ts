import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {createFolder, Folder} from '../../../../models/folder.model';
import {takeUntil} from 'rxjs/operators';
import {FoldersService} from '../../../../services/folders/state/folders.service';

@Component({
  selector: 'app-create-edit-folder-modal',
  templateUrl: './create-edit-folder-modal.component.html',
  styleUrls: ['./create-edit-folder-modal.component.scss']
})
export class CreateEditFolderModalComponent implements OnInit, OnDestroy {
  @Input() openModal: Observable<Folder>;

  folder: Folder;
  isVisible = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public foldersService: FoldersService
  ) { }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(folder => {
      this.folder = folder.id === 0 ? folder : createFolder(folder);
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveFolder(): Promise<void> {
    if (this.folder.id === 0) {
      await this.foldersService.createFolder(this.folder);
    } else {
      await this.foldersService.updateFolder(this.folder);
    }

    this.isVisible = false;
  }
}
