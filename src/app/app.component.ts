import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shopping-list';
  loadedFeature = 'recipe';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: 'AIzaSyBBHK761GdV7qSR3L4Mrp8JMHj7fitqxVo',
      authDomain: 'ng-shopping-list-5fdbc.firebaseapp.com'
    });
  }
}

