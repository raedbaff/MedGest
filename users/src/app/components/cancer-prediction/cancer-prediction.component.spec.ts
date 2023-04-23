import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancerPredictionComponent } from './cancer-prediction.component';

describe('CancerPredictionComponent', () => {
  let component: CancerPredictionComponent;
  let fixture: ComponentFixture<CancerPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancerPredictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancerPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
