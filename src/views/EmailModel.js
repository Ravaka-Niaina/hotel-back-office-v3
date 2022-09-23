import { useEffect, useState } from 'react';
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
  const [htmlPreview, setHtmlPreview] = useState('<p></p>')

  const VARIABLES = {
    hotel_name: 'Hotel Colbert',
    hotel_phone_number: "+261 34 78 711 04",
    hotel_email_address: "colbert@gmail.com",
    // reservation_link: '<a href="https://${env.FrontURL}/booking-summary/${reservation._id}">lien</a>',
    // logo: "<img style='width: 35%;' src='https://www.hotel-restaurant-colbert.com/wp-content/uploads/2012/06/Logo-Colbert1-Copier.jpg' alt='logo'\/>`",
    client_firstname: "Cedric",
    client_lastname: "Rabarijohn",
    itinerary_index: "666",
    itinerary_number: "52033214"
  }
  // TEST
  const testVariables = ['hotel_name', 'hotel_phone_number', 'hotel_email_address', 'client_firstname', 'client_lastname', 'itinerary_index', 'itinerary_number']

  const onEditorStateChange = (e) => {
    setEditorState(e)
  }
  const convertVariablesToValues = (variables, contentToConvert) => {
    let convertedContent = contentToConvert;
    Object.keys(variables).forEach(variable => {
      convertedContent = convertedContent.replaceAll(`[${variable}]`, variables[variable]);
    })
    return convertedContent;
  }
  const getHtmlFromDraft = () => {
    const htmlPuri = draftToHtmlPuri(
      convertToRaw(editorState.getCurrentContent())
    )
    const newHtmlPuri = convertVariablesToValues(VARIABLES, htmlPuri)
    console.log(newHtmlPuri)
    setHtmlPreview(newHtmlPuri)
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
            padding: 2,
          }}
        >
          <UserListToolbar />
          <Scrollbar>
            <div>
              <h3><b>Variables to test</b></h3>
              {testVariables && testVariables.map(testVariable => (
                <div>{`[${testVariable}]`}</div>
              ))}
            </div>
            <Editor
              editorStyle={{ backgroundColor: "white", padding: 20 }}
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
            />;
            <button style={{border:'1px solid black', padding:'10px', marginTop:'10px'}} onClick={() => getHtmlFromDraft()}>Preview</button>
            {htmlPreview && <div style={{backgroundColor:'white', marginTop:'20px', padding:10}} dangerouslySetInnerHTML={{ __html: htmlPreview }} />}
          </Scrollbar>
        </CustomizedPaperOutside>
      </Container>
    </Page>
  );
}
