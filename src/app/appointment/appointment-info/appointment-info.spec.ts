import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentInfoComponent } from './appointment-info.component';

describe('AppointmentInfoComponent', () => {
  let component: AppointmentInfoComponent;
  let fixture: ComponentFixture<AppointmentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
