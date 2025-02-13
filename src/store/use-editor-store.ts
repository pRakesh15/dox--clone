import {create} from "zustand";

import {type Editor} from '@tiptap/react'

//create a interface what i need to use in a store..
interface EditorState{
    editor:Editor | null;
    setEditor:(editor:Editor | null)=>void;
}
//create a store for editor
//return  a object..
export const useEditorStore=create<EditorState>((set)=>({
editor:null,
setEditor:(editor)=>set({editor}),
}));