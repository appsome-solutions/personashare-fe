import { createCtx } from 'helpers/Context';
import { Range } from 'slate/dist/interfaces/range';
import { ActiveToolsType } from './EditorStyles';

export type EditorContextType = {
  selection: Range | null;
  activeToolbar: ActiveToolsType;
  areEditorButtonsVisible: boolean;
  closeActiveTools: () => void;
  setAreEditorButtonsVisible: (arg: boolean) => {};
};

const [useEditorContext, EditorContextProvider] = createCtx<EditorContextType>();

export { useEditorContext, EditorContextProvider };
