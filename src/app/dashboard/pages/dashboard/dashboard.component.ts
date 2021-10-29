import { Component, OnInit } from '@angular/core';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {FoldersQuery} from '../../../services/folders/state/folders.query';
import {FoldersService} from '../../../services/folders/state/folders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  edit = faEdit;

  constructor(
    public foldersQuery: FoldersQuery,
    public foldersService: FoldersService
  ) { }

  ngOnInit(): void {
  }

}
