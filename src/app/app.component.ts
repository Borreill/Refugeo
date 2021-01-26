import { Component } from '@angular/core';
import firebase  from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyCkrt1Te7kyQ5dO_CUWYUiDWkTPBazf58M",
      authDomain: "refugeo-4232c.firebaseapp.com",
      databaseURL: "https://refugeo-4232c-default-rtdb.firebaseio.com",
      projectId: "refugeo-4232c",
      storageBucket: "refugeo-4232c.appspot.com",
      messagingSenderId: "231477058738",
      appId: "1:231477058738:web:d0d706316519c4d2bcfdab",
      measurementId: "G-D791T3EPRE"
    };
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }
}
