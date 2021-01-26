import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HostFamily } from '../models/hostFamily.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class HostFamiliesService {

  hostFamilies: HostFamily[] = [];
  hostFamiliesSubject = new Subject<HostFamily[]>();

  constructor() {
  }

  emitHostFamilies() {
    this.hostFamiliesSubject.next(this.hostFamilies);
  }

  saveHostFamilies() {
    firebase.database().ref('/host-families').set(this.hostFamilies);
  }

  getHostFamilies() {
    firebase.database().ref('/host-families')
      .on('value', (data) => {
        this.hostFamilies = data.val() ? data.val() : [];
        this.emitHostFamilies();
      });
  }

  getSingleHostFamily(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/host-families/' + id).once('value').then(
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

  createNewHostFamily(newHostFamilies: HostFamily) {
    this.hostFamilies.push(newHostFamilies);
    this.saveHostFamilies();
    this.emitHostFamilies();
  }

  updateHostFamilyInfo(hostFamilies: HostFamily, newHostFamilies: HostFamily) {
    this.removeHostFamily(hostFamilies);
    this.hostFamilies.push(newHostFamilies);
    this.saveHostFamilies();
    this.emitHostFamilies();
  }

  removeHostFamily(hostFamilies: HostFamily) {
    if (hostFamilies.photo) {
      const storageRef = firebase.storage().refFromURL(hostFamilies.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimé!');
        },
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    const hostFamiliesIndexToRemove = this.hostFamilies.findIndex(
      (hostFamiliesEl) => {
        if (hostFamiliesEl === hostFamilies) {
          return true;
        }
      }
    );
    this.hostFamilies.splice(hostFamiliesIndexToRemove, 1);
    this.saveHostFamilies();
    this.emitHostFamilies();
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