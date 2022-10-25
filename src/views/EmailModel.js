/* eslint-disable */
import { useState } from 'react';
import { Stack } from '@mui/material';
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import draftToHtmlPuri from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Page from '../components/Page';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import Scrollbar from '../components/Scrollbar';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import { lightBackgroundToTop, shadowInset, linearBorderOutside, linearBorderInset, shadowOutside } from '../components/CustomizedComponents/NeumorphismTheme';
import CustomizedInput from '../components/CustomizedComponents/CustomizedInput';

/**
 * @style The style of the menu to choose between draft or html modification
 */
const chooseModificationTypeStyle = {
  ...shadowInset, padding: 10,
  backgroundColor: "inherit",
  cursor: 'pointer'
}

/**
 * @style The draft modification menu style
 */
const draftModificationMenuStyle = {
  ...chooseModificationTypeStyle
}

/**
 * @style The html modification menu style
 */
const htmlModificationMenuStyle = {
  ...chooseModificationTypeStyle
}

/**
 * @file 
 * @component EmailModel
 * @description The component that renders the page to modify email model
 */
export default function EmailModel() {
  /**
   * @state The state of the editor (draft)
   */
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  /**
   * @state The state of the html value of the email
   */
  const [htmlPreview, setHtmlPreview] = useState('<html></html>')

  /**
   * @state The state that handles if the draft editor should be opened or not
   */
  const [openDraftEditor, setOpenDraftEditor] = useState(true)

  /**
   * @state The state that handles if the html editor should be opened or not
   */
  const [openHtmlEditor, setOpenHtmlEditor] = useState(false)

  let userAttr = {};
  try {
    userAttr = JSON.parse(localStorage.getItem('user_attr'));
  } catch (err) {
    userAttr = {
      hotel_name: 'Colbert',
      hotel_phone_number: '+261 34 78 711 04',
      hotel_email_address: 'colbert@gmail.com',
    };
  }

  /**
   * @object An object that contains test variables to test in the email
   */
  const VARIABLES = {
    hotel_name: userAttr.hotel_name,
    hotel_phone_number: userAttr.hotel_phone_number,
    hotel_email_address: userAttr.hotel_email_address,
    reservation_link: 'https://adr-hotel-front/booking-summary/1234',
    logo_link: "http://localhost:3000/images/logo/logowcolor.png",
    client_firstname: "Rabekoto",
    client_lastname: "Jean Paul",
    client_address: 'Lot 512B Manjakandriana',
    client_phone_number: '+261 34 78 711 04',
    itinerary_index: "v214bf5",
    itinerary_number: "52033214"
  }

  /**
   * @function convertVariablesToValues
   * @description A function that handles the convertion of variables defined in the <variables> param to their values
   * @param {object} variables An object that will contain some key value pairs to determine which variables should be converted to their value 
   * (ex : const VARIABLES = { hotel_name: "Colbert" } Every word in the content to convert that is equal to [hotel_name] would be converted to "Colbert")
   * @param {string} contentToConvert A raw string version of the content to convert
   * @returns {string} A string of the converted content
   */
  const convertVariablesToValues = (variables, contentToConvert) => {
    let convertedContent = contentToConvert;
    Object.keys(variables).forEach(variable => {
      convertedContent = convertedContent.replaceAll(`[${variable}]`, variables[variable]);
    })
    return convertedContent;
  }

  /**
   * @function handleOpenDraftEditor
   * @description A function that handles the opening state of the draft editor
   */
  const handleOpenDraftEditor = () => {
    if (!openDraftEditor) {
      setOpenDraftEditor(true)
      setOpenHtmlEditor(false)
    }
  }
  /**
   * @function handleOpenDraftEditor
   * @description A function that handles the opening state of the html editor
   */
  const handleOpenHtmlEditor = () => {
    if (!openHtmlEditor) {
      setOpenHtmlEditor(true)
      setOpenDraftEditor(false)
    }
  }

  /**
   * @function getHtmlFromDraft
   * @description A function to get the html value from the draft state
   * @param {any} draftEditorStateFromEvent The draft value to convert to html
   * @returns {any} The html value of the draft 
   */
  const getHtmlFromDraft = (draftEditorStateFromEvent) => {
    setEditorState(draftEditorStateFromEvent)
    const htmlPuri = draftToHtmlPuri(
      convertToRaw(draftEditorStateFromEvent.getCurrentContent())
    )
    setHtmlPreview(htmlPuri)
  }

  /**
   * @function getDraftFromHtml
   * @description A function to get the draft value from an html state
   * @param {any} htmlEditorStateFromEvent The html value to convert to draft
   * @returns {any} The draft value of the html
   */
  const getDraftFromHtml = (htmlEditorStateFromEvent) => {
    const blocksFromHtml = htmlToDraft(htmlEditorStateFromEvent)
    const { contentBlocks, entityMap } = blocksFromHtml
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
    const newEditorState = EditorState.createWithContent(contentState)
    setEditorState(newEditorState)
  }

  /**
   * @function onDraftEditorStateChange
   * @description A function that handles the changes of the draft editor field
   * @param {event} e Event from the editor field (Exclusively from the <Editor> component)
   */
  const onDraftEditorStateChange = (e) => {
    getHtmlFromDraft(e)
  }
  /**
   * @function onHtmlEditorStateChange
   * @description A function that handles the changes of the html editor field
   * @param {event} e Event from the input field of the html editor
   */
  const onHtmlEditorStateChange = (e) => {
    // setHtmlPreview(e.target.value)
    setHtmlPreview(e.target.value)
    getDraftFromHtml(e.target.value)
  }
  return (
    <Page title="AIOLIA | Modèle Email">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <CustomizedTitle size={20} text="Modèle d'email" />
      </Stack>

      <CustomizedPaperOutside
        sx={{
          ...lightBackgroundToTop,
          minHeight: '100vh',
          border: '1px white solid',
          color: '#787878',
          padding: 6,
        }}
      >
        {/* <UserListToolbar /> */}
        <Scrollbar>
          <div>
            <h4><b>Variables de test</b></h4> <br />
            {Object.keys(VARIABLES).map(variable => `[${variable}] : ${VARIABLES[variable]} --- `)}
          </div>
          <br />
          <Stack direction="row">
            {openDraftEditor ? <button style={{ ...draftModificationMenuStyle }} onClick={handleOpenDraftEditor}>Modification via draft</button> : <button style={{ ...draftModificationMenuStyle, ...shadowOutside }} onClick={handleOpenDraftEditor}>Modification via draft</button>}
            {openHtmlEditor ? <button style={{ ...htmlModificationMenuStyle }} onClick={handleOpenHtmlEditor}>Modification via html</button> : <button style={{ ...htmlModificationMenuStyle, ...shadowOutside }} onClick={handleOpenHtmlEditor}>Modification via html</button>}
          </Stack>
          {openDraftEditor &&
            <><Editor
              stripPastedStyles={{ backgroundColor: 'green' }}
              toolbarStyle={{ ...lightBackgroundToTop, ...shadowInset, ...linearBorderOutside, ...linearBorderInset, padding: 10 }}
              editorStyle={{ ...lightBackgroundToTop, ...shadowInset, ...linearBorderOutside, ...linearBorderInset, padding: 10, minHeight: '150px' }}
              editorState={editorState}
              onEditorStateChange={onDraftEditorStateChange}
            />
            </>
          }
          {openHtmlEditor &&
            <>
              <CustomizedInput type='text' style={{ ...shadowInset, minHeight: '150px' }} value={htmlPreview} onChange={onHtmlEditorStateChange} multiline />
            </>
          }
          <h2 style={{textAlign:'center'}}>Apercu de l'email</h2>
          {htmlPreview && <div style={{ ...shadowInset, backgroundColor: 'white', marginTop: '20px', padding: 20 }} dangerouslySetInnerHTML={{ __html: convertVariablesToValues(VARIABLES, htmlPreview) }} />}
        </Scrollbar>
      </CustomizedPaperOutside>
    </Page>
  );
}
