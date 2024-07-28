import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyManagementComponent } from './body-management.component';

describe('BodyManagementComponent', () => {
  let component: BodyManagementComponent;
  let fixture: ComponentFixture<BodyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
