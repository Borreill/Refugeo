import { Component, OnInit, OnDestroy } from '@angular/core';
import { Appointment  } from '../models/appointment.model';
import { Subscription } from 'rxjs/Subscription';
import { AppointmentsService } from '../services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import firebase  from 'firebase';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit, OnDestroy  {

  appointments: Appointment[];
  appointmentsSubscription: Subscription;
  isAuth: boolean;

  constructor(
    private route: ActivatedRoute,
    private appointmentsService: AppointmentsService,
    private router: Router,
    
    ) {}

  ngOnInit() {
    this.appointmentsSubscription = this.appointmentsService.appointmentsSubject.subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;
      }
    );
    this.appointmentsService.getAppointments();
    this.appointmentsService.emitAppointments();

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );

  }


  onNewAppointment() {
    this.router.navigate(['/appointments', 'new']);
  }

  onDeleteAppointment(appointment : Appointment) {
    this.appointmentsService.removeAppointment(appointment);
  }

  onViewAppointment(id: number) {
    this.router.navigate(['/appointments', 'view', id]);
  }

  ngOnDestroy() {
    this.appointmentsSubscription.unsubscribe();
  }

}
