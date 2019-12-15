import jsQr from 'jsqr';
import { ImagePixels } from './QrScanner';

const ctx: Worker = self as any;

interface IMessageToDecode extends MessageEvent {
  data: ImagePixels;
}

ctx.addEventListener('message', ({ data }: IMessageToDecode) => {
  const scannedQr = jsQr(data.data, data.shape[0], data.shape[1]);
  if (scannedQr) {
    ctx.postMessage(scannedQr);
  }
});
