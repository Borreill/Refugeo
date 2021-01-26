import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HostFamily } from 'src/app/models/hostFamily.model';
import { HostFamiliesService } from 'src/app/services/host-family.service';


@Component({
  selector: 'app-update-host-family',
  templateUrl: './update-host-family.component.html',
  styleUrls: ['./update-host-family.component.scss']
})
export class UpdateHostFamilyComponent implements OnInit {

  hostFamilyFormUpdate: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  fileTooBig = false;
  @Input()  hostFamily: HostFamily;


  constructor(
    private formBuilder: FormBuilder,
    private hostFamiliesService: HostFamiliesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.hostFamilyFormUpdate = this.formBuilder.group({
      firstName: [this.hostFamily.firstName, Validators.required],
      lastName: [this.hostFamily.lastName, Validators.required],
      address: [this.hostFamily.address, Validators.required],
      phone : [this.hostFamily.phone, [Validators.required, Validators.pattern('^((\\+)33|0)[1-9](\\d{2}){4}$'), Validators.minLength(10)]],
      observation: [this.hostFamily.observation]
    });
  }

  onUpdateHostFamilyInfo() {
    const firstName = this.hostFamilyFormUpdate.get('firstName').value;
    const lastName = this.hostFamilyFormUpdate.get('lastName').value;
    const address = this.hostFamilyFormUpdate.get('address').value;
    const phone = this.hostFamilyFormUpdate.get('phone').value;
    const observation = this.hostFamilyFormUpdate.get('observation').value;
    const newHostFamily = new HostFamily(firstName, lastName, address, phone, observation);
    if (this.fileUrl && this.fileUrl !== '') {
      newHostFamily.photo = this.fileUrl;
    }
    this.hostFamiliesService.updateHostFamilyInfo(this.hostFamily, newHostFamily);
    this.router.navigate(['/host-families']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.hostFamiliesService.uploadFile(file).then(
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
