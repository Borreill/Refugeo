import { Component, OnInit } from '@angular/core';
import { Dog } from '../../models/dog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DogsService } from '../../services/dogs.service';
import firebase from 'firebase';

@Component({
  selector: 'app-dog-info',
  templateUrl: './dog-info.component.html',
  styleUrls: ['./dog-info.component.scss']
})
export class DogInfoComponent implements OnInit {
  dog: Dog;
  isUpdate = false;
  check = true;
  isAuth: boolean;

  constructor(
    private route: ActivatedRoute,
    private dogsService: DogsService,
    private router: Router) { }

  ngOnInit() {
    this.dog = new Dog('', '', '', '', '', '', '', '', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.dogsService.getSingleDog(+id).then(
      (dog: Dog) => {
        if (dog === null) {
          this.check = false;
        } else {
          this.dog = dog;
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
    this.router.navigate(['/dogs']);
  }


  onUpdate() {
    this.isUpdate = true;
  }


  onDeleteDog() {
    this.dogsService.removeDog(this.dog);
    this.onBack();
  }
}