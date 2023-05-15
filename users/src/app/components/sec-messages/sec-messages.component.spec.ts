import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecMessagesComponent } from './sec-messages.component';

describe('SecMessagesComponent', () => {
  let component: SecMessagesComponent;
  let fixture: ComponentFixture<SecMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
