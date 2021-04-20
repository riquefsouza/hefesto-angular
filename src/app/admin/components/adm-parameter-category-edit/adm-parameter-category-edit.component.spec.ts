import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmParameterCategoryEditComponent } from './adm-parameter-category-edit.component';

describe('AdmParameterCategoryEditComponent', () => {
  let component: AdmParameterCategoryEditComponent;
  let fixture: ComponentFixture<AdmParameterCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmParameterCategoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmParameterCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
