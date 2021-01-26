import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostFamiliesService } from '../../services/host-family.service';
import { Router } from '@angular/router';
import { HostFamily } from '../../models/hostFamily.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-host-family-form',
  templateUrl: './host-family-form.component.html',
  styleUrls: ['./host-family-form.component.scss']
})
export class HostFamilyFormComponent implements OnInit {

  hostFamilyForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  fileTooBig = false;

  constructor(private formBuilder: FormBuilder,
    private hostfamiliesService: HostFamiliesService,
    private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.hostFamilyForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^((\\+)33|0)[1-9](\\d{2}){4}$'), Validators.minLength(10) ]],
      observation: [''],
    });
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.hostfamiliesService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        this.fileTooBig = false;
      }
    );
  }

  onSaveHostFamily() {
    const firstName = this.hostFamilyForm.get('firstName').value;
    const lastName = this.hostFamilyForm.get('lastName').value;
    const address = this.hostFamilyForm.get('address').value;
    const phone = this.hostFamilyForm.get('phone').value;
    const observation = this.hostFamilyForm.get('observation').value;
    const newHostFamily = new HostFamily(firstName, lastName, address, phone, observation);
    newHostFamily.observation = observation;
    if (this.fileUrl && this.fileUrl !== '') {
      newHostFamily.photo = this.fileUrl;
    }
    this.hostfamiliesService.createNewHostFamily(newHostFamily);
    this.router.navigate(['host-families']);
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}



