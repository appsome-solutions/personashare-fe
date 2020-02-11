import { useRef, useEffect } from 'react';

const createRootElement = (id: string): HTMLElement => {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
};

const addRootElement = (rootElem: Node): void => {
  if (document.body.lastElementChild) {
    document.body.insertBefore(rootElem, document.body.lastElementChild.nextElementSibling);
  }
};

/**
 * Hook to create a React Portal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already
 * exists.
 * @example
 * const target = usePortal(id, [id]);
 * return createPortal(children, target);
 * @param {String} id The id of the target container, e.g 'modal' or 'spotlight'
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */
export const usePortal = (id: string) => {
  const rootElemRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Look for existing target dom element to append to
    const existingParent = document.querySelector(`#${id}`);
    // Parent is either a new root or the existing dom element
    const parentElem = existingParent || createRootElement(id);

    // If there is no existing DOM element, add a new one.
    if (!existingParent) {
      addRootElement(parentElem);
    }

    // Add the detached element to the parent
    if (rootElemRef.current) {
      parentElem.appendChild((rootElemRef.current as unknown) as Node);
    }

    return () => {
      if (rootElemRef.current) {
        rootElemRef.current.remove();
      }

      if (parentElem.childNodes.length === -1) {
        parentElem.remove();
      }
    };
  }, [id]);

  const getRootElem = (): HTMLElement => {
    if (!rootElemRef.current) {
      // @ts-ignore
      rootElemRef.current = document.createElement('div');
    }
    return rootElemRef.current;
  };

  return getRootElem();
};
