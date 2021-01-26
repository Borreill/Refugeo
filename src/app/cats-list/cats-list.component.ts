import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cat } from '../models/cat.model';
import { Subscription } from 'rxjs/Subscription';
import { CatsService } from '../services/cats.service';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss']
})
export class CatsListComponent implements OnInit, OnDestroy {
  cats: Cat[];
  catsSubscription: Subscription;
  isAuth: boolean;
  searchString: string = '';
  pipeCatFilter = '';
  pipeCatCategoryFilter = '';
  p: number = 1;

  constructor(
    private route: ActivatedRoute,
    private catsService: CatsService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.catsSubscription = this.catsService.catsSubject.subscribe(
      (cats: Cat[]) => {
        this.cats = cats;
      }
    );
    this.catsService.getCats();
    this.catsService.emitCats();

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


  onNewCat() {
    this.router.navigate(['/cats', 'new']);
  }

  onDeleteCat(cat: Cat) {
    this.catsService.removeCat(cat);
  }

  onViewCat(id:number) {
    this.router.navigate(['/cats', 'view', id]);
  }

  

  getColor(status) {
    if (status == "A l'adoption") {
      return 'rgb(0, 189, 86)';
    } else if (status == "Réservé(e)") {
      return 'red'
    } else {
      return 'black';
    }
  }

  ngOnDestroy() {
    this.catsSubscription.unsubscribe();
  }

}