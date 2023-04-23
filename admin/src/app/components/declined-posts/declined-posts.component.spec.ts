import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedPostsComponent } from './declined-posts.component';

describe('DeclinedPostsComponent', () => {
  let component: DeclinedPostsComponent;
  let fixture: ComponentFixture<DeclinedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclinedPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
