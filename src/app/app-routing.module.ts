import { BarraMenuComponent } from './base/components/barra-menu/barra-menu.component';
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
import { AuthGuard } from './base/auth/auth.guard';
import { NotFoundComponent } from './base/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'home', canActivate: [AuthGuard], component: BarraMenuComponent },
  { path: 'admParameterCategory', canActivate: [AuthGuard], component: AdmParameterCategoryComponent },
  { path: 'admParameterCategoryEdit', canActivate: [AuthGuard], component: AdmParameterCategoryEditComponent },
  { path: 'admParameter', canActivate: [AuthGuard], component: AdmParameterComponent },
  { path: 'admParameterEdit', canActivate: [AuthGuard], component: AdmParameterEditComponent },
  { path: 'admPage', canActivate: [AuthGuard], component: AdmPageComponent },
  { path: 'admPageEdit', canActivate: [AuthGuard], component: AdmPageEditComponent },
  { path: 'admProfile', canActivate: [AuthGuard], component: AdmProfileComponent },
  { path: 'admProfileEdit', canActivate: [AuthGuard], component: AdmProfileEditComponent },
  { path: 'admUser', canActivate: [AuthGuard], component: AdmUserComponent },
  { path: 'admUserEdit', canActivate: [AuthGuard], component: AdmUserEditComponent },
  { path: 'admMenu', canActivate: [AuthGuard], component: AdmMenuComponent },
  { path: 'changePasswordEdit', canActivate: [AuthGuard], component: ChangePasswordEditComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
