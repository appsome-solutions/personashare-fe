import { useState, useEffect } from 'react';
/* eslint-disable-next-line */
import Worker from 'worker-loader!./../decodeWorker.worker';
import { QRCode } from 'jsqr';

type UseWorkerDecode = {
  capture: () => void;
  interval: number;
  onCode: (code: QRCode) => void;
};

export const useWorkerDecode = ({ capture, interval, onCode }: UseWorkerDecode): Worker | null => {
  const [worker, setWorker] = useState<Worker | null>(null);
  useEffect(() => {
    const onMessage = (message: MessageEvent): void => {
      onCode(message.data);
    };
    setWorker((prevState) => {
      prevState = new Worker();
      prevState.addEventListener('message', onMessage);
      return prevState;
    });
    const timer = setInterval(capture, interval);
    return () => {
      if (worker) {
        worker.terminate();
        setWorker(null);
      }
      clearInterval(timer);
    };
  }, [capture, interval, onCode]);
  return worker;
};
