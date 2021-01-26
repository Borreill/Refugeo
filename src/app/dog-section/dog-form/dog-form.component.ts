import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DogsService } from '../../services/dogs.service';
import { Router } from '@angular/router';
import { Dog } from '../../models/dog.model';

@Component({
  selector: 'app-dog-form',
  templateUrl: './dog-form.component.html',
  styleUrls: ['./dog-form.component.scss']
})
export class DogFormComponent implements OnInit {

  dogForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  fileTooBig = false;

  constructor(private formBuilder: FormBuilder,
    private dogsService:   DogsService,
    private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.dogForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$'),  Validators.minLength(4) ]],
      sex: ['', Validators.required],
      color: ['', [Validators.required, Validators.pattern('[a-zA-Z\u00C0-\u017F\\s]+')]],
      description: [''],
      arrivalDate: ['', Validators.required],
      deworming: [''],
      birthDate: ['' , Validators.required],
      identificationNumber: ['',  Validators.maxLength(15) ],
      status: ['', Validators.required],
      category: ['', Validators.required],
      vaccination: ['']
    }, {validator: this.checkDates});
    
  }
  
  checkDates(group: FormGroup) {
    if((group.controls.deworming.value && group.controls.arrivalDate.value)< group.controls.birthDate.value) {
    return { notValid:true }
    }
    return null;
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
    );
  }

  onSaveDog() {
    const name = this.dogForm.get('name').value;
    const birthDate = this.dogForm.get('birthDate').value;
    const sex = this.dogForm.get('sex').value;
    const color = this.dogForm.get('color').value;
    const arrivalDate = this.dogForm.get('arrivalDate').value;
    const deworming = this.dogForm.get('deworming').value;
    const identificationNumber = this.dogForm.get('identificationNumber').value;
    const description = this.dogForm.get('description').value;
    const status = this.dogForm.get('status').value;
    const category = this.dogForm.get('category').value;
    const vaccination = this.dogForm.get('vaccination').value;
    const newDog = new Dog(name, birthDate, sex, color, arrivalDate, deworming, identificationNumber, description, status, category, vaccination);
    newDog.description = description;
    if(this.fileUrl && this.fileUrl !== '') {
      newDog.photo = this.fileUrl;
    }
    if (this.dogForm.invalid) {
      return;
  }
    this.dogsService.createNewDog(newDog);
    this.router.navigate(['/dogs']);
}

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
