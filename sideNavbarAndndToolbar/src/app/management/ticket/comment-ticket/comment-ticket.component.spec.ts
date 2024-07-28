import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentTicketComponent } from './comment-ticket.component';

describe('CommentTicketComponent', () => {
  let component: CommentTicketComponent;
  let fixture: ComponentFixture<CommentTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
