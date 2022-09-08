import React , { useEffect , useState } from 'react';
import { Grid , Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import CalendarValueSide from './CalendarValueSide';
import CalendarAttributeSide from './CalendarAttributeSide';
import { getTcTarifPrix } from '../../services/TCTarif';

import './index.css';


const CalendarEditor = () => {
    const date = new Date('2022-08-31');
    console.log(date);
    const list = [...new Array(30)].map((e,i)=>{
        date.setDate(date.getDate() + 1);
        return new Date(date.getTime());
    });
    const [chambre,setChambre] = useState({
        "nom":"Chambre standard",
        "planTarifaire": [{
            "nom": "Petit déjeuner - Non remboursable",
            "prixTarif": [
                {
                    "versions": [{
                        "nbPers": 1,
                        "prix": 90
                    }, {
                        "nbPers": 2,
                        "prix": 100
                    }],
                    "minSejour": 1,
                    "date": "2022-07-22T00:00:00.000Z",
                    "closed": false,
                    "dateInsert": "2022-07-22T17:22:42.480Z"
                }, 
                {
                    "versions": [{
                        "nbPers": 1,
                        "prix": 90
                    }, {
                        "nbPers": 2,
                        "prix": 100
                    }],
                    "minSejour": 1,
                    "date": "2022-07-23T00:00:00.000Z",
                    "closed": false,
                    "dateInsert": "2022-07-22T17:22:42.480Z"
                }, 
                {
                    "versions": [{
                        "nbPers": 1,
                        "prix": 90
                    }, {
                        "nbPers": 2,
                        "prix": 100
                    }],
                    "minSejour": 1,
                    "date": "2022-07-24T00:00:00.000Z",
                    "closed": true,
                    "dateInsert": "2022-07-22T17:22:42.480Z"
                }, 
                {
                    "versions": [{
                        "nbPers": 1,
                        "prix": 10
                    }, {
                        "nbPers": 2,
                        "prix": 30
                    }],
                    "minSejour": 1,
                    "date": "2022-07-25T00:00:00.000Z",
                    "closed": false,
                    "dateInsert": "2022-07-25T09:06:31.089Z"
                }]
        }, {
            "nom": "Petit déjeuner - flexible",
            "prixTarif": [{
                "versions": [{
                    "nbPers": 1,
                    "prix": 120
                }, {
                    "nbPers": 2,
                    "prix": 130
                }],
                "minSejour": 1,
                "date": "2022-07-22T00:00:00.000Z",
                "closed": true,
                "dateInsert": "2022-07-22T17:22:59.928Z"
            }, {
                "versions": [{
                    "nbPers": 1,
                    "prix": 120
                }, {
                    "nbPers": 2,
                    "prix": 130
                }],
                "minSejour": 1,
                "date": "2022-07-23T00:00:00.000Z",
                "closed": true,
                "dateInsert": "2022-07-22T17:22:59.928Z"
            }, {
                "versions": [{
                    "nbPers": 1,
                    "prix": 120
                }, {
                    "nbPers": 2,
                    "prix": 130
                }],
                "minSejour": 1,
                "date": "2022-07-24T00:00:00.000Z",
                "closed": false,
                "dateInsert": "2022-07-22T17:22:59.928Z"
            }, {
                "versions": [{
                    "nbPers": 1,
                    "prix": 120
                }, {
                    "nbPers": 2,
                    "prix": 130
                }],
                "minSejour": 1,
                "date": "2022-07-25T00:00:00.000Z",
                "closed": false,
                "dateInsert": "2022-07-22T17:22:59.928Z"
            }]
        }],
    });
    const [ratePlanList , setRatePlanList] = useState(new Array(0));
    const [ratePlanAttributList ,setRatePlanAttributeList ] = useState(new Array(0));
    console.log(chambre);
    const loadCells = () => {
        const ratePlanListTemp = []; // [RatePlan values and information ] all the cells in the right side in the calendar(table)
        const ratePlanAttributeListTemp = []; // [RatePlan name or attribute ] all the cells in the left side in the calendar(table)
        chambre.planTarifaire.forEach((tarif, j) => {
            const prixTarifList = [];
            const prixTarifAttributeList = [];
            [...new Array(tarif.prixTarif[0]?.versions?.length)].forEach((versionsPrototype,index)=>{

                prixTarifAttributeList.push((
                    <tr key={index}>
                        <td style={{ paddingLeft:'50% !important',letterSpacing:'0.2em'}}>
                            
                            <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-evenly'>
                                <span>
                                    ›   
                                </span>
                                <span style={{ fontSize: '16px' }}>
                                    (x {tarif.prixTarif[0]?.versions[index]?.nbPers})
                                </span>
                                <PersonIcon />
                            </Stack>
                                
                        </td>
                    </tr>
                ));
                prixTarifList.push((
                    <tr key={index}>
                        {
                            tarif.prixTarif.map((pt, i) => {
                                return (
                                    <td 
                                        key={`${index}-${i}`}
                                    >
                                        {pt.versions[index]?.prix}$
                                    </td>
                                )
                                        
                            })
                        }
                    </tr>
                ));
            });
            console.log(prixTarifList);
            ratePlanListTemp.push((
                    <React.Fragment key={j}>
                        <tr key='ratePlan status'>
                            {
                                tarif.prixTarif.map((p, i) => {
                                    return (
                                        <td className='status' key={i}>
                                            <div
                                                style={{
                                                    paddingLeft: '0px !important',
                                                    background: p.closed ? '#FF0000' : '#64E986',
                                                    height: '75%',
                                                }}
                                            />
                                        </td>
                                    );
                                })
                            }
                        </tr>
                        {
                            prixTarifList.map((prixElement)=>{
                                return prixElement;
                            })
                        }
                    </React.Fragment>
                ))
            ratePlanAttributeListTemp.push((
                <React.Fragment key={j}>
                    <tr key='ratePlan attribute status'>
                        <td className='status'>
                            <span style={{letterSpacing:'5px'}}>
                                • 
                            </span>
                             {tarif.nom}
                        </td>
                    </tr>
                    {
                        prixTarifAttributeList.map((element)=>{
                            return element;
                        })
                    }
                </React.Fragment>
            ));
        })
        setRatePlanList(()=>ratePlanListTemp);
        setRatePlanAttributeList(()=>ratePlanAttributeListTemp);
    };
    useEffect(()=>{
        const payload = {
            dateDebut:"2022-09-01",
            dateFin:"2022-09-30"
        };
        getTcTarifPrix(payload)
            .then((result)=>{
                if(result.data.status === 200){
                    const temp = {...result.data.typeChambre[0]};
                    setChambre(() =>  temp );
                }
                else{
                    alert('Unable to load data');
                }
            })
            .catch(()=>{
                alert('Error!');
            });
        loadCells();
    },[])
    return (
        <CustomizedPaperOutside elevation={12} sx={{ background: '#E3EDF7', p: 5 }}>
            <Grid container >
                <Grid item xs={4}>
                    <CalendarAttributeSide chambre={chambre} ratePlanAttributeList={ratePlanAttributList}/>
                </Grid>
                <Grid item xs={8} >
                    <CalendarValueSide  list={list} chambre={chambre} ratePlanList={ratePlanList}/>
                </Grid>
            </Grid>
        </CustomizedPaperOutside>
    );
};

export default CalendarEditor;