import { Firebase } from '../global/Firebase';

export const signInWithGoogle = async (firebase: Firebase): Promise<string | undefined> => {
  const provider = firebase.googleProvider();
  provider && (await firebase.signIn(provider));
  const user = firebase?.getCurrentUser();

  return user?.getIdToken(true);
};
