import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardLayoutComponent} from './dashboard-layout/dashboard-layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import { FolderGridComponent } from './components/dashboard/folder-grid/folder-grid.component';
import { FolderComponent } from './components/dashboard/folder/folder.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { CreateEditFolderModalComponent } from './components/dashboard/create-edit-folder-modal/create-edit-folder-modal.component';
import {FormsModule} from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CreateEditSiteModalComponent } from './components/dashboard/create-edit-site-modal/create-edit-site-modal.component';
import { SiteComponent } from './components/dashboard/site/site.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SortedSitesPipe } from './pipes/sorted-sites.pipe';
import {NzSelectModule} from 'ng-zorro-antd/select';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardComponent,
    FolderGridComponent,
    FolderComponent,
    CreateEditFolderModalComponent,
    CreateEditSiteModalComponent,
    SiteComponent,
    SortedSitesPipe
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NzLayoutModule,
        NzMenuModule,
        NzButtonModule,
        FontAwesomeModule,
        NzModalModule,
        NzInputModule,
        FormsModule,
        NzDropDownModule,
        NzUploadModule,
        NzPopconfirmModule,
        NzToolTipModule,
        DragDropModule,
        NzSelectModule,
    ]
})
export class DashboardModule {
}
