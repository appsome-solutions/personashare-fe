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
    this.data = CustomEmbed.data;
  }

  static tagName = 'div';
  static blotName = 'custom';
  static className = 'custom';

  static create(value: any) {
    debugger;
    const id = v4();
    const node = super.create(value);
    const refs = CustomEmbed.refs;
    node.setAttribute('data-id', id);
    CustomEmbed.data = value;
    CustomEmbed.refs = {
      ...refs,
      [id]: React.createRef(),
    };
    setTimeout(() => {
      this.staticPortal(node);
    }, 500);
    return node;
  }

  static value(domNode: any) {
    const id = domNode.getAttribute('data-id');
    const ref = CustomEmbed.refs[id];
    return ref && ref.current && ref.current.getData();
  }

  static staticPortal(domNode: any) {
    return createPortal(<ExampleComponent />, domNode);
  }

  renderPortal(id: string | number) {
    debugger;
    const { options } = Quill.find(this.scroll.domNode.parentNode);
    const ref = CustomEmbed.refs[id];
    return createPortal(
      <ExampleComponent type={CustomEmbed.blotName} node={this.data} ref={ref} readOnly={options.readOnly} />,
      this.domNode
    );
  }
}

export default CustomEmbed;
