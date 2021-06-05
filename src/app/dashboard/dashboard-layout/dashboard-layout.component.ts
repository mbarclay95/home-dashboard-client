import { Component, OnInit } from '@angular/core';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {FoldersService} from '../../services/folders/state/folders.service';
import {FoldersQuery} from '../../services/folders/state/folders.query';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  edit = faEdit;

  constructor(
    public foldersService: FoldersService,
    public foldersQuery: FoldersQuery,
  ) { }

  ngOnInit(): void {
  }

}
