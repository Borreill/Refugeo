import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentsService } from 'src/app/services/appointment.service';


@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.scss']
})
export class UpdateAppointmentComponent implements OnInit {

  appointmentFormUpdate: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  fileTooBig = false;
  @Input()  appointment: Appointment;


  constructor(
    private formBuilder: FormBuilder,
    private appointmentsService: AppointmentsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.appointmentFormUpdate = this.formBuilder.group({
      reason: [this.appointment.reason, Validators.required],
      appointmentDate: [this.appointment.appointmentDate, Validators.required],
      volunteer: [this.appointment.volunteer, Validators.required],
      description: [this.appointment.description]
    });
  }

  onUpdateAppointmentInfo() {
    const reason = this.appointmentFormUpdate.get('reason').value;
    const appointmentDate = this.appointmentFormUpdate.get('appointmentDate').value;
    const volunteer = this.appointmentFormUpdate.get('volunteer').value;  
    const description = this.appointmentFormUpdate.get('description').value;
    const newAppointment = new Appointment(reason, appointmentDate, volunteer, description);
    if (this.fileUrl && this.fileUrl !== '') {
      newAppointment.photo = this.fileUrl;
    }
    this.appointmentsService.updateAppointmentInfo(this.appointment, newAppointment);
    this.router.navigate(['/appointments']);
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
    ).catch(
      () => {
        this.fileTooBig = true;
        this.fileUploaded = false;
      });;
  }

  detectFile(eventOfDOM: any) {
    this.onUploadFile(eventOfDOM.target.files[0]);
  }

}
