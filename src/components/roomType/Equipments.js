import React from 'react';
import { Stack, Checkbox } from '@mui/material';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import styles from './Equipments.module.css';

import Ventilateur from '../../assets/images/equipments/ventilateur.svg';
import UstensilleCuisine from '../../assets/images/equipments/ustensille-cuisine.svg';
import Telephone from '../../assets/images/equipments/telephone.svg';
import TableManger from '../../assets/images/equipments/table-manger.svg';
import Streaming from '../../assets/images/equipments/streaming.svg';
import SolCarrele from '../../assets/images/equipments/sol-carrele.svg';
import Serviette from '../../assets/images/equipments/serviette.svg';
import ServiceReveil from '../../assets/images/equipments/service-reveil.svg';
import SecheLinge from '../../assets/images/equipments/seche-linge.svg';
import SecheCheveux from '../../assets/images/equipments/seche-cheuveux.svg';
import Sauna from '../../assets/images/equipments/sauna.svg';
import Satellite from '../../assets/images/equipments/satellite.svg';
import Reveil from '../../assets/images/equipments/reveil.svg';
import Refrigerateur from '../../assets/images/equipments/refrigerateur.svg';
import Radio from '../../assets/images/equipments/radio.svg';
import ProduitsMenagers from '../../assets/images/equipments/produits-menagers.svg';
import PrisePresLit from '../../assets/images/equipments/prise-pres-lit.svg';
import PressePantalon from '../../assets/images/equipments/presse-pantalon.svg';
import PortableCoffreFort from '../../assets/images/equipments/portable-coffre-fort.svg';
import Plaque from '../../assets/images/equipments/plaque.svg';
import PiscinePrivee from '../../assets/images/equipments/piscine-privee.svg';
import PiscineDebordement from '../../assets/images/equipments/piscine-debordement.svg';
import Parquet from '../../assets/images/equipments/parquet.svg';
import Ordinateur from '../../assets/images/equipments/ordinateur.svg';
import OrdinateurPortable from '../../assets/images/equipments/ordinateur-portable.svg';
import Moquette from '../../assets/images/equipments/moquette.svg';
import MobilierExt from '../../assets/images/equipments/mobilier-ext.svg';
import Minibar from '../../assets/images/equipments/minibar.svg';
import MicroOndes from '../../assets/images/equipments/micro-ondes.svg';
import LitPliant from '../../assets/images/equipments/lit-pliant.svg';
import LaveVaisselle from '../../assets/images/equipments/lave-vaisselle.svg';
import LaveLinge from '../../assets/images/equipments/lave-linge.svg';
import GrillePain from '../../assets/images/equipments/grille-pain.svg';
import Four from '../../assets/images/equipments/four.svg';
import EspaceRepasExt from '../../assets/images/equipments/espace-repas-ext.svg';
import Dressing from '../../assets/images/equipments/dressing.svg';
import CouvertureChauffante from '../../assets/images/equipments/couverture-chauffante.svg';
import Console from '../../assets/images/equipments/console.svg';
import CoinSalon from '../../assets/images/equipments/coin-salon.svg';
import CoinRepas from '../../assets/images/equipments/coin-repas.svg';
import Cheminee from '../../assets/images/equipments/cheminee.svg';
import Chauffage from '../../assets/images/equipments/chauffage.svg';
import ChambreCommuniquant from '../../assets/images/equipments/chambre-communiquant.svg';
import ChambreAntiAllergie from '../../assets/images/equipments/chambre-anti-allergie.svg';
import ChaiseHauteEnfant from '../../assets/images/equipments/chaise-haute-enfant.svg';
import ChainesCable from '../../assets/images/equipments/chaines-cable.svg';
import Casier from '../../assets/images/equipments/casier.svg';
import Canape from '../../assets/images/equipments/canape.svg';
import CanapeLit from '../../assets/images/equipments/canape-lit.svg';
import BouteilleEau from '../../assets/images/equipments/bouteille-eau.svg';
import Berceau from '../../assets/images/equipments/berceau.svg';
import Barbecue from '../../assets/images/equipments/barbecue.svg';
import ArticleToilette from '../../assets/images/equipments/article-toilette.svg';
import Armoire from '../../assets/images/equipments/armoire.svg';
import Adapteur from '../../assets/images/equipments/adapteur.svg';
import AccesExecutif from '../../assets/images/equipments/acces-executif.svg';

