import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySmarterLoginComponent } from './study-smarter-login.component';

describe('StudySmarterLoginComponent', () => {
  let component: StudySmarterLoginComponent;
  let fixture: ComponentFixture<StudySmarterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudySmarterLoginComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySmarterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
