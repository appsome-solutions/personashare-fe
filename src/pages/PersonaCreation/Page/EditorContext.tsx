import { createCtx } from 'helpers/Context';
import { Range } from 'slate/dist/interfaces/range';

export type EditorContextType = {
  selection: Range | null;
  closeActiveTools: () => void;
};

const [useEditorContext, EditorContextProvider] = createCtx<EditorContextType>();

export { useEditorContext, EditorContextProvider };
