import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dog } from '../models/dog.model';
import { Subscription } from 'rxjs/Subscription';
import { DogsService } from '../services/dogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.scss']
})
export class DogsListComponent implements OnInit, OnDestroy {
  dogs: Dog[];
  dogsSubscription: Subscription;
  isAuth: boolean;
  searchString: string = '';
  pipeDogFilter = '';
  pipeDogCategoryFilter = '';
  p: number = 1;

  constructor(
    private route: ActivatedRoute,
    private dogsService: DogsService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.dogsSubscription = this.dogsService.dogsSubject.subscribe(
      (dogs: Dog[]) => {
        this.dogs = dogs;
      }
    );
    this.dogsService.getDogs();
    this.dogsService.emitDogs();

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


  onNewDog() {
    this.router.navigate(['/dogs', 'new']);
  }

  onDeleteDog(dog: Dog) {
    this.dogsService.removeDog(dog);
  }

  onViewDog(id:number) {
    this.router.navigate(['/dogs', 'view', id]);
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
    this.dogsSubscription.unsubscribe();
  }

}
