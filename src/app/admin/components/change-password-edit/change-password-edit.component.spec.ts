import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordEditComponent } from './change-password-edit.component';

describe('ChangePasswordEditComponent', () => {
  let component: ChangePasswordEditComponent;
  let fixture: ComponentFixture<ChangePasswordEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
