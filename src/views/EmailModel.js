import { useState } from 'react';
import { Stack, Container } from '@mui/material';
import { Editor, EditorState } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js';
import draftToHtmlPuri from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Page from '../components/Page';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import { UserListToolbar } from '../components/table';
import Scrollbar from '../components/Scrollbar';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';


export default function EmailModel() {
  const [editorState, setEditorState] = useState(EditorState)
  const onEditorStateChange = (e) => {
    setEditorState(e)
  }

  const getHtmlFromDraft = () => {
    // const rawContentState = convertToRaw(editorState.getCurrentContent())
    // const markup = draftToHtml(
    //   rawContentState
    // )

    const htmlPuri = draftToHtmlPuri(
      convertToRaw(editorState.getCurrentContent())
    )
    console.log(htmlPuri)
  }
  return (
    <Page title="AOLIA | Modèle Email">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <CustomizedTitle sx={{ color: '#787878' }} text="Modèle d'email" />
        </Stack>
        <CustomizedPaperOutside
          sx={{
            ...lightBackgroundToTop,
            minHeight: '100vh',
            border: '1px white solid',
            color: '#787878',
            padding: 5,
          }}
        >
          <UserListToolbar />
          <Scrollbar>
            <Editor
              editorStyle={{ backgroundColor: "white", padding: 20 }}
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
            />;
            <button onClick={()=> getHtmlFromDraft()}>Hey</button>
          </Scrollbar>
          
        </CustomizedPaperOutside>
      </Container>
    </Page>
  );
}
