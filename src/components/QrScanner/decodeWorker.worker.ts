import jsQr from 'jsqr';
import { ImagePixels } from './QrScanner';
// eslint-disable-next-line
const ctx: Worker = self as any;

// eslint-disable-next-line
interface IMessageToDecode extends MessageEvent {
  data: ImagePixels;
}

// eslint-disable-next-line
ctx.addEventListener('message', ({ data }: IMessageToDecode) => {
  const scannedQr = jsQr(data.data, data.shape[0], data.shape[1]);
  if (scannedQr) {
    // eslint-disable-next-line
    ctx.postMessage(scannedQr);
  }
});
