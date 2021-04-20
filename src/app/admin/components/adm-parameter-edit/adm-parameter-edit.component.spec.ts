import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmParameterEditComponent } from './adm-parameter-edit.component';

describe('AdmParameterEditComponent', () => {
  let component: AdmParameterEditComponent;
  let fixture: ComponentFixture<AdmParameterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmParameterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmParameterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
