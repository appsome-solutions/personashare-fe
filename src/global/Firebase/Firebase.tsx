import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  auth: firebase.auth.Auth;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);

      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    }

    this.auth = firebase.auth();
    firebase.auth().useDeviceLanguage();
  }

  getCurrentUser = (): firebase.User | null => firebase.auth().currentUser;

  googleProvider = (scope?: string): firebase.auth.GoogleAuthProvider => {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope(scope || 'https://www.googleapis.com/auth/userinfo.profile');

    return provider;
  };

  emailAndPasswordProvider = (): firebase.auth.EmailAuthProvider => new firebase.auth.EmailAuthProvider();

  createUserWithEmailAndPassword = async (email: string, password: string): Promise<firebase.auth.UserCredential> =>
    await firebase.auth().createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = async (email: string, password: string): Promise<firebase.auth.UserCredential> =>
    await firebase.auth().signInWithEmailAndPassword(email, password);

  signIn = async (provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> =>
    await firebase.auth().signInWithPopup(provider);

  signOut = async (): Promise<void> => await firebase.auth().signOut();
}

export default Firebase;
