import { auth, apps, initializeApp, User } from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  auth: auth.Auth;

  constructor() {
    if (!apps.length) {
      initializeApp(config);

      auth().setPersistence(auth.Auth.Persistence.LOCAL);
    }

    this.auth = auth();
    auth().useDeviceLanguage();
  }

  getCurrentUser = (): User | null => auth().currentUser;

  googleProvider = (scope?: string): auth.GoogleAuthProvider => {
    const provider = new auth.GoogleAuthProvider();

    provider.addScope(scope || 'https://www.googleapis.com/auth/userinfo.profile');

    return provider;
  };

  emailAndPasswordProvider = (): auth.EmailAuthProvider => new auth.EmailAuthProvider();

  createUserWithEmailAndPassword = async (email: string, password: string): Promise<auth.UserCredential> =>
    await auth().createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = async (email: string, password: string): Promise<auth.UserCredential> =>
    await auth().signInWithEmailAndPassword(email, password);

  signIn = async (provider: auth.AuthProvider): Promise<auth.UserCredential> => await auth().signInWithPopup(provider);

  signOut = async (): Promise<void> => await auth().signOut();
}

export default Firebase;
