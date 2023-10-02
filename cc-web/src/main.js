import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqrG5z76TH852Zol6SMTLrxWlgbRALUsM",
  authDomain: "campuscode-4623.firebaseapp.com",
  projectId: "campuscode-4623",
  storageBucket: "campuscode-4623.appspot.com",
  messagingSenderId: "971904164300",
  appId: "1:971904164300:web:6511b43261ce628d907d69",
  measurementId: "G-9RNM2QGB6P",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(App);

createApp(App).use(router).mount("#app");
