import { auth, apps, initializeApp, User, app, storage, firestore, Unsubscribe } from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { APP_ROUTES } from '../AppRouter/routes';

// based on: https://github.com/firebase/extensions/blob/master/firestore-send-email/functions/src/index.ts
type FirebaseMessage = {
  subject: string;
  html: string;
};

type SendMailPayload = {
  to?: string;
  toUids?: string[];
  ccUids?: string[];
  bccUids?: string[];
  from?: string;
  replyTo?: string;
  headers?: any;
  cc?: string;
  bcc?: string;
  message: FirebaseMessage;
};

type SendMail = (payload: SendMailPayload) => Promise<firestore.DocumentReference>;

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const contactMailCollection = process.env.REACT_APP_FIREBASE_MAIL_SENDING_COLLECTION || 'contact-email';

class Firebase {
  auth: auth.Auth;
  firestore?: firestore.Firestore;
  app?: app.App;

  constructor() {
    if (!apps.length) {
      this.app = initializeApp(config);

      auth().setPersistence(auth.Auth.Persistence.LOCAL);
    }

    this.auth = auth();
    this.firestore = this.app?.firestore();
    auth().useDeviceLanguage();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAuthStateChanged = (observer: (user: User | null) => any): Unsubscribe => auth().onAuthStateChanged(observer);

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

  getStorageRef = (): storage.Reference | undefined => this.app?.storage().ref();

  sendMail: SendMail = payload =>
    this.firestore
      ? this.firestore
          .collection(contactMailCollection)
          .add({ ...payload, to: payload.to || process.env.REACT_APP_CONTACT_MAIL })
      : Promise.reject('Firestore is unavailable');

  sendPasswordResetEmail = async (email: string): Promise<void> => {
    await this.auth.sendPasswordResetEmail(email);
  };

  handleResetPassword = async (newPassword: string, actionCode: string, continueUrl?: string): Promise<string> => {
    const accountEmail = await auth().verifyPasswordResetCode(actionCode);
    await auth().confirmPasswordReset(actionCode, newPassword);

    if (continueUrl) {
      return continueUrl;
    }

    const { user } = await this.signInWithEmailAndPassword(accountEmail, newPassword);

    if (user && user.uid) {
      return APP_ROUTES.ROOT;
    }

    return APP_ROUTES.LOGIN;
  };
}

export default Firebase;
