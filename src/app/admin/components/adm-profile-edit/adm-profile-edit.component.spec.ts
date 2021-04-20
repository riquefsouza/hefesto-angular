import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmProfileEditComponent } from './adm-profile-edit.component';

describe('AdmProfileEditComponent', () => {
  let component: AdmProfileEditComponent;
  let fixture: ComponentFixture<AdmProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmProfileEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
