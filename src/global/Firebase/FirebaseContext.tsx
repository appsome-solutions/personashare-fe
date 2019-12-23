import Firebase from './Firebase';
import { createCtx } from '../../helpers/Context';

const [useFirebase, FirebaseProvider] = createCtx<Firebase>();

export { useFirebase, FirebaseProvider };
