import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmParameterComponent } from './adm-parameter.component';

describe('AdmParameterComponent', () => {
  let component: AdmParameterComponent;
  let fixture: ComponentFixture<AdmParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
