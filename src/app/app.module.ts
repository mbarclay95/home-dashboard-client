import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {environment} from '../environments/environment';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {IconDefinition} from '@ant-design/icons-angular';
import {NzIconModule} from 'ng-zorro-antd/icon';

import { DeleteOutline, DownloadOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [DeleteOutline, DownloadOutline];

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NzIconModule.forRoot(icons),
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
