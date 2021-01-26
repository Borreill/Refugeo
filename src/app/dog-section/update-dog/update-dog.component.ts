import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dog } from 'src/app/models/dog.model';
import { DogsService } from 'src/app/services/dogs.service';


@Component({
  selector: 'app-update-dog',
  templateUrl: './update-dog.component.html',
  styleUrls: ['./update-dog.component.scss']
})
export class UpdateDogComponent implements OnInit {

  dogFormUpdate: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  fileTooBig = false;
  @Input() dog: Dog;


  constructor(
    private formBuilder: FormBuilder,
    private dogsService: DogsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.dogFormUpdate = this.formBuilder.group({
      name: [this.dog.name, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$'),  Validators.minLength(4) ]],
      birthDate: [this.dog.birthDate, Validators.required],
      sex: [this.dog.sex,  [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      color: [this.dog.color, Validators.required],
      arrivalDate: [this.dog.arrivalDate, Validators.required],
      deworming: [this.dog.deworming],
      identificationNumber: [this.dog.identificationNumber,  Validators.maxLength(15)],
      description: [this.dog.description],
      status:  [this.dog.status, Validators.required],
      category:  [this.dog.category, Validators.required],
      vaccination:  [this.dog.vaccination]
    }, {validator: this.checkDates});
  }

  checkDates(group: FormGroup) {
    if((group.controls.deworming.value && group.controls.arrivalDate.value)< group.controls.birthDate.value) {
    return { notValid:true }
    }
    return null;
 }
  onUpdateDogInfo() {
    const name = this.dogFormUpdate.get('name').value;
    const description = this.dogFormUpdate.get('description').value;
    const birthDate = this.dogFormUpdate.get('birthDate').value;
    const sex = this.dogFormUpdate.get('sex').value;
    const color = this.dogFormUpdate.get('color').value;
    const arrivalDate = this.dogFormUpdate.get('arrivalDate').value;
    const deworming = this.dogFormUpdate.get('deworming').value;
    const identificationNumber = this.dogFormUpdate.get('identificationNumber').value;
    const status = this.dogFormUpdate.get('status').value;
    const category = this.dogFormUpdate.get('category').value;
    const vaccination = this.dogFormUpdate.get('vaccination').value;
    const newDog = new Dog(name, birthDate, sex, color, arrivalDate, deworming, identificationNumber, description, status, category, vaccination);
    if (this.fileUrl && this.fileUrl !== '') {
      newDog.photo = this.fileUrl;
    }
    this.dogsService.updateDogInfo(this.dog, newDog);
    this.router.navigate(['/dogs']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.dogsService.uploadFile(file).then(
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
