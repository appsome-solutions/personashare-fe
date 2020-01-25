import Storage from './Storage';
import { createCtx } from '../../helpers/Context';

const [useStorage, StorageProvider] = createCtx<Storage>();

export { useStorage, StorageProvider };
