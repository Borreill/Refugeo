import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  appointments: Appointment[] = [];
  appointmentsSubject = new Subject<Appointment[]>();

  constructor() {
  }

  emitAppointments() {
    this.appointmentsSubject.next(this.appointments);
  }

  saveAppointments() {
    firebase.database().ref('/appointments').set(this.appointments);
  }

  getAppointments() {
    firebase.database().ref('/appointments')
      .on('value', (data) => {
        this.appointments = data.val() ? data.val() : [];
        this.emitAppointments();
      });
  }

  getSingleAppointment(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/appointments/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewAppointment(newAppointments: Appointment) {
    this.appointments.push(newAppointments);
    this.saveAppointments();
    this.emitAppointments();
  }

  updateAppointmentInfo(appointments: Appointment, newAppointments: Appointment) {
    this.removeAppointment(appointments);
    this.appointments.push(newAppointments);
    this.saveAppointments();
    this.emitAppointments();
  }

  removeAppointment(appointments: Appointment) {
    if (appointments.photo) {
      const storageRef = firebase.storage().refFromURL(appointments.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimé!');
        },
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    const appointmentsIndexToRemove = this.appointments.findIndex(
      (appointmentsEl) => {
        if (appointmentsEl === appointments) {
          return true;
        }
      }
    );
    this.appointments.splice(appointmentsIndexToRemove, 1);
    this.saveAppointments();
    this.emitAppointments();
  }


  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}