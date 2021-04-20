import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmMenuComponent } from './admin/components/adm-menu/adm-menu.component';
import { AdmPageEditComponent } from './admin/components/adm-page-edit/adm-page-edit.component';
import { AdmPageComponent } from './admin/components/adm-page/adm-page.component';
import { AdmParameterCategoryEditComponent } from './admin/components/adm-parameter-category-edit/adm-parameter-category-edit.component';
import { AdmParameterCategoryComponent } from './admin/components/adm-parameter-category/adm-parameter-category.component';
import { AdmParameterEditComponent } from './admin/components/adm-parameter-edit/adm-parameter-edit.component';
import { AdmParameterComponent } from './admin/components/adm-parameter/adm-parameter.component';
import { AdmProfileEditComponent } from './admin/components/adm-profile-edit/adm-profile-edit.component';
import { AdmProfileComponent } from './admin/components/adm-profile/adm-profile.component';
import { AdmUserEditComponent } from './admin/components/adm-user-edit/adm-user-edit.component';
import { AdmUserComponent } from './admin/components/adm-user/adm-user.component';
import { ChangePasswordEditComponent } from './admin/components/change-password-edit/change-password-edit.component';
import { LoginComponent } from './admin/components/login/login.component';

const routes: Routes = [
  { path: 'admParameterCategory', component: AdmParameterCategoryComponent },
  { path: 'admParameterCategoryEdit', component: AdmParameterCategoryEditComponent },
  { path: 'admParameter', component: AdmParameterComponent },
  { path: 'admParameterEdit', component: AdmParameterEditComponent },
  { path: 'admPage', component: AdmPageComponent },
  { path: 'admPageEdit', component: AdmPageEditComponent },
  { path: 'admProfile', component: AdmProfileComponent },
  { path: 'admProfileEdit', component: AdmProfileEditComponent },
  { path: 'admUser', component: AdmUserComponent },
  { path: 'admUserEdit', component: AdmUserEditComponent },
  { path: 'admMenu', component: AdmMenuComponent },
  { path: 'changePasswordEdit', component: ChangePasswordEditComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }