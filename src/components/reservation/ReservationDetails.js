import React from 'react';
import { Stack , Grid } from '@mui/material';
import { Link as RouterLink} from 'react-router-dom';
import { format } from 'date-fns';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PersonIcon from '@mui/icons-material/Person';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import KingBedIcon from '@mui/icons-material/KingBed';
import CustomizedPaperOutside from '../CustomizedComponents/CustomizedPaperOutside';
import CustomizedPaperInset from '../CustomizedComponents/CustomizedPaperInset';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import { lightBackgroundToTop } from '../CustomizedComponents/NeumorphismTheme';
import config from '../../config/api';


function getNumberOfNights(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = Math.abs(d2.getTime() - d1.getTime());
    const daydiff = (diff / 86400000);
    return daydiff;
}
const ReservationDetails = ({reservation,itineraireIndex,tarifIndex,navigate}) => {
    const handleClose = () => {
        navigate('list');
    };
    console.log(reservation);
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <CustomizedTitle size={20} text="Details Reservation" />
                <CustomizedButton text="retour" onClick={handleClose} variant="contained" component={RouterLink} to="#" />
            </Stack>
            <Stack  spacing={5} sx={{pl:15,pr:15}} >
                <CustomizedPaperOutside
                    sx={{
                        ...lightBackgroundToTop,
                        minHeight: '25vh',
                        border: '1px white solid',
                        padding: 3,
                        pl:5,
                        pr:5,
                        borderRadius:'8px',
                    }}
                >
                    <Stack spacing={2}>
                        <CustomizedTitle text='Statut de la réservation :' level={0} />
                        <CustomizedTitle text={`Créé le ${format(new Date(reservation.dateCreation), 'dd MMMM yyyy ~ HH:mm:SS')}`} level={2} size={14} color="black"/>
                        <CustomizedTitle text={`Confirmé le ${format(new Date(reservation.dateValidation), 'dd MMMM yyyy ~ HH:mm:SS')}`} level={2} size={14} color="black" />
                        <CustomizedTitle text={`Modifié le ${format(new Date(reservation.dateLastModif), 'dd MMMM yyyy ~ HH:mm:SS')}`} level={2} size={14} color="black" />
                    </Stack>
                </CustomizedPaperOutside>
                <CustomizedPaperOutside
                    sx={{
                        ...lightBackgroundToTop,
                        minHeight: '5vh',
                        border: '1px white solid',
                        padding: 5,
                        borderRadius: '8px',
                    }}
                >
                    <Stack direction='row' justifyContent='space-between'>
                        <Stack justifyContent='flex-start' spacing={2} direction='row'>
                            <CustomizedTitle text={`Numero d' itinéraire:`} level={2} size={14} color="black" />
                            <CustomizedTitle text={`#${reservation.itineraires[itineraireIndex].NumeroITineraire}`} level={2} size={14} color="#e20026" />
                        </Stack>
                        {
                            reservation.etat === 0 ? (
                                <Stack justifyContent='flext-end' direction='row' alignItems='center' spacing={2}>
                                    <VerifiedIcon sx={{ color: '#9bd219' }} />
                                    <CustomizedTitle text='CONFIRMÉ' level={2} size={14} color="#9bd219" />
                                </Stack>
                            ):(
                                <Stack justifyContent='flext-end' direction='row' alignItems='center' spacing={2}>
                                    <CancelIcon sx={{ color:'#e20026'}}/>
                                    <CustomizedTitle text='ANNULÉ' level={2} size={14} color="#e20026" />
                                </Stack>
                            )
                        }
                        
                    </Stack>
                </CustomizedPaperOutside>
                <CustomizedPaperOutside
                    sx={{
                        ...lightBackgroundToTop,
                        minHeight: '100vh',
                        border: '1px white solid',
                        padding: 5,
                        borderRadius: '8px',
                    }}
                >
                    <Stack spacing={2}>
                        <CustomizedTitle text={`Détails du chambre ${tarifIndex + 1}`} />
                        <CustomizedPaperInset
                            sx={{
                                ...lightBackgroundToTop,
                                minHeight: '30vh',
                                border: '1px white solid',
                                padding: 2,
                            }}
                        >
                            <Grid container spacing={1} direction='row'>
                                <Grid item xs={6}>
                                    {
                                        1 + 3 === 4 ? (
                                            <img
                                                src={`${config.host}/localpicture/no-image.jpg`}
                                                alt='chambre'
                                                loading="lazy"
                                                width={200}
                                                height={200}
                                            />
                                        ) : (
                                            <img
                                                src={`${config.host}/${reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].infoTypeChambre.photoCrop[0].replace("\\", "/")}`}
                                                alt='chambre'
                                                loading="lazy"
                                            />
                                        )
                                    }
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack alignItems='space-evenly' justifyContent='flex-start' spacing={1}>
                                        {
                                            reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].etat === 0 && (
                                                <Stack direction='row' spacing={1} alignItems='flex-start'>
                                                    <CustomizedTitle text={`Statut de la chambre:`} size={14} />
                                                    <CustomizedTitle text={`Annulé Le ${format(new Date(reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].dateAnnulation), 'dd MMMM yyyy ~ HH:mm:SS')}`} size={14} color="black" />
                                                    <CancelIcon sx={{ color: "#e20026", height: 16, width: 16 }} />
                                                </Stack>
                                            )
                                        }
                                        <Stack direction='row' spacing={1} alignItems='flex-start'>
                                            <CustomizedTitle text={`Chambre ${tarifIndex + 1} Confirmation:`} size={14} />
                                            <CustomizedTitle text={`#${reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].numeroConfirmation}`} size={14} color="black" />
                                        </Stack>
                                        <Stack direction='row' spacing={1} alignItems='flex-start'>
                                            <CustomizedTitle text={`Tarif:`} size={14} />
                                            <CustomizedTitle text={`${reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].nomTarif}`} size={14} color="black" />
                                        </Stack>
                                        <Stack direction='row' spacing={1} alignItems='flex-start'>
                                            <NightsStayIcon sx={{ height: 16, width: 16 }} />
                                            <CustomizedTitle text={`Nuitées:`} size={14} />
                                            <CustomizedTitle text={`${getNumberOfNights(reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].dateSejour.debut, reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].dateSejour.fin)} Nuit(s)`} size={14} level={2} color="black" />
                                        </Stack>
                                        <Stack direction='row' spacing={3} justifyContent='space-between' alignItems='flex-start'>
                                            <CustomizedTitle text={`Guests:`} size={14} />
                                            <Stack direction='row' alignItems='flex-start'>
                                                {
                                                    [...new Array(reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].guests.nbAdulte).fill(0)].map((a, i) => (
                                                        <PersonIcon key={`${a}${i}`} sx={{ height: 18, width: 18 }} />
                                                    ))
                                                }
                                                <CustomizedTitle text={`(Adulte)`} size={14} level={2} />
                                            </Stack>
                                            <Stack direction='row' alignItems='flex-start'>
                                                {
                                                    [...new Array(reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].guests.nbEnfant).fill(0)].map((a, i) => (
                                                        <PersonIcon sx={{ height: 14, width: 14 }} key={`${a}${i}`} />
                                                    ))
                                                }
                                                {
                                                    reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].guests.nbEnfant > 0 && (
                                                        <CustomizedTitle text={`(Enfant)`} size={14} level={2} />
                                                    )
                                                }
                                            </Stack>

                                        </Stack>
                                        <Stack direction='row' spacing={1} alignItems='flex-starts'>
                                            <AspectRatioIcon sx={{ height: 16, width: 16 }} />
                                            <CustomizedTitle text={`Surface:`} size={14} level={2} />
                                            <CustomizedTitle text={`${reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].infoTypeChambre.superficie} m²`} size={14} level={2} color="black" />
                                        </Stack>
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            <KingBedIcon sx={{ height: 16, width: 16 }} />
                                            <CustomizedTitle
                                                text={`
                                                ${reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].nomTypeChambre} 
                                                , ${reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].infoTypeChambre.chambreTotal} Chambre(s)`
                                                }
                                                size={14}
                                                level={2}
                                                color="black"
                                            />
                                        </Stack>
                                        <Stack direction='row' spacing={1} alignItems='flex-start'>
                                            <CustomizedTitle text={`Prix :`} size={14} />
                                            <CustomizedTitle text={`${reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].toPay.afterProm} €`} size={14} color="black" />
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CustomizedPaperInset>
                        
                        <CustomizedTitle text='RÉSERVATION' size={16} level={0} />
                        <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                            <ul>
                                <li>
                                    <Stack direction='row' spacing={2} alignItems='flex-start'>
                                        <CustomizedTitle text={`Date d'arrivée :`} size={14} color="black" level={2} />
                                        <CustomizedTitle text={`${format(new Date(reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].dateSejour.debut),'dd MMMM yyyy')} `} size={14} color="#008000" level={2} />
                                    </Stack>
                                </li>
                                <li>
                                    <Stack direction='row' spacing={2} alignItems='flex-start'>
                                        <CustomizedTitle text={`Date de départ :`} size={14} color="black" level={2} />
                                        <CustomizedTitle text={`${format(new Date(reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].dateSejour.fin), 'dd MMMM yyyy') } `} size={14} color="#008000" level={2} />
                                    </Stack>
                                </li>
                            </ul>
                        </div>
                        
                        
                        <CustomizedTitle text='CLIENT' size={16} level={0} />
                        <div style={{ paddingLeft: '16px', paddingRight: '16px'}}>
                            <Stack direction='row' spacing={2} alignItems='flex-start'>
                                <CustomizedTitle text='Nom:' size={14} color="black" level={2} />
                                <CustomizedTitle text={`${reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].reservateurWithEmail.nom} ${reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].reservateurWithEmail.prenom}`} size={14} color="#008000" level={2} />
                            </Stack>
                            <Stack direction='row' spacing={2} alignItems='flex-start'>
                                <CustomizedTitle text='Téléphone:' size={14} color="black" level={2} />
                                <CustomizedTitle text={reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].reservateurWithEmail.tel} size={14} color="#008000" level={2} />
                            </Stack>
                            <Stack direction='row' spacing={2} alignItems='flex-start'>
                                <CustomizedTitle text='Adresse email:' size={14} color="black" level={2} />
                                <CustomizedTitle text={reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].reservateurWithEmail.email} size={14} color="#008000" level={2} />
                            </Stack>
                        </div>
                        
                        <CustomizedTitle text='INFORMATIONS SUR LE TARIF' size={16} level={0} />
                        <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                            <CustomizedTitle text={reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].infoTarif.description} size={14} color="black" level={2} />
                        </div>

                        <CustomizedTitle text='PRÉFÉRENCES SUPPLÉMENTAIRES' size={16} level={0} />
                        <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                            <CustomizedTitle 
                                text={reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].reservateurWithEmail.messageParticulier
                                    ? reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].reservateurWithEmail.messageParticulier
                                    : 'Pas de préférences supplémentaires'} 
                                size={14} 
                                color="black" 
                                level={2} 
                            />
                        </div>
                        <Stack spacing={3} direction='row' alignItems='flex-start'>
                            <CustomizedTitle text='Prix:' size={18} level={0} color="black" />
                            <CustomizedTitle text={`${reservation.itineraires[itineraireIndex].tarifReserves[tarifIndex].toPay.afterProm} €`} size={22} level={0} color="#008000" />
                        </Stack>
                    </Stack>
                </CustomizedPaperOutside>
                <CustomizedPaperOutside
                    sx={{
                        ...lightBackgroundToTop,
                        minHeight: '5vh',
                        border: '1px white solid',
                        padding: 5,
                        borderRadius: '8px',
                    }}
                >
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <CustomizedTitle text='Repondre le client:' size={24} level={0} />
                        <a 
                        HREF="mailto:andriantsilavinaanthony@gmail.com?subject=Notre affaire
                             &body=Bonjour" 
                        target="_blank" 
                        rel="noopener noreferrer">
                            <CustomizedButton text={`Ouvrir mail`} />
                        </a>
                    </Stack>
                </CustomizedPaperOutside>
                
            </Stack>
            
                     
        </>
    );
};
export default ReservationDetails;