const Equipments = ({ equipments, setEquipments }) => {
  const getMatchedIcon = (tag) => {
    const matchings = {
      'accessible': <AccessibleIcon />,
      'connected_tv': <ConnectedTvIcon />,
      'wifi': <WifiIcon />,
      'local_parking': <LocalParkingIcon />,
    };
    return matchings[tag];
  };

  const getMatchedSvg = (tag) => {
    const matchingsSvg = {
      'ventilateur': Ventilateur,
      'ustensille-cuisine': UstensilleCuisine,
      'telephone': Telephone,
      'table-manger': TableManger,
      'streaming': Streaming,
      'sol-carrele': SolCarrele,
      'serviette': Serviette,
      'service-reveil': ServiceReveil,
      'seche-linge': SecheLinge,
      'seche-cheveux': SecheCheveux,
      'sauna': Sauna,
      'satellite': Satellite,
      'reveil': Reveil,
      'refrigerateur': Refrigerateur,
      'radio': Radio,
      'produits-menagers': ProduitsMenagers,
      'prise-pres-lit': PrisePresLit,
      'presse-pantalon': PressePantalon,
      'portable-coffre-fort': PortableCoffreFort,
      'plaque': Plaque,
      'piscine-privee': PiscinePrivee,
      'piscine-debordement': PiscineDebordement,
      'parquet': Parquet,
      'ordinateur': Ordinateur,
      'ordinateur-portable': OrdinateurPortable,
      'moquette': Moquette,
      'mobilier-ext': MobilierExt,
      'minibar': Minibar,
      'micro-ondes': MicroOndes,
      'lit-pliant': LitPliant,
      'lave-vaisselle': LaveVaisselle,
      'lave-linge': LaveLinge,
      'grille-pain': GrillePain,
      'four': Four,
      'espace-repas-ext': EspaceRepasExt,
      'dressing': Dressing,
      'couverture-chauffante': CouvertureChauffante,
      'console': Console,
      'coin-salon': CoinSalon,
      'coin-repas': CoinRepas,
      'cheminee': Cheminee,
      'chauffage': Chauffage,
      'chambre-communiquant': ChambreCommuniquant,
      'chambre-anti-allergie': ChambreAntiAllergie,
      'chaise-haute-enfant': ChaiseHauteEnfant,
      'chaines-cable': ChainesCable,
      'casier': Casier,
      'canape': Canape,
      'canape-lit': CanapeLit,
      'bouteille-eau': BouteilleEau,
      'berceau': Berceau,
      'barbecue': Barbecue,
      'article-toilette': ArticleToilette,
      'armoire': Armoire,
      'adapteur': Adapteur,
      'acces-executif': AccesExecutif,
    };

    return matchingsSvg[tag];
  };

  const switchCheckboxEquipment = (indexEquipment => {
    const equipmentsTemp = [ ...equipments ];
    equipmentsTemp[indexEquipment].checked = 
    !equipmentsTemp[indexEquipment].checked;
    setEquipments(equipmentsTemp);
  }) 

  return(
    <>
      <h4>Equipements</h4>
      <Stack>
        <table className={styles.equipments}>
          {
            equipments.map((equipment, i) => (
              <tr key={equipment._id}>
                <td><Checkbox checked={equipment.checked} onChange={() => switchCheckboxEquipment(i)} /></td>
                {
                  getMatchedIcon(equipment.tag)
                  ? <td>{ getMatchedIcon(equipment.tag) }</td>
                  : <td><img src={ getMatchedSvg(equipment.tag) } alt="equipment"/></td>
                }
                <td>{equipment.label}</td>
              </tr>
            ))
          }
        </table>
      </Stack>
    </>
  );
};

export default Equipments;