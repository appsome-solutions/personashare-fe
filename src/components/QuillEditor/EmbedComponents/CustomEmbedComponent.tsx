import React, { ReactPortal } from 'react';
import { createPortal } from 'react-dom';
import { Quill } from 'react-quill';
import { v4 } from 'uuid';
import ExampleComponent from './ExampleComponent';

const BlockEmbed = Quill.import('blots/block/embed');

class CustomEmbed extends BlockEmbed {
  constructor(domNode: HTMLElement) {
    super(domNode);
    this.id = domNode.getAttribute('data-id');
    this.data = CustomEmbed.data;
    domNode.setAttribute('contenteditable', String(false));
  }

  static tagName = 'div';
  static blotName = 'custom';
  static className = 'custom';

  static create(value: any): HTMLElement {
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

  renderPortal(id: string | number): ReactPortal {
    this.domNode.setAttribute('data-id', String(id));
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
