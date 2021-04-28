import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { PickListModule } from 'primeng/picklist';
import { TreeModule } from 'primeng/tree';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AdmParameterComponent } from './admin/components/adm-parameter/adm-parameter.component';
import { AdmParameterCategoryComponent } from './admin/components/adm-parameter-category/adm-parameter-category.component';
import { AdmParameterCategoryEditComponent } from './admin/components/adm-parameter-category-edit/adm-parameter-category-edit.component';
import { AdmParameterEditComponent } from './admin/components/adm-parameter-edit/adm-parameter-edit.component';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ReportPanelComponent } from './base/components/report-panel/report-panel.component';
import { StorageService } from './base/services/StorageService';
import { AdmMenuComponent } from './admin/components/adm-menu/adm-menu.component';
import { AdmPageComponent } from './admin/components/adm-page/adm-page.component';
import { AdmPageEditComponent } from './admin/components/adm-page-edit/adm-page-edit.component';
import { AdmProfileComponent } from './admin/components/adm-profile/adm-profile.component';
import { AdmProfileEditComponent } from './admin/components/adm-profile-edit/adm-profile-edit.component';
import { AdmUserComponent } from './admin/components/adm-user/adm-user.component';
import { AdmUserEditComponent } from './admin/components/adm-user-edit/adm-user-edit.component';
import { AdmProfileService } from './admin/services/AdmProfileService';
import { AdmPageService } from './admin/services/AdmPageService';
import { ChangePasswordEditComponent } from './admin/components/change-password-edit/change-password-edit.component';
import { LoginComponent } from './admin/components/login/login.component';
import { ExportService } from './base/services/export.service';
import { BarraMenuComponent } from './base/components/barra-menu/barra-menu.component';
import { ErrorService } from './base/services/error.service';

@NgModule({
    declarations: [
        AppComponent,
        AdmParameterComponent,
        AdmParameterCategoryComponent,
        AdmParameterCategoryEditComponent,
        AdmParameterEditComponent,
        ReportPanelComponent,
        AdmMenuComponent,
        AdmPageComponent,
        AdmPageEditComponent,
        AdmProfileComponent,
        AdmProfileEditComponent,
        AdmUserComponent,
        AdmUserEditComponent,
        ChangePasswordEditComponent,
        LoginComponent,
        BarraMenuComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        ConfirmDialogModule,
        RatingModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        ButtonModule,
        AppRoutingModule,
        MenubarModule,
        DropdownModule,
        PanelModule,
        CheckboxModule,
        MessagesModule,
        MessageModule,
        PickListModule,
        TreeModule,
        PasswordModule,
        ToastModule
    ],
    providers: [ConfirmationService, MessageService,
        StorageService, ExportService, ErrorService,
        AdmProfileService, AdmPageService],
    bootstrap: [AppComponent]
})
export class AppModule { }
