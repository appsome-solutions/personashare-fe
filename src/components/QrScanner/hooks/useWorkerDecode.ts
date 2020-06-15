import { MutableRefObject, useEffect } from 'react';
/* eslint-disable-next-line */
import Worker from 'worker-loader!./../decodeWorker.worker';
import { QRCode } from 'jsqr';

type UseWorkerDecode = {
  capture: () => void;
  interval: number;
  onCode: (code: QRCode) => void;
  workerRef: MutableRefObject<Worker | null>;
};

export const useWorkerDecode = ({ capture, interval, onCode, workerRef }: UseWorkerDecode): void => {
  useEffect(() => {
    const onMessage = (message: MessageEvent): void => {
      onCode(message.data);
    };
    workerRef.current = new Worker();
    workerRef.current.addEventListener('message', onMessage);
    const timer = setInterval(capture, interval);
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      clearInterval(timer);
    };
  }, [capture, interval, onCode]);
};
