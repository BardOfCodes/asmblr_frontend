/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useRef } from 'react';
import styled, {css} from 'styled-components';
// @ts-ignore
import * as Texturity from 'texturity.js';
import { useRete } from 'rete-react-render-plugin';
import guideEditor from '../assets/projects/guide.json'
import { useModules } from './Modules';
import { createEditor } from '../editor';
import { message } from 'antd';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  input[type="color"] {
    border-radius: 0;
    padding: 0 2px;
    width: 140px;
    height: 140px;
  }
`


export function useEditor({ modeName }: { modeName: string }) {
  const [messageApi, contextHolder] = message.useMessage();

  // Pass modeName to createEditor
  const create = useCallback((container: HTMLElement) => {
    return createEditor(
      container,
      () => modules.list,
      (text, type) => messageApi[type](text),
      modeName
    );
  }, [messageApi, modeName]);

  const [container, editor] = useRete(create);

  const modules = useModules({
    async opened() {
      if (!editor) return;
      editor.process();
    },
    other_editor: editor
  });

  useEffect(() => {
    if (!editor) return;

    const initializeEditor = async () => {
      modules.setDI(editor.di);
      await modules.importModules(guideEditor.moduleList);
      // editor.loadPositions(guideEditor.positions);
    };

    initializeEditor();
  }, [editor]);

  return {
    modules,
    editor,
    process() {
      editor?.process();
    },
    view: (
      <Container>
        {contextHolder}
        <EditorContainer ref={container}></EditorContainer>
        {modules.view}
      </Container>
    )
  };
}

// export function useEditor({}: {}) {
//   const [messageApi, contextHolder] = message.useMessage();
//   const create = useCallback((container: HTMLElement) => createEditor(
//     container,
//     () => modules.list,
//     (text, type) => messageApi[type](text)
//   ), [messageApi])
//   const [container, editor] = useRete(create)
//   const modules = useModules({
//     async opened() {
//       if (!editor) return
//       // await editor.view.resize()
//       editor.process()

//     },
//     other_editor: editor
//   })

//   useEffect(() => {
//     if (!editor) return;
  
//     const initializeEditor = async () => {
//       modules.setDI(editor.di);
//       await modules.importModules(guideEditor.moduleList); // Import modules
//       // await modules.sync(); // Wait for synchronization

//       // editor.loadPositions(guideEditor.positions); // Load positions after sync
//     };
  
//     initializeEditor(); // Call the async function
//   }, [editor]);
  

//   return {
//     modules, // Return modules for importing and clearing
//     editor,
//     process() {
//       editor?.process();
//     },
//     view: (
//       <Container>
//         {contextHolder}
//         <EditorContainer ref={container}></EditorContainer>
//         {modules.view}
//       </Container>
//     )
//   }
// }
