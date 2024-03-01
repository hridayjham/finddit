import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA5sUNngPmqBGtRaYu2B9RZU6yshKW4StA',
  authDomain: 'finddit-18aa3.firebaseapp.com',
  projectId: 'finddit-18aa3',
  storageBucket: 'finddit-18aa3.appspot.com',
  messagingSenderId: '1086803235540',
  appId: '1:1086803235540:web:0b033a852363904e6b6141',
};
@Injectable()
export class DbService {
  private db: Firestore;

  constructor() {
    this.db = this.initFirebase();
  }

  private initFirebase(): Firestore {
    const app = initializeApp(firebaseConfig);
    return getFirestore(app);
  }
  getDB(): Firestore {
    return this.db;
  }
}
