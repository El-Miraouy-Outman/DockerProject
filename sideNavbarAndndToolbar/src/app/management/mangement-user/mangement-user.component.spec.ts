import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangementUserComponent } from './mangement-user.component';

describe('MangementUserComponent', () => {
  let component: MangementUserComponent;
  let fixture: ComponentFixture<MangementUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangementUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MangementUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
