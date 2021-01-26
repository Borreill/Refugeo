import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentsService } from '../../services/appointment.service';
import { Router } from '@angular/router';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  appointmentForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  fileTooBig = false;

  constructor(private formBuilder: FormBuilder,
    private appointmentsService: AppointmentsService,
    private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.appointmentForm = this.formBuilder.group({
      reason: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      volunteer: ['', Validators.required],
      description: [''],
    });
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.appointmentsService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        this.fileTooBig = false;
      }
    );
  }

  onSaveAppointment() {
    const reason = this.appointmentForm.get('reason').value;
    const appointmentDate = this.appointmentForm.get('appointmentDate').value;
    const volunteer = this.appointmentForm.get('volunteer').value;
    const description = this.appointmentForm.get('description').value;
    const newAppointment = new Appointment(reason, appointmentDate, volunteer, description);
    newAppointment.description = description;
    if (this.fileUrl && this.fileUrl !== '') {
      newAppointment.photo = this.fileUrl;
    }
    this.appointmentsService.createNewAppointment(newAppointment);
    this.router.navigate(['/appointments']);
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
