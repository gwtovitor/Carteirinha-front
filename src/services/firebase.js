// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDvElxNxM716wZitmaoybzDhKg3104p89E',
	authDomain: 'ace-axon-382401.firebaseapp.com',
	projectId: 'ace-axon-382401',
	storageBucket: 'ace-axon-382401.appspot.com',
	messagingSenderId: '390678632839',
	appId: '1:390678632839:web:0841d9efccde4f9f1b5b22',
	measurementId: 'G-LL280ZW8RR',
};

export const firbaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firbaseApp);

export const firebaseStorage = getStorage(firbaseApp);
