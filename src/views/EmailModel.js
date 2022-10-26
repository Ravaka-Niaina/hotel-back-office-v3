/* eslint-disable */
import { useState } from 'react';
import { Stack,Container } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import draftToHtmlPuri from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Page from '../components/Page';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import CustomizedIconButton from 'src/components/CustomizedComponents/CustomizedIconButton';
import { lightBackgroundToTop, shadowInset, linearBorderOutside, linearBorderInset, shadowOutside } from '../components/CustomizedComponents/NeumorphismTheme';
import CustomizedInput from '../components/CustomizedComponents/CustomizedInput';
import Iconify from '../components/Iconify';

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
   * @object An object that contains all the type of model , ex: for canceling one reservation
   */
const modelList = [
  {
    type: "confirmation",
    label: "Confirmation des réservations",
    iconify: "bi:envelope-check-fill",
  },
  {
    type: "canceling",
    label: "Annulation des réservations",
    iconify: "bi:envelope-x-fill",
  },
];

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

  const [modelTypeIndex, setModelTypeIndex] = useState(0);


  /**
   * @object An object that contains test variables to test in the email
   */
  const VARIABLES = {
    hotel_name: 'nom',
    hotel_phone_number: '034 11 222 44',
    hotel_email_address: 'Soavimasoandro, Antananarivo 101',
    reservation_link: 'https://adr-hotel-front/booking-summary/1234',
    logo_link: "http://localhost:3000/images/logo/logowcolor.png",
    client_firstname: "Rabekoto",
    client_lastname: "Jean Paul",
    client_address: 'Lot 512B Manjakandriana',
    client_phone_number: '+261 34 78 711 04',
    itinerary_index: "v214bf5",
    itinerary_number: "52033214"
  }

  
  const handleChangeModelTypeIndex = (model) => {
    setModelTypeIndex(model);
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
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <CustomizedTitle size={20} text="Modèle d'email" />
        </Stack>

        <Stack spacing={3}>
          <Stack spacing={2}>
              <CustomizedTitle text='Modèle pour:' size={24} sx={{textAlign:'center'}}/>
              <Stack direction='row' alignItems="center" justifyContent="flex-start" spacing={6}>
                {
                  modelList.map((model,i)=>(
                    <Stack alignItems="center" justifyContent="flex-start" spacing={3} key={i}>
                      <CustomizedIconButton 
                        sx={{ 
                          width: 150, 
                          height: 150,
                          ...(modelTypeIndex === i && {...shadowInset,borderRadius:'6px'}) 
                        }} 
                        onClick={() => handleChangeModelTypeIndex(i)}
                      >
                        <Iconify icon={model.iconify} width={50} height={50} color="rgba(140, 159, 177, 1)" />
                      </CustomizedIconButton>
                      <CustomizedTitle text={model.label} size={14} />
                    </Stack>
                  ))
                }
              </Stack>
          </Stack>
          <CustomizedPaperOutside
            sx={{
              ...lightBackgroundToTop,
              minHeight: '100vh',
              margin: 'auto',
              border: '1px white solid',
              color: '#787878',
              padding: 5,
            }}
          >
            {/* <UserListToolbar /> */}
            <Stack spacing={2} >
              <CustomizedTitle text={modelList[modelTypeIndex].label} level={0}  sx={{textAlign:'center'}}/>
              <CustomizedTitle text={`Variables de test`} level={0} />
              <Stack>
                {
                  Object.keys(VARIABLES).map((variable, i) => (
                    <Stack direction='row' spacing={2} key={i}>
                      <CustomizedTitle text={`[${variable}] : `} level={0} size={16} />
                      <CustomizedTitle text={`${VARIABLES[variable]}`} level={2} size={16} color='#787878' />
                    </Stack>
                  ))}
              </Stack>


              <br />
              <Stack direction="row" spacing={2}>
                <button style={{ ...draftModificationMenuStyle, ...(!openDraftEditor && { ...shadowOutside }) }} onClick={handleOpenDraftEditor}>Modification via editeur</button>
                <button style={{ ...htmlModificationMenuStyle, ...(!openHtmlEditor && { ...shadowOutside }) }} onClick={handleOpenHtmlEditor}>Modification via html</button>
              </Stack>
              {openDraftEditor &&
                <><Editor
                  stripPastedStyles={{ backgroundColor: 'green' }}
                  // toolbarStyle={{ borderRadius:'8px',...lightBackgroundToTop, ...shadowOutside, ...linearBorderOutside, ...linearBorderInset, padding: 10 }}
                  editorStyle={{ borderRadius: 5, paddingLeft: 15, paddingRight: 15, minHeight: '150px', ...lightBackgroundToTop, ...shadowInset, ...linearBorderOutside, ...linearBorderInset, }}
                  editorState={editorState}
                  onEditorStateChange={onDraftEditorStateChange}
                  onTab={(e) => { e.preventDefault(); console.log(editorState);}}
                />
                </>
              }
              {openHtmlEditor &&
                <>
                  <CustomizedInput type='text' style={{ ...shadowInset, minHeight: '150px' }} value={htmlPreview} onChange={onHtmlEditorStateChange} multiline />
                </>
              }
              <CustomizedTitle sx={{ textAlign: 'center' }} text={`Apercu de l'email`} level={0} size={32} />
              {htmlPreview && <div style={{ ...shadowInset, backgroundColor: 'white', marginTop: '20px', padding: 20 }} dangerouslySetInnerHTML={{ __html: convertVariablesToValues(VARIABLES, htmlPreview) }} />}
            </Stack>
          </CustomizedPaperOutside>
        </Stack>
      </Container>
    </Page>
  );
}
