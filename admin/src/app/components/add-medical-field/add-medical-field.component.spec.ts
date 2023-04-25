import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicalFieldComponent } from './add-medical-field.component';

describe('AddMedicalFieldComponent', () => {
  let component: AddMedicalFieldComponent;
  let fixture: ComponentFixture<AddMedicalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMedicalFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
