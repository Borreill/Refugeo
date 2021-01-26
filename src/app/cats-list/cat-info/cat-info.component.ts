import { Component, OnInit } from '@angular/core';
import { Cat } from '../../models/cat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CatsService } from '../../services/cats.service';
import firebase from 'firebase';

@Component({
  selector: 'app-cat-info',
  templateUrl: './cat-info.component.html',
  styleUrls: ['./cat-info.component.scss']
})
export class CatInfoComponent implements OnInit {
  cat: Cat;
  isUpdate = false;
  check = true;
  isAuth: boolean;

  constructor(
    private route: ActivatedRoute,
    private catsService: CatsService,
    private router: Router) { }

  ngOnInit() {
    this.cat = new Cat('', '', '', '', '', '', '', '', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.catsService.getSingleCat(+id).then(
      (cat: Cat) => {
        if (cat === null) {
          this.check = false;
        } else {
          this.cat = cat;
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
    this.router.navigate(['/cats']);
  }


  onUpdate() {
    this.isUpdate = true;
  }


  onDeleteCat() {
    this.catsService.removeCat(this.cat);
    this.onBack();
  }
}