/* eslint-disable */
import { useContext, useState, useEffect, } from 'react';
import ReactQuill from 'react-quill';
import '../components/emailModelOld/ModeleEmail.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { Alert, Stack } from '@mui/material';
import GalerieUnique from '../components/emailModelOld/GalerieUnique';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedButton from '../components/CustomizedComponents/CustomizedButton';
import CustomizedIconButton from 'src/components/CustomizedComponents/CustomizedIconButton';
import { getEmailModelFromBackEnd, saveEmailModelToBackEnd } from '../services/EmailModel';
import { lightBackgroundToTop, shadowInset, linearBorderOutside, linearBorderInset, shadowOutside } from '../components/CustomizedComponents/NeumorphismTheme';
import Iconify from '../components/Iconify';

import { getHotelDetails } from '../services/Hotel';
import config from '../config/api';
import { ThemeContext } from 'src/components/context/Wrapper';

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

function ModeleEmail(props){
    const confiramtionHeader=getHtmlConfirmation();
    const hotelsInfos=getHtmlHotelInfos();
    const htmlFooter=getHtmlFooter();
    const {Quill} = ReactQuill
    const Font = Quill.import('formats/font');
    const listFonts=['Ubuntu', 'Arial', 'Roboto','Verdana','Helvetica','Tahoma','Georgia' ]
    Font.whitelist = listFonts.sort();
    Quill.register(Font, true);
    // const contentDataStateConfirmation = ContentState.createFromBlockArray(convertFromHTML(confiramtionHeader));
    // const editorDataStateConfirmation = EditorState.createWithContent(contentDataStateConfirmation);
    // const [editorStateConfirmation, setEditorStateConfirmation] = useState(editorDataStateConfirmation);

    // const contentDataStatehotelsInfos = ContentState.createFromBlockArray(convertFromHTML(hotelsInfos));
    // const editorDataStatehotelsInfos = EditorState.createWithContent(contentDataStatehotelsInfos);
    // const [editorStatehotelsInfos, setEditorStatehotelsInfos] = useState(editorDataStatehotelsInfos);

    const nbPhotoBefore = {value: 0};
    const  modules  = {
        toolbar: [
            [{ font:Font.whitelist }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };
    // const contentDataStateFooter = ContentState.createFromBlockArray(convertFromHTML(htmlFooter));
    // const editorDataStateFooter = EditorState.createWithContent(contentDataStateFooter);
    // const [editorStateFooter, setEditorStateFooter] = useState(editorDataStateFooter);
    const [logo,setLogo]= useState("https://www.hotel-restaurant-colbert.com/wp-content/uploads/2012/06/Logo-Colbert1-Copier.jpg")
    const [visibility, setVisibility] = useState(false);
    
    const [valueConfirmation, setValueConfirmation] =  useState(confiramtionHeader);
    const [valueHotelInfos, setValueHotelsInfos] =  useState(hotelsInfos);
    const [valueFooter, setValueFooter] =  useState(htmlFooter);
    const [photo, setPhoto] = useState([]);
    const [preview, setPreview] = useState([]);
    const [alertSuccess, setAlertSuccess] = useState(null);
    const [alertError, setAlertError] = useState(null);
    const [showGalerie, setShowGalerie] = useState(false);
    const [hotel, setHotel] = useState({});
    const [modelTypeIndex, setModelTypeIndex] = useState(0);

    const context = useContext(ThemeContext);

    const switchShowGalerie = (e) => {
      e.preventDefault();
      setShowGalerie(!showGalerie);
    };
    

    const popupCloseHandler = (e) => {
        setVisibility(e);
    };
    const changeLogo=(e) =>{
        setLogo(e)
    }
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }
   
    function replaceFontStyle(html,fontName){
        const query= `class="ql-font-${fontName}"`;
      
        html= replaceAll(html,query,`style='font-family:${fontName}'`);
        // console.log("query");
        // console.log(html);
        return html;
    }
    function replaceFontStyleReverse(html,fontName){
        const query= `class="ql-font-${fontName}"`;
     
      
        html= replaceAll(html,`style='font-family:${fontName}'`,query);
        // console.log("query");
        // console.log(html);
        return html;
    }
    function  setModele(res){
        if(res.status === 200){
            // localStorage.setItem('access', 1);
            // setAlertSuccess(res.message);
            console.log("res");
            const current = JSON.parse(JSON.stringify(res.data));
         
            if(current){
                setLogo(current.logo_url);
                let htmlC=current.htmlConfirmation;
                let htmlI=current.htmlHotelsInfos;
                let htmlF=current.htmlFooter;
                console.log(htmlF);
                listFonts.forEach(font => {
                    htmlC= replaceFontStyleReverse(htmlC,font);
                    htmlI= replaceFontStyleReverse(htmlI,font);
                    htmlF= replaceFontStyleReverse(htmlF,font);
                });
               
                setValueConfirmation(htmlC);
                setValueHotelsInfos(htmlI);
                setValueFooter(htmlF);
            }
        }else{
            // setAlertError(res.errors[0].message);
            // history.push('#error');
        }
    }

    const getHotelInfo = () => {
      getHotelDetails()
      .then(response => {
        console.log(response.data);
        setHotel(response.data.hotel);
      })
      .catch(err => console.error(err));
    };

    const getHotelEmailModel = (modelTypeIndexTmp) => {
      context.showLoader(true);
      const emailType = modelTypeIndexTmp === 0 
        ? 'confirmation'
        : 'annulation'; 
      getEmailModelFromBackEnd(emailType)
      .then(data => {
        context.showLoader(false);
        const { data: { data: { 
          htmlConfirmation,
          htmlFooter,
          htmlHotelsInfos
        } } } = data;
        setValueConfirmation(htmlConfirmation);
        setValueHotelsInfos(htmlHotelsInfos);
        setValueFooter(htmlFooter);
      })
      .catch(err => {
        console.error(err);
        context.changeResultErrorMessage('Impossible d\'obtenir le modèle d\'email');
        context.showResultError(true);
        context.showLoader(false);
      })
    };

    const handleChangeModelTypeIndex = (model) => {
      setModelTypeIndex(model);
      getHotelEmailModel(model);
    }

    useEffect(() => {
        getHotelInfo();
        getHotelEmailModel(0);
    }, []);

    const valider=(e) =>{
        let htmlC=valueConfirmation;
        let htmlI=valueHotelInfos;
        let htmlF=valueFooter;
        listFonts.forEach(font => {
            htmlC= replaceFontStyle(htmlC,font);
            htmlI= replaceFontStyle(htmlI,font);
            htmlF= replaceFontStyle(htmlF,font);
        });
        // console.log(htmlC);
        // console.log(htmlI);
        // console.log(htmlF);
        const content = {logo_url:hotel.logo, htmlConfirmation:htmlC, htmlHotelsInfos:htmlI, htmlFooter:htmlF}
        const data = { 
          content, 
          type: modelTypeIndex === 0 
          ? 'confirmation' 
          : 'annulation'
        };
        saveEmailModelToBackEnd(data)
        .then(response => {
          const { data: { status, message, errors } } = response;
          if(status === 200){
            setAlertSuccess(message);
          }else{
            setAlertError(errors[0].message);
          }
          window.scrollTo(0, 0)
        })
        .catch(err => console.error(err));
    }

    


    const customContentStateConverter = (contentState) => {
        // changes block type of images to 'atomic'
        const newBlockMap = contentState.getBlockMap().map((block) => {
            const entityKey = block.getEntityAt(0);
            if (entityKey !== null) {
                const entityBlock = contentState.getEntity(entityKey);
                const entityType = entityBlock.getType();
                switch (entityType) {
                    case 'IMAGE': {
                        const newBlock = block.merge({
                            type: 'atomic',
                            text: 'img',
                        });
                        return newBlock;
                    }
                    default:
                        return block;
                }
            }
            return block;
        });
        const newContentState = contentState.set('blockMap', newBlockMap);
        return newContentState;
    }


    function getHtmlConfirmation() {
        let  html="";
        let header="";
        header += "				<div  style='margin-left: 40%;'>";
        header += "					<h3 class='test'>Confirmation de l'itineraire [index] </h3>";
        header += "					<p>Confirmation No. [num_itineraire]</p>";
        header += "				</div>";
        
        html+=header;  
        return html  
    }
    function getHtmlHotelInfos() {
        let  html="";
        let hotelInfos="";
        hotelInfos += "<div class=\"hotels_infos\">";
        hotelInfos += "<p>";
        hotelInfos += "<strong>Cher(e)</strong> [nom] [prenom],";
        hotelInfos += "</p>";
        hotelInfos += "<p>Nous vous remercions d'avoir choisi [nom_hotel] pour votre réservation. Nous vous confirmons que nous avons bien reçu votre réservation.</p>		";
        hotelInfos += "</div>";
        html+=hotelInfos; 
        return html  
    }
    function getHtmlFooter() {
        let  html="";
        let salutaions="";
        salutaions += "<div style='font-family:arial,helvetica,sans-serif;margin-top: 1rem;margin-left:1rem;font-size:12px;color:#333333;width:588.008px'>";
        salutaions += "				<p><span style='font-size:10pt'>Pour toute question concernant votre réservation, veuillez appeler le département de réservation de [nom_hotel] sur le [numero_hotel] ou envoyer un email au <a href='[email_hotel]' target='_blank'>[email_hotel]</a><br><br></span>Salutations,<br>[nom_hotel]<br><br></p>";
        salutaions += "</div>";
        html+=salutaions;
        return html  
    }
    return(
        
        <>
          
          {/* <LogoComponent
                            onClose={popupCloseHandler}
                            show={visibility}
                            title="Logo"
                            logo={logo}
                            changeLogo={changeLogo}
                            
                            />  */}
            <Stack spacing={2}>
              <Stack style={{marginBottom: '60px'}} direction='row' alignItems="center" justifyContent="flex-start" spacing={6}>
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
          <div className="container" style={{fontFamily:'Roboto,RobotoDraft,Helvetica,Arial,sans-serif',width:1000,margin:'0 auto',padding:'0 auto',marginTop:'20%'}}>
              <h1 style={{textAlign:'center',marginTop:'-25%'}}>Modèle pour {modelTypeIndex === 0 ? 'confirmation' : 'annulation'}</h1>
                {alertSuccess != null ? 
                            <div id="success" className="message">
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="success">{alertSuccess}</Alert>
                                </Stack>
                            </div> : null
                        }
                        {alertError != null ?
                            <div id="error" className="message">
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error">{alertError}</Alert>
                                </Stack>
                            </div> : null
                        }
                <div className='itineraire' >  
                        
                        {/* <div class='header'  style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
                            <img style={{width:'35%' }} src='https://www.hotel-restaurant-colbert.com/wp-content/uploads/2012/06/Logo-Colbert1-Copier.jpg' alt='logo'/>
                           
                            <div  style={{marginLeft:'40%'}}>
                                <h3>Confirmation de l'itineraire X</h3>
                                    <p>Confirmation No. 12934802137</p>
                                
                            </div>
                                            
                        </div> */}
                        <div className='header'  style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
                            <img style={{width:'35%',height:'115%' }} src={`${config.host}/${hotel.logo}`} alt='logo'/>
                           <div>
                             {/* <img alt="camera" className="camera" style={{width:45,height:45,marginLeft:10,cursor: 'pointer' }}  onClick={switchShowGalerie} src={`${process.env.PUBLIC_URL  }/camera.png`} /> */}
                                      
                            </div> 
                             
                            <GalerieUnique showGalerie={showGalerie} setShowGalerie={setShowGalerie} 
                            photoSortie={photo} setPhotoSortie={setPhoto} nbPhotoBeforeSortie={nbPhotoBefore} setLogo={setLogo}
                            previewSortie={preview} setPreviewSortie={setPreview} />

                            <div style={{marginLeft:'10%'}}>
                                {/* <Editor
                                    editorState={editorStateConfirmation}
                                    wrapperClassName="wrapper-class-confirmation"
                                    editorClassName="editor-class-confirmation"
                                    toolbarClassName="toolbar-class-confirmation"
                                    onEditorStateChange={onEditorStateConfirmationChange}
                                /> */}

                                <ReactQuill className="editor-class-confirmation" modules={modules} value={valueConfirmation} theme="snow" onChange={setValueConfirmation}/> 
                                
                            </div>
                                            
                        </div>
                       
                      <div className="hotels_infos" style={{marginTop:20}}>
                        {/* <p>
                         <strong>Cher(e)</strong> nom prenom 
                         </p>
                        <p>Nous vous remercions d'avoir choisi [Nom de l'hotel] pour votre réservation. Nous vous confirmons que nous avons bien reçu votre réservation.</p> */}
                        {/* <Editor
                                    editorState={editorStatehotelsInfos}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                    onEditorStateChange={onEditorStateInfosChange}
                                /> */}
                                <ReactQuill className="editor-class" modules={modules} value={valueHotelInfos} theme="snow" onChange={setValueHotelsInfos}/> 
                      </div>
                      <hr style={{margin:'0.5rem'}} />
                      <div className='infos_contact' style={{fontFamily:'arial,helvetica,sans-serif',fontSize:11,color:'#666666',backgroundColor: '#f3f0e9',paddingTop: '1rem',paddingBottom: '1rem'}}>
                        <p style={{textAlign:'center'}}><span style={{fontSize:12,color:'#333333',fontWeight:'bold',fontFamily:'arial,helvetica,sans-serif' }}>VOTRE SÉJOUR EN DÉTAILS</span></p>
                        <p style={{textTransform:'capitalize',textAlign:'center'}}><span style={{fontSize:10}}><strong>Nom:</strong> [Nom] [prénom]</span><span style={{textTransform:'capitalize'}}><br/><span style={{fontSize:10}}><strong>Adresse</strong>: , , ,  | Phone no: XXX XX XXX XX</span></span> <br/><span style={{fontSize:10}}><strong>Confirmation no:</strong> 104583466234</span></p><br/>
                      </div>
                      <div className='reservations' >
                        <div className='reservations_details' style={{marginTop: '1rem',border: '1px solid black'}}>
                            <table style={{marginLeft:'auto',marginRight:'auto',width: '97%'}}>
                                <tr style={{height:15,borderBottom:'1px solid',borderColor:'#f7f7f7',verticalAlign:'baseline'}}>
                                    <td style={{fontFamily:'arial,helvetica,sans-serif',fontSize:12,color:'#333333',width:187.5,height:15,textAlign:'center'}} colSpan='3'><span style={{fontSize:10}}><span style={{fontFamily:'arial,helvetica,sans-serif'}}><strong style={{fontStyle:'normal',color:'#333333'}}><strong>Clients :</strong></strong></span></span><br/><span style={{fontSize:10}}> X Adulte(s) X Enfant(s)<br/><br/></span></td>
                                    <td style={{width:190,height:15,textAlign:'center',paddingLeft:100}}><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}><strong>Date d'arrivée :</strong></span><br/><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}>mardi 08 mars 2022</span><br/><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}><strong>Check-in : 12.00 AM<br/><br/></strong></span></td><br/>
                                    <td style={{width:202.5,height:15,textAlign:'center'}} colSpan='2'><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}><strong>Date depart :</strong></span><br/><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}>mardi 08 mars 2022</span><br/><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}><strong>Check-out : 12.00 AM<br/><br/></strong></span></td><br/>
                                
                                </tr>
                                <tr style={{height:15,borderBottom:'1px solid',borderColor:'#f7f7f7',verticalAlign:'baseline'}}>
                                    <td style={{fontFamily:'arial,helvetica,sans-serif',fontSize:12,color:'#333333',width:187.5,height:15,textAlign:'center'}} colSpan='3'><span style={{fontSize:10}}><span style={{fontFamily:'arial,helvetica,sans-serif'}}><strong style={{fontStyle:'normal',color:'#333333'}}><strong>Nombre de nuit:</strong></strong></span></span><br/><span style={{fontSize:10}}>1 <br/><br/></span></td>
                                    <td style={{width:190,height:15,textAlign:'center',paddingLeft:100}}><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}><strong>Type de Chambre Réservé</strong></span><br/><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}>Chambre standard</span><br/></td><br/>
                                    <td style={{width:202.5,height:15,textAlign:'center'}} colSpan='2'><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}><strong>Plan Tarifaire: </strong></span><br/><span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}>Petit déjeuner - Non remboursable</span><br/></td><br/>
                                
                                </tr>
                                <tr style={{marginTop: '1rem' ,height:15,backgroundColor:'#f7f7f7',verticalAlign:'baseline'}}>
                                    <td style={{fontFamily:'arial,helvetica,sans-serif',fontSize:12,color:'#333333',height:15,width:605}} colSpan='6'><span style={{fontFamily:'arial,helvetica,sans-serif'}}><strong style={{fontStyle:'normal',color:'#333333',fontSize:12}}><br/>Détails et préférences: <br/></strong></span>
                                            messageParticulier
                                    </td>
                                </tr>
                                <tr style={{marginTop: '1rem' ,height:15,backgroundColor:'#f7f7f7',verticalAlign:'baseline'}}>
                                    <td style={{fontFamily:'arial,helvetica,sans-serif',fontSize:12,color:'#333333',height:15,width:605}} colSpan='6'><span style={{fontFamily:'arial,helvetica,sans-serif'}}><strong style={{fontStyle:'normal',color:'#333333',fontSize:12}}><br/>Détails et préférences: <br/></strong></span>
                                        <p>Politiques 1</p>
                                        <p>Politiques 2</p>
                                    </td>
                                </tr>
                                <tr style={{height:10}}>
                                <td style={{fontFamily:'arial,helvetica,sans-serif',fontSize:12,color:'#333333',height:15,width:187.5}} colSpan='3'><span style={{fontSize:10}}><strong>Tarif par nuit:</strong></span></td>
                                <td style={{width:190,height:15}}>
                                    <span style={{fontFamily:'arial,helvetica,sans-serif',fontSize:10}}>
                                        <strong>EUR X </strong>
                                        </span></td>
                                        
                                <td style={{height:15,width:202.5,textAlign:'right'}} colSpan='2'><span style={{fontSize:10}}><strong style={{fontStyle:'normal',color:'#333333',fontFamily:'arial,helvetica,sans-serif'}}><span style={{fontSize:9}}>Prix Total (TTC)</span>:</strong></span><br style={{color:'#333333',fontFamily:'arial,helvetica,sans-serif',fontSize:12}}/><span style={{color:'#333333',fontFamily:'arial,helvetica,sans-serif',fontSize:20}}><strong>EUR X </strong></span></td>
                                </tr>
                            </table>
                        </div>
                      </div>
                      
                      <div style={{fontFamily:'arial,helvetica,sans-serif',marginTop: '1rem',marginLeft:'1rem',fontSize:12,color:'#333333',width:588.008}}>
                        {/* <p><span style={{fontSize:10}}>Pour toute question concernant votre réservation, veuillez appeler le département de réservation de "+ hotel.nom+" sur le [telephone de l'hotel] ou envoyer un email au <a href='"+hotel.email+"' target='_blank'>[email]</a><br/><br/></span>Salutations,<br/>[nom de l'hotel]<br/><br/></p> */}

                        {/* <Editor
                                    editorState={editorStateFooter}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                    onEditorStateChange={onEditorStateFooterChange}
                                /> */}
                                <ReactQuill className="editor-class" modules={modules} value={valueFooter} theme="snow" onChange={setValueFooter}/> 
                      </div>
                </div>
               
                
                <div style={{marginTop:20,display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                    {/* <button class="button_mail btn_blue">Previsualiser</button> */}
                    <CustomizedButton text="Sauvegarder" onClick={valider} to="#" />
                </div>
               
          </div>
        </>
      
    
    );
}
 export default ModeleEmail;