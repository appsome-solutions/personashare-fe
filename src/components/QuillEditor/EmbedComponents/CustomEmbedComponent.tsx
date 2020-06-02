/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { createPortal } from 'react-dom';
import { Quill } from 'react-quill';
import { v4 } from 'uuid';
import ExampleComponent from './ExampleComponent';

const BlockEmbed = Quill.import('blots/block/embed');

class CustomEmbed extends BlockEmbed {
  //@ts-ignore
  constructor(domNode) {
    super(domNode);
    this.id = domNode.getAttribute('data-id');
    domNode.setAttribute('contenteditable', false);
    this.data = CustomEmbed.data;
  }

  static tagName = 'div';
  static blotName = 'custom';
  static className = 'custom';

  static create(value: any) {
    const id = v4();
    const node = super.create(value);
    const refs = CustomEmbed.refs;
    node.setAttribute('data-id', id);
    CustomEmbed.data = value;
    CustomEmbed.refs = {
      ...refs,
      [id]: React.createRef(),
    };
    return node;
  }

  /*  static value(domNode: any) {
    const id = domNode.getAttribute('data-id');
    const ref = CustomEmbed.refs[id];
    return ref && ref.current && ref.current.getData();
  }

  static staticPortal(domNode: any) {
    return createPortal(<SpotBook />, domNode);
  }*/

  renderPortal(id: string | number) {
    console.warn(id);
    return createPortal(<ExampleComponent />, this.domNode);
  }
  attach() {
    super.attach();
    this.scroll.emitter.emit('blot-mount', this);
  }

  detach() {
    super.detach();
    this.scroll.emitter.emit('blot-unmount', this);
  }
}

export default CustomEmbed;
