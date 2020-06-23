import React, { ReactPortal } from 'react';
import { createPortal } from 'react-dom';
import { Quill } from 'react-quill';
import { v4 } from 'uuid';
import { ParticipantList } from 'pages/ParticipantList/ParticipantList';

const BlockEmbed = Quill.import('blots/block/embed');

class EmbedUploadAssets extends BlockEmbed {
  constructor(domNode: HTMLElement) {
    super(domNode);
    this.id = domNode.getAttribute('data-id');
    this.data = EmbedUploadAssets.data;
    domNode.setAttribute('contenteditable', String(false));
  }

  static tagName = 'div';
  static blotName = 'participant-list';
  static className = 'participant-list';

  static create(value: any): HTMLElement {
    const id = v4();
    const node = super.create(value);
    const refs = EmbedUploadAssets.refs;
    node.setAttribute('data-id', id);
    EmbedUploadAssets.data = value;
    EmbedUploadAssets.refs = {
      ...refs,
      [id]: React.createRef(),
    };
    return node;
  }

  renderPortal(id: string | number, props: any): ReactPortal {
    this.domNode.setAttribute('data-id', String(id));
    return createPortal(<ParticipantList {...props} />, this.domNode);
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

export default EmbedUploadAssets;
