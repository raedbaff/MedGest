import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecPatientProfileComponent } from './sec-patient-profile.component';

describe('SecPatientProfileComponent', () => {
  let component: SecPatientProfileComponent;
  let fixture: ComponentFixture<SecPatientProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecPatientProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecPatientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
