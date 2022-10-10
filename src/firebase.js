import { initializeApp } from 'firebase/app';
import {getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCXjLqmVSS1X7oDQ_zvK8ZLhoMsl2xJXSI",
    authDomain: "altbrew-15a03.firebaseapp.com",
    databaseURL: "https://altbrew-15a03-default-rtdb.firebaseio.com",
    projectId: "altbrew-15a03",
    storageBucket: "altbrew-15a03.appspot.com",
    messagingSenderId: "835564993768",
    appId: "1:835564993768:web:9bd2b89df74736cc785d5d",
    measurementId: "G-761WS9YZDH"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app 