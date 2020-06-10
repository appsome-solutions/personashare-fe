import React, { ReactPortal } from 'react';
import { createPortal } from 'react-dom';
import { Quill } from 'react-quill';
import { v4 } from 'uuid';
import { ManagerListEditMode } from '../../SpotBook/ManagerList/EditModeManager';

const BlockEmbed = Quill.import('blots/block/embed');

class EmbedManagerList extends BlockEmbed {
  constructor(domNode: HTMLElement) {
    super(domNode);
    this.id = domNode.getAttribute('data-id');
    this.data = EmbedManagerList.data;
    domNode.setAttribute('contenteditable', String(false));
  }

  static tagName = 'div';
  static blotName = 'manager-list';
  static className = 'manager-list';

  static create(value: any): HTMLElement {
    const id = v4();
    const node = super.create(value);
    const refs = EmbedManagerList.refs;
    node.setAttribute('data-id', id);
    EmbedManagerList.data = value;
    EmbedManagerList.refs = {
      ...refs,
      [id]: React.createRef(),
    };
    return node;
  }

  renderPortal(id: string | number): ReactPortal {
    this.domNode.setAttribute('data-id', String(id));
    return createPortal(
      <ManagerListEditMode uuid={String(id)} onSpotCreationOrUpdate={() => console.log('spot created or updated')} />,
      this.domNode
    );
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

export default EmbedManagerList;
