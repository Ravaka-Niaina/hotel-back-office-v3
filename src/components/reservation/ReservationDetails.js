import React , { useState, useEffect} from 'react';
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
function imageExists(imageUrl){

    const http = new XMLHttpRequest();

    http.open('HEAD', imageUrl, false);
    http.send();

    return http.status !== 404;

}
const ReservationDetails = ({reservation,itineraireIndex,tarifIndex,navigate}) => {
    const [mailObject,setMailObject] = useState('');
    const [mailBody,setMailBody] = useState('');

    const [tarif,setTarif] = useState(null);
    const [itineraire,setItineraire] = useState(null);
    const handleClose = () => {
        navigate('list');
    };
    useEffect(() => {
        const itineraireTemp = reservation.itineraires[itineraireIndex];
        const tarifTemp = itineraireTemp.tarifReserves[tarifIndex];
        setItineraire(itineraireTemp);
        setTarif(tarifTemp);
        setMailObject(`Réponse à la demande concernant votre réservation à nom de l'hotel, ${tarifTemp.nomTypeChambre}, ${tarifTemp.nomTarif}`);
        setMailBody(`Votre demande: ${tarifTemp.reservateurWithEmail.messageParticulier === null ? '' : tarifTemp.reservateurWithEmail.messageParticulier}`);
        // console.log(reservation);
    },[]);
    
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <CustomizedTitle size={20} text="Details Reservation" />
                <CustomizedButton text="retour" onClick={handleClose} variant="contained" component={RouterLink} to="#" />
            </Stack>
            {
                tarif !== null && itineraire !== null && (
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
                                    <CustomizedTitle text={`Numero d' itinéraire:`} level={0} />
                                    <CustomizedTitle text={`#${itineraire.NumeroITineraire}`} level={2} size={14} color="#e20026" />
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
                                                !imageExists(`${config.host}/${tarif.infoTypeChambre.photoCrop[0].replace("\\", "/")}`) ? (
                                                    <img
                                                        src={`${config.host}/localpicture/no-image.jpg`}
                                                        alt='chambre'
                                                        loading="lazy"
                                                        width={200}
                                                        height={200}
                                                    />
                                                ) : (
                                                    <img
                                                        src={`${config.host}/${tarif.infoTypeChambre.photoCrop[0].replace("\\", "/")}`}
                                                        alt='chambre'
                                                        loading="lazy"
                                                    />
                                                )
                                            }
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack alignItems='space-evenly' justifyContent='flex-start' spacing={1}>
                                                {
                                                    tarif.etat === 0 && (
                                                        <Stack direction='row' spacing={1} alignItems='flex-start'>
                                                            <CustomizedTitle text={`Statut de la chambre:`} size={14} />
                                                            <CustomizedTitle text={`Annulé Le ${format(new Date(tarif.dateAnnulation), 'dd MMMM yyyy ~ HH:mm:SS')}`} size={14} color="black" />
                                                            <CancelIcon sx={{ color: "#e20026", height: 16, width: 16 }} />
                                                        </Stack>
                                                    )
                                                }
                                                <Stack direction='row' spacing={1} alignItems='flex-start'>
                                                    <CustomizedTitle text={`Chambre ${tarifIndex + 1} Confirmation:`} size={14} />
                                                    <CustomizedTitle text={`#${tarif.numeroConfirmation}`} size={14} color="black" />
                                                </Stack>
                                                <Stack direction='row' spacing={1} alignItems='flex-start'>
                                                    <CustomizedTitle text={`Tarif:`} size={14} />
                                                    <CustomizedTitle text={`${tarif.nomTarif}`} size={14} color="black" />
                                                </Stack>
                                                <Stack direction='row' spacing={1} alignItems='flex-start'>
                                                    <NightsStayIcon sx={{ height: 16, width: 16 }} />
                                                    <CustomizedTitle text={`Nuitées:`} size={14} />
                                                    <CustomizedTitle text={`${getNumberOfNights(tarif.dateSejour.debut, tarif.dateSejour.fin)} Nuit(s)`} size={14} level={2} color="black" />
                                                </Stack>
                                                <Stack direction='row' spacing={3} justifyContent='space-between' alignItems='flex-start'>
                                                    <CustomizedTitle text={`Guests:`} size={14} />
                                                    <Stack direction='row' alignItems='flex-start'>
                                                        {
                                                            [...new Array(tarif.guests.nbAdulte).fill(0)].map((a, i) => (
                                                                <PersonIcon key={`${a}${i}`} sx={{ height: 18, width: 18 }} />
                                                            ))
                                                        }
                                                        <CustomizedTitle text={`(Adulte)`} size={14} level={2} />
                                                    </Stack>
                                                    <Stack direction='row' alignItems='flex-start'>
                                                        {
                                                            [...new Array(tarif.guests.nbEnfant).fill(0)].map((a, i) => (
                                                                <PersonIcon sx={{ height: 14, width: 14 }} key={`${a}${i}`} />
                                                            ))
                                                        }
                                                        {
                                                            tarif.guests.nbEnfant > 0 && (
                                                                <CustomizedTitle text={`(Enfant)`} size={14} level={2} />
                                                            )
                                                        }
                                                    </Stack>

                                                </Stack>
                                                <Stack direction='row' spacing={1} alignItems='flex-starts'>
                                                    <AspectRatioIcon sx={{ height: 16, width: 16 }} />
                                                    <CustomizedTitle text={`Surface:`} size={14} level={2} />
                                                    <CustomizedTitle text={`${tarif.infoTypeChambre.superficie} m²`} size={14} level={2} color="black" />
                                                </Stack>
                                                <Stack direction='row' spacing={1} alignItems='center'>
                                                    <KingBedIcon sx={{ height: 16, width: 16 }} />
                                                    <CustomizedTitle
                                                        text={`
                                                        ${tarif.nomTypeChambre} 
                                                        , ${tarif.infoTypeChambre.chambreTotal} Chambre(s)`
                                                        }
                                                        size={14}
                                                        level={2}
                                                        color="black"
                                                    />
                                                </Stack>
                                                <Stack direction='row' spacing={1} alignItems='flex-start'>
                                                    <CustomizedTitle text={`Prix :`} size={14} />
                                                    <CustomizedTitle text={`${tarif.toPay.afterProm} €`} size={14} color="black" />
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
                                                <CustomizedTitle text={`${format(new Date(tarif.dateSejour.debut),'dd MMMM yyyy')} `} size={14} color="#008000" level={2} />
                                            </Stack>
                                        </li>
                                        <li>
                                            <Stack direction='row' spacing={2} alignItems='flex-start'>
                                                <CustomizedTitle text={`Date de départ :`} size={14} color="black" level={2} />
                                                <CustomizedTitle text={`${format(new Date(tarif.dateSejour.fin), 'dd MMMM yyyy') } `} size={14} color="#008000" level={2} />
                                            </Stack>
                                        </li>
                                    </ul>
                                </div>
                                
                                
                                <CustomizedTitle text='CLIENT' size={16} level={0} />
                                <div style={{ paddingLeft: '16px', paddingRight: '16px'}}>
                                    <Stack direction='row' spacing={2} alignItems='flex-start'>
                                        <CustomizedTitle text='Nom:' size={14} color="black" level={2} />
                                        <CustomizedTitle text={`${tarif.reservateurWithEmail.nom} ${tarif.reservateurWithEmail.prenom}`} size={14} color="#008000" level={2} />
                                    </Stack>
                                    <Stack direction='row' spacing={2} alignItems='flex-start'>
                                        <CustomizedTitle text='Téléphone:' size={14} color="black" level={2} />
                                        <CustomizedTitle text={tarif.reservateurWithEmail.tel} size={14} color="#008000" level={2} />
                                    </Stack>
                                    <Stack direction='row' spacing={2} alignItems='flex-start'>
                                        <CustomizedTitle text='Adresse email:' size={14} color="black" level={2} />
                                        <CustomizedTitle text={tarif.reservateurWithEmail.email} size={14} color="#008000" level={2} />
                                    </Stack>
                                </div>
                                
                                <CustomizedTitle text='INFORMATIONS SUR LE TARIF' size={16} level={0} />
                                <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                                    <CustomizedTitle text={tarif.infoTarif.description} size={14} color="black" level={2} />
                                </div>

                                <CustomizedTitle text='PRÉFÉRENCES SUPPLÉMENTAIRES' size={16} level={0} />
                                <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                                    <CustomizedTitle 
                                        text={tarif.reservateurWithEmail.messageParticulier
                                            ? tarif.reservateurWithEmail.messageParticulier
                                            : 'Pas de préférences supplémentaires'} 
                                        size={14} 
                                        color="black" 
                                        level={2} 
                                    />
                                </div>
                                <CustomizedTitle text='POLITIQUE DE GARANTIE' size={16} level={0} />
                                <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                                    <CustomizedTitle 
                                        text={`
                                            L'enregistrement de votre numéro de carte de crédit 
                                            à titre de garantie permet la validation de votre réservation. 
                                            Une pré-autorisation ou un débit de votre carte pourrait survenir 
                                            ultérieurement selon les dispositions indiquées dans les conditions 
                                            générales de vente et la politique d’annulation. L'annulation est gratuite 
                                            à condition de respecter le délai de notification indiqué 
                                            dans la politique d'annulation de l'hôtel.
                                        `} 
                                        size={14} 
                                        color="black" 
                                        level={2} 
                                    />
                                </div>
                                
                                <CustomizedTitle text={`POLITIQUE D'ANNULATION`} size={16} level={0} />
                                <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                                    <ul>
                                        {
                                            tarif.politiqueAnnulAtrb[0].remboursable &&
                                            tarif.politiqueAnnulAtrb[0].cancelingInfoWithPreciseDate[0].isActive &&
                                            tarif.politiqueAnnulAtrb[0].cancelingInfoWithPreciseDate[0].date !==
                                            itineraire.dateSejour.debut && (
                                                <li key='first'>
                                                    <CustomizedTitle
                                                        text={`
                                                            Vous pouvez annuler votre réservation
                                                            gratuitement avant le
                                                            ${
                                                                format(
                                                                    new Date(tarif.politiqueAnnulAtrb[0].cancelingInfoWithPreciseDate[0].date), 
                                                                    'dd MMMM yyyy'
                                                                )
                                                            } à Midi.
                                                        `} 
                                                        size={14}
                                                        color="black" 
                                                        level={2}
                                                    />
                                
                                                </li>
                                            )
                                        }
                                        {
                                            tarif.politiqueAnnulAtrb[0].remboursable &&
                                            tarif.politiqueAnnulAtrb[0].cancelingInfoWithPreciseDate.map(       
                                                (cancelingInfoWithPreciseDate, index) => {
                                                    if (
                                                        index ===
                                                        tarif.politiqueAnnulAtrb[0].cancelingInfoWithPreciseDate.length - 1
                                                    ) {
                                                        return (
                                                                <li key={index}>
                                                                    <CustomizedTitle
                                                                        text={`Votre carte sera débité du montant
                                                                        total de la réservation le jour de
                                                                        votre arrivée 
                                                                        le ${format(new Date(cancelingInfoWithPreciseDate.date), 'dd MMMM yyyy')}
                                                                         .`} 
                                                                        size={14}
                                                                        color="black" 
                                                                        level={2}
                                                                    />
                    
                                                                </li>
                                                        );
                                                    }

                                                    if (
                                                        tarif.politiqueAnnulAtrb[0]
                                                        .cancelingInfoWithPreciseDate[index]
                                                        .isActive
                                                    ) {
                                                        return (
                                                            <li key={`active-${index}`}>
                                                                <CustomizedTitle
                                                                    text={`
                                                                        En cas d’annulation après le  
                                                                        ${
                                                                            format(new Date(cancelingInfoWithPreciseDate.date), 'dd MMMM yyyy')
                                                                        }
                                                                        à Midi, votre carte sera débité de
                                                                        ${
                                                                            cancelingInfoWithPreciseDate.pourcentage
                                                                        }
                                                                        %.
                                                                    `} 
                                                                    size={14}
                                                                    color="black" 
                                                                    level={2}
                                                                />
                                                            </li>
                                                        );
                                                    }
                                                    return null;
                                                }
                                            )
                                        }
                                    </ul>
                                </div>
                                <Stack spacing={3} direction='row' alignItems='flex-start'>
                                    <CustomizedTitle text='Prix:' size={18} level={0} color="black" />
                                    <CustomizedTitle text={`${tarif.toPay.afterProm} €`} size={22} level={0} color="#008000" />
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
                                <CustomizedTitle text='Répondre:' level={0} />
                                <a 
                                    href={`mailto:${tarif.reservateurWithEmail.email}?subject=${mailObject}
                                        &body=${mailBody}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <CustomizedButton text={`Ouvrir mail`} />
                                </a>
                            </Stack>
                        </CustomizedPaperOutside>
                    </Stack>
                )
            }     
        </>
    );
};
export default ReservationDetails;