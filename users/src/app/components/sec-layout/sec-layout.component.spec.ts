import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecLayoutComponent } from './sec-layout.component';

describe('SecLayoutComponent', () => {
  let component: SecLayoutComponent;
  let fixture: ComponentFixture<SecLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
