import getPixels from 'get-pixels';
import jsQr from 'jsqr';

type ImagePxels = {
  data: Uint8ClampedArray;
  offset: number;
  shape: Array<number>;
  stride: Array<number>;
};

self.addEventListener('message', imageSrc => {
  getPixels(imageSrc, (err: any, image: ImagePxels) => {
    if (err) {
      //@ts-ignore
      self.postMessage(err);
      return;
    }
    const scannedQr = jsQr(image.data, image.shape[0], image.shape[1]);
    if (scannedQr) {
      //@ts-ignore
      self.postMessage(scannedQr);
    }
  });
});
