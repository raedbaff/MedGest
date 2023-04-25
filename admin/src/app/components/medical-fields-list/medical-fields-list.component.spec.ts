import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalFieldsListComponent } from './medical-fields-list.component';

describe('MedicalFieldsListComponent', () => {
  let component: MedicalFieldsListComponent;
  let fixture: ComponentFixture<MedicalFieldsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalFieldsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalFieldsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
