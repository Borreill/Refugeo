import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dog } from '../models/dog.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  dogs: Dog[] = [];
  dogsSubject = new Subject<Dog[]>();

  constructor() {
  }

  emitDogs() {
    this.dogsSubject.next(this.dogs);
  }

  saveDogs() {
    firebase.database().ref('/dogs').set(this.dogs);
  }

  getDogs() {
    firebase.database().ref('/dogs')
      .on('value', (data) => {
        this.dogs = data.val() ? data.val() : [];
        this.emitDogs();
      });
  }

  getSingleDog(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/dogs/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewDog(newDogs: Dog) {
    this.dogs.push(newDogs);
    this.saveDogs();
    this.emitDogs();
  }

  updateDogInfo(dogs: Dog, newDogs: Dog) {
    this.removeDog(dogs);
    this.dogs.push(newDogs);
    this.saveDogs();
    this.emitDogs();
  }

  removeDog(dogs: Dog) {
    if (dogs.photo) {
      const storageRef = firebase.storage().refFromURL(dogs.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimé!');
        },
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    const dogsIndexToRemove = this.dogs.findIndex(
      (dogsEl) => {
        if (dogsEl === dogs) {
          return true;
        }
      }
    );
    this.dogs.splice(dogsIndexToRemove, 1);
    this.saveDogs();
    this.emitDogs();
  }


  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}