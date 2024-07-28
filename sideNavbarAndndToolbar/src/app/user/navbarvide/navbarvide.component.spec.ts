import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarvideComponent } from './navbarvide.component';

describe('NavbarvideComponent', () => {
  let component: NavbarvideComponent;
  let fixture: ComponentFixture<NavbarvideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarvideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarvideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
