import jsQr from 'jsqr';

const ctx: Worker = self as any;

ctx.addEventListener('message', ({ data }) => {
  const scannedQr = jsQr(data.data, data.shape[0], data.shape[1]);
  if (scannedQr) {
    ctx.postMessage(scannedQr);
  }
});
