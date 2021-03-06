import { Component, OnInit } from '@angular/core';
import {FoldersQuery} from '../../../../services/folders/state/folders.query';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';
import {createFolder, Folder} from '../../../../models/folder.model';
import {Site} from '../../../../models/site.model';
import {FoldersService} from '../../../../services/folders/state/folders.service';

@Component({
  selector: 'app-folder-grid',
  templateUrl: './folder-grid.component.html',
  styleUrls: ['./folder-grid.component.scss']
})
export class FolderGridComponent implements OnInit {
  add = faPlus;
  openFolderModal: Subject<Folder> = new Subject<Folder>();
  openSiteModal: Subject<Site> = new Subject<Site>();

  constructor(
    public foldersQuery: FoldersQuery,
    public foldersService: FoldersService,
  ) { }

  ngOnInit(): void {
  }

  createFolder(): void {
    const folder = createFolder({id: 0});
    this.openFolderModal.next(folder);
  }

}
