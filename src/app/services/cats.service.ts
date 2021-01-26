import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cat } from '../models/cat.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  cats: Cat[] = [];
  catsSubject = new Subject<Cat[]>();

  constructor() {
  }

  emitCats() {
    this.catsSubject.next(this.cats);
  }

  saveCats() {
    firebase.database().ref('/cats').set(this.cats);
  }

  getCats() {
    firebase.database().ref('/cats')
      .on('value', (data) => {
        this.cats = data.val() ? data.val() : [];
        this.emitCats();
      });
  }

  getSingleCat(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/cats/' + id).once('value').then(
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

  createNewCat(newCats: Cat) {
    this.cats.push(newCats);
    this.saveCats();
    this.emitCats();
  }

  updateCatInfo(cats: Cat, newCats: Cat) {
    this.removeCat(cats);
    this.cats.push(newCats);
    this.saveCats();
    this.emitCats();
  }

  removeCat(cats: Cat) {
    if (cats.photo) {
      const storageRef = firebase.storage().refFromURL(cats.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimé!');
        },
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    const catsIndexToRemove = this.cats.findIndex(
      (catsEl) => {
        if (catsEl === cats) {
          return true;
        }
      }
    );
    this.cats.splice(catsIndexToRemove, 1);
    this.saveCats();
    this.emitCats();
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