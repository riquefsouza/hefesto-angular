import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmParameterCategoryComponent } from './adm-parameter-category.component';

describe('AdmParameterCategoryComponent', () => {
  let component: AdmParameterCategoryComponent;
  let fixture: ComponentFixture<AdmParameterCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmParameterCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmParameterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
