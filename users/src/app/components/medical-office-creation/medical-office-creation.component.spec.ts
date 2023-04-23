import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalOfficeCreationComponent } from './medical-office-creation.component';

describe('MedicalOfficeCreationComponent', () => {
  let component: MedicalOfficeCreationComponent;
  let fixture: ComponentFixture<MedicalOfficeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalOfficeCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalOfficeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
