import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cat } from 'src/app/models/cat.model';
import { CatsService } from 'src/app/services/cats.service';


@Component({
  selector: 'app-update-cat',
  templateUrl: './update-cat.component.html',
  styleUrls: ['./update-cat.component.scss']
})
export class UpdateCatComponent implements OnInit {

  catFormUpdate: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  fileTooBig = false;
  @Input() cat: Cat;


  constructor(
    private formBuilder: FormBuilder,
    private catsService: CatsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.catFormUpdate = this.formBuilder.group({
      name: [this.cat.name, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$'),  Validators.minLength(4) ]],
      birthDate: [this.cat.birthDate, Validators.required],
      sex: [this.cat.sex,  [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      color: [this.cat.color, Validators.required],
      arrivalDate: [this.cat.arrivalDate, Validators.required],
      deworming: [this.cat.deworming],
      identificationNumber: [this.cat.identificationNumber,  Validators.maxLength(15)],
      description: [this.cat.description],
      status:  [this.cat.status, Validators.required],
      category:  [this.cat.category, Validators.required],
      vaccination:  [this.cat.vaccination]
    }, {validator: this.checkDates});
  }

  checkDates(group: FormGroup) {
    if((group.controls.deworming.value && group.controls.arrivalDate.value)< group.controls.birthDate.value) {
    return { notValid:true }
    }
    return null;
 }
  onUpdateCatInfo() {
    const name = this.catFormUpdate.get('name').value;
    const description = this.catFormUpdate.get('description').value;
    const birthDate = this.catFormUpdate.get('birthDate').value;
    const sex = this.catFormUpdate.get('sex').value;
    const color = this.catFormUpdate.get('color').value;
    const arrivalDate = this.catFormUpdate.get('arrivalDate').value;
    const deworming = this.catFormUpdate.get('deworming').value;
    const identificationNumber = this.catFormUpdate.get('identificationNumber').value;
    const status = this.catFormUpdate.get('status').value;
    const category = this.catFormUpdate.get('category').value;
    const vaccination = this.catFormUpdate.get('vaccination').value;
    const newCat = new Cat(name, birthDate, sex, color, arrivalDate, deworming, identificationNumber, description, status, category, vaccination);
    if (this.fileUrl && this.fileUrl !== '') {
      newCat.photo = this.fileUrl;
    }
    this.catsService.updateCatInfo(this.cat, newCat);
    this.router.navigate(['/cats']);
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
