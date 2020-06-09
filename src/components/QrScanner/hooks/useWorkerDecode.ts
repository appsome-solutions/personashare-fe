import { useEffect, useRef } from 'react';
/* eslint-disable-next-line */
import Worker from 'worker-loader!./../decodeWorker.worker';
import { QRCode } from 'jsqr';

type UseWorkerDecode = {
  capture: () => void;
  interval: number;
  onCode: (code: QRCode) => void;
};

export const useWorkerDecode = ({ capture, interval, onCode }: UseWorkerDecode): Worker | null => {
  const worker = useRef<Worker | null>(null);
  useEffect(() => {
    const onMessage = (message: MessageEvent): void => {
      onCode(message.data);
    };
    worker.current = new Worker();
    worker.current.addEventListener('message', onMessage);
    const timer = setInterval(capture, interval);
    return () => {
      if (worker.current) {
        worker.current.terminate();
        worker.current = null;
      }
      clearInterval(timer);
    };
  }, [capture, interval, onCode]);
  return worker.current;
};
