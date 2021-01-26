import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatsService } from '../../services/cats.service';
import { Router } from '@angular/router';
import { Cat } from '../../models/cat.model';

@Component({
  selector: 'app-cat-form',
  templateUrl: './cat-form.component.html',
  styleUrls: ['./cat-form.component.scss']
})
export class CatFormComponent implements OnInit {

  catForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  fileTooBig = false;

  constructor(private formBuilder: FormBuilder,
    private catsService:   CatsService,
    private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.catForm = this.formBuilder.group({
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
    this.catsService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        this.fileTooBig = false;
      }
    );
  }

  onSaveCat() {
    const name = this.catForm.get('name').value;
    const birthDate = this.catForm.get('birthDate').value;
    const sex = this.catForm.get('sex').value;
    const color = this.catForm.get('color').value;
    const arrivalDate = this.catForm.get('arrivalDate').value;
    const deworming = this.catForm.get('deworming').value;
    const identificationNumber = this.catForm.get('identificationNumber').value;
    const description = this.catForm.get('description').value;
    const status = this.catForm.get('status').value;
    const category = this.catForm.get('category').value;
    const vaccination = this.catForm.get('vaccination').value;
    const newCat = new Cat(name, birthDate, sex, color, arrivalDate, deworming, identificationNumber, description, status, category, vaccination);
    newCat.description = description;
    if(this.fileUrl && this.fileUrl !== '') {
      newCat.photo = this.fileUrl;
    }
    if (this.catForm.invalid) {
      return;
  }
    this.catsService.createNewCat(newCat);
    this.router.navigate(['/cats']);
}

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
