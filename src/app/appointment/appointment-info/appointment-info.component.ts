import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from '../../services/appointment.service';
import firebase  from 'firebase';


@Component({
  selector: 'app-appointment-info',
  templateUrl: './appointment-info.component.html',
  styleUrls: ['./appointment-info.component.scss']
})
export class AppointmentInfoComponent implements OnInit {
  appointment: Appointment ;
  isUpdateAppointment = false;
  checkAppointment = true;
  isAuth: boolean;
  constructor(
    private route: ActivatedRoute,
    private appointmentsService:  AppointmentsService,
    private router: Router) 
    { }

  ngOnInit() {
    this.appointment = new Appointment ('', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.appointmentsService.getSingleAppointment(+id).then(
      (appointment: Appointment ) => {
        if (appointment === null) {
          this.checkAppointment = false;
        } else {
          this.appointment = appointment;
        }
      }
    );
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
  onBack() {
    this.router.navigate(['/appointments']);
  }

  onUpdateAppointment() {
    this.isUpdateAppointment = true;
  }


  onDeleteAppointment() {
    this.appointmentsService.removeAppointment(this.appointment);
    this.onBack();
  }

}