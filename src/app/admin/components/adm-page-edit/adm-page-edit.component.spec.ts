import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPageEditComponent } from './adm-page-edit.component';

describe('AdmPageEditComponent', () => {
  let component: AdmPageEditComponent;
  let fixture: ComponentFixture<AdmPageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmPageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmPageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
