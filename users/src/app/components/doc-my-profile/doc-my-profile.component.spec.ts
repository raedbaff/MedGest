import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocMyProfileComponent } from './doc-my-profile.component';

describe('DocMyProfileComponent', () => {
  let component: DocMyProfileComponent;
  let fixture: ComponentFixture<DocMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocMyProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
