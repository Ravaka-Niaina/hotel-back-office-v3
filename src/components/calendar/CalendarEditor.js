import React , { useEffect , useState } from 'react';
import debounce from 'lodash.debounce';
import { Grid , Stack } from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';

import StatusCell from './cells/StatusCell';

import { CellRoomEditorPopper, SelectableRoomCell } from './cells/room';
import { CellRatePlanEditorPopper , SelectableRatePlanCell } from './cells/rateplan';

import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import CalendarValueSide from './CalendarValueSide';
import CalendarAttributeSide from './CalendarAttributeSide';

import { getTcTarifPrix } from '../../services/TCTarif';

import './index.css';


const CalendarEditor = () => {
    const date = new Date('2022-08-31');
    // console.log(date);
    const list = [...new Array(30)].map((e,i)=>{
        date.setDate(date.getDate() + 1);
        return new Date(date.getTime());
    });
    const [selectedRoom, setSelectedRoom] = useState(new Array(0));
    const [anchorElRoom, setAnchorElRoom] = React.useState(null);
    const [openRoomEditor, setOpenRoomEditor] = React.useState(false);

    const [selectedRatePlan, setSelectedRatePlan] = useState(new Array(0));
    const [anchorElRatePlan, setAnchorElRatePlan] = React.useState(null);
    const [openRatePlanEditor, setOpenRatePlanEditor] = React.useState(false);
    
    const cleanOthers = (name) => {
        const setters = {
            room:setSelectedRoom,
            rate_plan:setSelectedRatePlan,
        };
        setters[name]?.call(setters,[]);
    };
    const handleSelectOneRoom = (e, item) => {
        if (!selectedRoom.includes(item) || selectedRoom.length > 1) {
            const target = e.currentTarget;
            setSelectedRoom([item]);
            setSelectedRatePlan([]);
            setOpenRoomEditor(false);
            setTimeout(
                () => {
                    setAnchorElRoom(target);
                    setOpenRoomEditor(true);
                }, 420
            );
        }
    };
    const handleSelectOneRatePlan = (e, item) => {
        if (!selectedRatePlan.includes(item) || selectedRatePlan.length > 1) {
            const target = e.currentTarget;
            setSelectedRatePlan([item]);
            setSelectedRoom([]);
            setOpenRatePlanEditor(false);
            setTimeout(
                () => {
                    setAnchorElRatePlan(target);
                    setOpenRatePlanEditor(true);
                }, 420
            );
        }
    };
    
    const [chambre,setChambre] = useState(
        {
            "_id": "620f4277d5360b160f48908e",
            "nom": "Chambre standard",
            "nbAdulte": 2,
            "nbEnfant": 0,
            "photo": [
                "galerie\\1659013199948kNl.png",
                "galerie\\1659013219160lOo.png"
            ],
            "chambreTotal": 3,
            "etage": 1,
            "superficie": 30,
            "description": "20m² de cadre élégant avec un petit balcon donnant sur la ville.\nLit queen size. Equipement en chambres : une télévision avec canal satellite, un coffre-fort, un minibar, une climatisation réversible en individuelle, un bureau, un service de plateau thé & café en chambre et un téléphone.\nLit queen size. Equipement en chambres : une télévision avec canal satellite, un coffre-fort, un minibar, une climatisation réversible en individuelle, un bureau, un service de plateau thé & café en chambre et un téléphone.\nEquipement en chambres : une télévision avec canal satellite, un coffre-fort, un minibar, une climatisation réversible en individuelle, un bureau, un service de plateau thé & café en chambre et un téléphone.",
            "videos": [
                ""
            ],
            "etat": 1,
            "equipements": [
                "61fc3b90706cc805d14aaac1",
                "6193e0e510749a3eb138c894",
                "61fc49dd706cc805d14aaac2",
                "61fc4b72706cc805d14aaac3"
            ],
            "planTarifaire": [
                {
                    "_id": "629610223e88b46249d2a1e0",
                    "nom": "Petit déjeuner - Non remboursable",
                    "description": "Petit déjeuner en Buffet, accès au SPA inclus - Vignette touristique de 6700 MGA par chambre par jour non incluse\nPetit déjeuner en Buffet - SPA: piscine , sauna, hammam , cardio, centre de fitness.Special pour les massages et autres traitements",
                    "isDateReservAuto": false,
                    "dateReservation": {
                        "debut": "2022-05-31",
                        "fin": "2022-12-31"
                    },
                    "dateSejour": {
                        "debut": "2022-05-31",
                        "fin": "2022-12-31"
                    },
                    "isLeadHour": true,
                    "lead": {
                        "min": null,
                        "max": 0
                    },
                    "name": "Petit déjeuner - Non remboursable",
                    "desc": "Hello",
                    "chambresAtrb": [
                        "620f4277d5360b160f48908e",
                        "620f4e75d5360b160f4890a7"
                    ],
                    "politiqueAnnulAtrb": [
                        "620f44b2d5360b160f489098"
                    ],
                    "debutReserv": null,
                    "finReserv": null,
                    "leadMinInfini": true,
                    "reservAToutMoment": true,
                    "aucunFinDateSejour": false,
                    "dateCreation": "2022-05-31T12:54:58.732Z",
                    "etat": 1,
                    "toCompare": "620f4277d5360b160f48908e",
                    "activationTCTarif": [
                        {
                            "_id": "6319ca57bae506c2057e4825",
                            "idTypeChambre": "620f4277d5360b160f48908e",
                            "idTarif": "629610223e88b46249d2a1e0",
                            "isActif": true,
                            "dateInsert": "2022-09-08T10:56:23.640Z"
                        }
                    ],
                    "prixTarif": [
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-01T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-02T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-03T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-04T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-05T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-06T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-07T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-08T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-09T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-10T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-11T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-12T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-13T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-14T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-15T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-16T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-17T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-18T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-19T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-20T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-21T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-22T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-23T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-24T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-25T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-26T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-27T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-28T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-29T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": 90
                                },
                                {
                                    "nbPers": 2,
                                    "prix": 100
                                }
                            ],
                            "minSejour": 1,
                            "date": "2022-09-30T00:00:00.000Z",
                            "closed": false,
                            "dateInsert": "2022-07-22T17:22:42.480Z"
                        }
                    ]
                },
                {
                    "_id": "629611d73e88b46249d2a1e5",
                    "nom": "Petit déjeuner - flexible",
                    "description": "Petit déjeuner en Buffet, accès au SPA inclus - Vignette touristique de 6700 MGA par chambre par jour non incluse\nPetit dejeuner en Buffet - SPA: piscine , sauna, hammam , cardio, centre de fitness.Special pour les massages et autres traitements",
                    "isDateReservAuto": false,
                    "dateReservation": {
                        "debut": "2022-05-31",
                        "fin": "2022-12-31"
                    },
                    "dateSejour": {
                        "debut": "2022-05-31",
                        "fin": "2022-12-31"
                    },
                    "isLeadHour": true,
                    "lead": {
                        "min": null,
                        "max": 0
                    },
                    "name": "Hello Petit déjeuner - flexible",
                    "desc": "Hello Petit déjeuner en Buffet, accès au SPA inclus - Vignette touristique de 6700 MGA par chambre par jour non incluse\nPetit dejeuner en Buffet - SPA: piscine , sauna, hammam , cardio, centre de fitness.Special pour les massages et autres traitements",
                    "chambresAtrb": [
                        "620f4277d5360b160f48908e",
                        "620f4e75d5360b160f4890a7"
                    ],
                    "politiqueAnnulAtrb": [
                        "620f451dd5360b160f48909c"
                    ],
                    "debutReserv": null,
                    "finReserv": null,
                    "leadMinInfini": true,
                    "reservAToutMoment": true,
                    "aucunFinDateSejour": false,
                    "dateCreation": "2022-05-31T13:02:15.848Z",
                    "etat": 1,
                    "toCompare": "620f4277d5360b160f48908e",
                    "activationTCTarif": [
                        {
                            "_id": "62fe2fa719b5e23901dd106f",
                            "idTypeChambre": "620f4277d5360b160f48908e",
                            "idTarif": "629611d73e88b46249d2a1e5",
                            "isActif": true,
                            "dateInsert": "2022-08-18T12:25:10.970Z"
                        }
                    ],
                    "prixTarif": [
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-01T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-02T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-03T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-04T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-05T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-06T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-07T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-08T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-09T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-10T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-11T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-12T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-13T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-14T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-15T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-16T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-17T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-18T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-19T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-20T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-21T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-22T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-23T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-24T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-25T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-26T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-27T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-28T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-29T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        },
                        {
                            "versions": [
                                {
                                    "nbPers": 1,
                                    "prix": ""
                                },
                                {
                                    "nbPers": 2,
                                    "prix": ""
                                }
                            ],
                            "minSejour": 0,
                            "date": "2022-09-30T00:00:00.000Z",
                            "closed": true,
                            "isTypeChambreClosed": true,
                            "exists": false
                        }
                    ]
                }
            ],
            "photoCrop": [
                "typeChambreCrop\\620f4277d5360b160f48908e_1659013240801NSM.jpeg"
            ],
            "tarifs": [
                "629610223e88b46249d2a1e0",
                "629611d73e88b46249d2a1e5"
            ],
            "statusDays": [
                {
                    "closed": false,
                    "date": "2022-09-01",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-02",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-03",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-04",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-05",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-06",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-07",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-08",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-09",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-10",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-11",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-12",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-13",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-14",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-15",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-16",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-17",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-18",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-19",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-20",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-21",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-22",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-23",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-24",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-25",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-26",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-27",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-28",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-29",
                    "toSell": 20
                },
                {
                    "closed": false,
                    "date": "2022-09-30",
                    "toSell": 20
                }
            ],
            "booked": [
                {
                    "value": 14,
                    "date": "2022-09-01T00:00:00.000Z"
                },
                {
                    "value": 8,
                    "date": "2022-09-02T00:00:00.000Z"
                },
                {
                    "value": 7,
                    "date": "2022-09-03T00:00:00.000Z"
                },
                {
                    "value": 3,
                    "date": "2022-09-04T00:00:00.000Z"
                },
                {
                    "value": 4,
                    "date": "2022-09-05T00:00:00.000Z"
                },
                {
                    "value": 19,
                    "date": "2022-09-06T00:00:00.000Z"
                },
                {
                    "value": 19,
                    "date": "2022-09-07T00:00:00.000Z"
                },
                {
                    "value": 12,
                    "date": "2022-09-08T00:00:00.000Z"
                },
                {
                    "value": 10,
                    "date": "2022-09-09T00:00:00.000Z"
                },
                {
                    "value": 2,
                    "date": "2022-09-10T00:00:00.000Z"
                },
                {
                    "value": 4,
                    "date": "2022-09-11T00:00:00.000Z"
                },
                {
                    "value": 4,
                    "date": "2022-09-12T00:00:00.000Z"
                },
                {
                    "value": 4,
                    "date": "2022-09-13T00:00:00.000Z"
                },
                {
                    "value": 4,
                    "date": "2022-09-14T00:00:00.000Z"
                },
                {
                    "value": 2,
                    "date": "2022-09-15T00:00:00.000Z"
                },
                {
                    "value": 2,
                    "date": "2022-09-16T00:00:00.000Z"
                },
                {
                    "value": 2,
                    "date": "2022-09-17T00:00:00.000Z"
                },
                {
                    "value": 2,
                    "date": "2022-09-18T00:00:00.000Z"
                },
                {
                    "value": 2,
                    "date": "2022-09-19T00:00:00.000Z"
                },
                {
                    "value": 3,
                    "date": "2022-09-20T00:00:00.000Z"
                },
                {
                    "value": 1,
                    "date": "2022-09-21T00:00:00.000Z"
                },
                {
                    "value": 1,
                    "date": "2022-09-22T00:00:00.000Z"
                },
                {
                    "value": 1,
                    "date": "2022-09-23T00:00:00.000Z"
                },
                {
                    "value": 1,
                    "date": "2022-09-24T00:00:00.000Z"
                },
                {
                    "value": 1,
                    "date": "2022-09-25T00:00:00.000Z"
                },
                {
                    "value": 1,
                    "date": "2022-09-26T00:00:00.000Z"
                },
                {
                    "value": 1,
                    "date": "2022-09-27T00:00:00.000Z"
                },
                {
                    "value": 1,
                    "date": "2022-09-28T00:00:00.000Z"
                },
                {
                    "value": 0,
                    "date": "2022-09-29T00:00:00.000Z"
                },
                {
                    "value": 0,
                    "date": "2022-09-30T00:00:00.000Z"
                }
            ]
        }
    );
    
    const [roomDetails , setRoomDetails ] = useState({
        roomStatus:[],
        roomToSell:[],
        bookedRoom:[],
    });
    const [ratePlanList , setRatePlanList ] = useState(new Array(0));
    const [ratePlanAttributList ,setRatePlanAttributeList ] = useState(new Array(0));
    
    const loadRoomDetailsRows = () => {
        const roomStatus = []; const roomToSell = []; const bookedRoom= [];
        chambre.statusDays.forEach((status,i)=>{
            roomStatus.push((
                <td className='status' key={`roomStatus-${i}`}>
                    <StatusCell available={!status.closed} />
                </td>
            ))
            roomToSell.push((
                <td key={`roomToSell-${i}`} style={{position:'relative'}}>
                    <SelectableRoomCell
                        item={status.date}
                        selected={selectedRoom}
                        setSelected={setSelectedRoom}
                        setAnchorEl={setAnchorElRoom}
                        setOpen={setOpenRoomEditor}
                        cleanOthers={cleanOthers}
                        chambre={chambre}
                        onClick={(e) => handleSelectOneRoom(e, status.date)}
                    >
                        {status.toSell}
                        
                    </SelectableRoomCell>
                    
                </td>
            ))
            bookedRoom.push((
                <td key={`bookedRoom-${i}`}>
                    {chambre.booked?.[i]?.value}
                </td>
            ))
        })
        setRoomDetails((oldRoomDetails) => ({
            ...oldRoomDetails,
            roomStatus,roomToSell,bookedRoom
        }));
    };
    const loadRatePlanRows  = () => {
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
                                <PeopleIcon />
                            </Stack>
                                
                        </td>
                    </tr>
                ));
                prixTarifList.push((
                    <tr key={index}>
                        {
                            tarif.prixTarif.map((pt, i) => {
                                const item = `${pt.date}@${j}@${index}`;
                                return (
                                    <td
                                        key={`${index}-${i}`}
                                        style={{position:'relative'}}
                                    >
                                        <SelectableRatePlanCell 
                                            item={item}
                                            chambre={chambre} 
                                            selected={selectedRatePlan} 
                                            setSelected={setSelectedRatePlan} 
                                            setAnchorEl={ setAnchorElRatePlan}
                                            setOpen={setOpenRatePlanEditor}
                                            cleanOthers={cleanOthers}
                                            onClick={(e) => handleSelectOneRatePlan(e, item)}
                                        >
                                            {pt.versions[index]?.prix}$
                                        </SelectableRatePlanCell>
                                        
                                    </td>
                                )
                                        
                            })
                        }
                    </tr>
                ));
            });
            ratePlanListTemp.push((
                    <React.Fragment key={j}>
                        <tr key='ratePlan status'>
                            {
                                tarif.prixTarif.map((p, i) => {
                                    
                                    return (
                                        <td className='status' key={i}>
                                            <StatusCell available={!p.closed} />
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

    const loadCells = () => {
       loadRoomDetailsRows();
       loadRatePlanRows();
    };
    useEffect(()=>{
        loadRoomDetailsRows();
    },[selectedRoom]) 

    useEffect(() => {
        loadRatePlanRows();
    }, [selectedRatePlan]) 

    useEffect(()=>{

        const payload = {
            dateDebut:"2022-09-01",
            dateFin:"2022-09-30"
        };
        getTcTarifPrix(payload)
            .then((result)=>{
                if(result.data.status === 200){
                    const temp = {...result.data.typeChambre[0]};
                    // console.log(temp);
                    setChambre(() =>  temp );
                }
                else{
                    const e = 2;
                }
            })
            .catch(()=>{
                const c= 1;
            });
        loadCells();
    },[])
    return (
        <CustomizedPaperOutside elevation={12} sx={{ background: '#E3EDF7', p: 5 }}>
            <CellRoomEditorPopper open={openRoomEditor} setOpen={setOpenRoomEditor} anchorEl={anchorElRoom} sx={{ zIndex:16777270}} selected={selectedRoom} setSelected={setSelectedRoom}/>
            <CellRatePlanEditorPopper open={openRatePlanEditor} setOpen={setOpenRatePlanEditor} anchorEl={anchorElRatePlan} sx={{ zIndex: 16777270 }} selected={selectedRatePlan} setSelected={setSelectedRatePlan} />
            <Grid container>
                <Grid item xs={4} >
                    <CalendarAttributeSide 
                        chambre={chambre} 
                        ratePlanAttributeList={ratePlanAttributList}
                    />
                </Grid>
                <Grid item xs={8}>
                    <CalendarValueSide  
                        list={list} 
                        chambre={chambre} 
                        ratePlanList={ratePlanList} 
                        roomDetails={roomDetails}
                    />
                </Grid>
            </Grid>
        </CustomizedPaperOutside>
    );
};

export default CalendarEditor;