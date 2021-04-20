import { cleanAdmParameterCategory } from './../../models/AdmParameterCategory';
import { Component, OnInit } from '@angular/core';
import { AdmParameterCategory } from '../../models/AdmParameterCategory';

@Component({
  selector: 'app-adm-parameter-category-edit',
  templateUrl: './adm-parameter-category-edit.component.html',
  styleUrls: ['./adm-parameter-category-edit.component.css']
})
export class AdmParameterCategoryEditComponent implements OnInit {

  admParameterCategory: AdmParameterCategory;

  submitted: boolean;

  constructor() { }

  ngOnInit(): void {
    this.admParameterCategory = {};
    // this.admParameterCategory = this.storageService.getPersistedObj('admParameterCategory') as AdmParameterCategory;
  }

  onClean(): void {
    this.admParameterCategory = cleanAdmParameterCategory;
  }

}
