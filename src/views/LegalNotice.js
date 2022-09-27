import React from 'react';
import { Stack, Container, } from '@mui/material';
import Page from '../components/Page';
import CustomizedTitle from '../components/CustomizedComponents/CustomizedTitle';
import CustomizedPaperOutside from '../components/CustomizedComponents/CustomizedPaperOutside';
import { lightBackgroundToTop } from '../components/CustomizedComponents/NeumorphismTheme';

const LegalNotice = () => (
  <Page title="AIOLIA | Mentions légales">
  <Container>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <CustomizedTitle sx={{ color: '#787878' }} text="Mentions légales" />
    </Stack>
    <CustomizedPaperOutside sx={{ ...lightBackgroundToTop, background: '#E3EDF7', p: 5, minHeight:'100vh' }}>
      <Stack spacing={2}>
        <Stack sx={{alignItems: "center"}}>
          <h1 className="headerLegalNotice">Mentions légales</h1>
          <div>En vigueur au 01/10/2022</div>
        </Stack>
        
        <div>Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs, ci-après l'"<span className="boldAIOLIA">Utilisateur</span>", du site www.reservation.aioila.us/(hotel) , ci-après le "<span className="boldAIOLIA">Site</span>", les présentes mentions légales.</div>
        <div>La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.</div>
        <div>Ces dernières sont accessibles sur le Site à la rubrique « Mentions légales ».</div>
        <h2 className="h2LegalNotice">ARTICLE 1 - L'EDITEUR</h2>
        <div>L'édition du Site est assurée par AIOLIA SARL au capital de 20000 euros, immatriculée au Registre du Commerce et des Sociétés de Tananarive sous le numéro _______________ dont le siège social est situé au 101, 
          Numéro de téléphone _______________, 
          Adresse e-mail : direction@aiolia.us.
          N° de TVA intracommunautaire : _______________
          Le Directeur de la publication est Ritsy Andriamanantsoa
          ci-après l'"Editeur".</div>
        <h2 className="h2LegalNotice">ARTICLE 2 - L'HEBERGEUR</h2>
        <div>L'hébergeur du Site est la société OVH, dont le siège social est situé au France , avec le numéro de téléphone : _______________ + adresse mail de contact</div>
        <h2 className="h2LegalNotice">ARTICLE 3 - ACCES AU SITE</h2>
        <div>Le Site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découlant d’une nécessité de maintenance.</div>
        <div>En cas de modification, interruption ou suspension du Site, l'Editeur ne saurait être tenu responsable.</div>
        <h2 className="h2LegalNotice">ARTICLE 4 - COLLECTE DES DONNEES</h2>
        <div>Le Site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.</div>
        <div>
          <div>En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur exerce ce droit :</div>
          <ul className="listLegalNotice">
            <li>par mail à l'adresse email direction@aiolia.us</li>
            <li>via un formulaire de contact ;</li>
            <li>via son espace personnel ;</li>
          </ul>
        </div>
        <div>Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site, sans autorisation de l’Editeur est prohibée et pourra entraînée des actions et poursuites judiciaires telles que notamment prévues par le Code de la propriété intellectuelle et le Code civil.</div>
        <div>
          <div>Pour plus d’informations, se reporter aux CGU du site www.reservation.aioila.us/(hotel) accessible à la rubrique "CGU" </div>
          <div>Pour plus d’informations, se reporter aux CGV du site www.reservation.aioila.us/(hotel) accessible à la rubrique "CGV"</div>
          <div>Pour plus d'informations en matière de cookies, se reporter à la Charte en matière de cookies du site www.reservation.aioila.us/(hotel) accessible à la rubrique "Cookies"</div>
        </div>
      </Stack>
        </CustomizedPaperOutside>
      </Container>
    </Page>
  );

export default LegalNotice;