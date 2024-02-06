import React, { useContext } from 'react';
import { describe, expect } from '@jest/globals';
import axios from 'axios';

import { ThemeContext } from '../../context/Wrapper';
import { getSidebarConfig } from '../SidebarConfig';

const superAdminUser = {
  "data": {
      "status": 200,
      "user": {
          "_id": "6285df63b3bf1a092735a8b1",
          "nom": "Adrware",
          "prenom": "Dev",
          "email": "adrhotel@yopmail.com",
          "mdp": "$2b$10$/.P0W4bClYUXDicU/hXfbOIEfYmLdYCo1.KEHFzS0PFDt2re.td2C",
          "dateInscription": "2022-01-14T14:45:31.454Z",
          "companie": "h1",
          "telephone": "0347428806",
          "numeroRandom": 40799,
          "isActive": true,
          "tentative": 3
      },
      "atribAR": [
          {
              "_id": "superAdmin",
              "nom": "Super administrateur"
          }
      ],
      "notAtribAR": [
          {
              "_id": "deleteTypeChambre",
              "nom": "Supprimer un type chambre"
          },
          {
              "_id": "getListTarif",
              "nom": "Voir liste tarif"
          },
          {
              "_id": "updatePlanTarifaire",
              "nom": "Modifier un plan tarifaire"
          },
          {
              "_id": "getHotel",
              "nom": "Voir details hotel"
          },
          {
              "_id": "deleteHotel",
              "nom": "Supprimer un hotel"
          },
          {
              "_id": "insertHotel",
              "nom": "Créer un hotel"
          },
          {
              "_id": "insertPromotion",
              "nom": "Creer promotion"
          },
          {
              "_id": "disocPartnerWithAR",
              "nom": "Enlever un droit d'accès d'un partenaire"
          },
          {
              "_id": "deletePlanTarifaire",
              "nom": "Supprimer un plan tarifaire"
          },
          {
              "_id": "getPartenaire",
              "nom": "Voir les informations d'un partenaire"
          },
          {
              "_id": "assocPartnerWithAR",
              "nom": "Donner un partenaire un droit d'accès"
          },
          {
              "_id": "updateHotel",
              "nom": "modifierHotel"
          },
          {
              "_id": "insertPlanTarifaire",
              "nom": "Créer un plan tarifaire"
          },
          {
              "_id": "getListTypeChambre",
              "nom": "Voir liste type chambre"
          },
          {
              "_id": "getListPromotion",
              "nom": "Voir liste promotion"
          },
          {
              "_id": "insertPartenaire",
              "nom": "Créer un partenaire"
          },
          {
              "_id": "getTypeChambre",
              "nom": "Voir informations type chambre"
          },
          {
              "_id": "getPromotion",
              "nom": "Voir details promotion"
          },
          {
              "_id": "getListPartenaire",
              "nom": "Voir liste partenaires"
          },
          {
              "_id": "getListDroitAcces",
              "nom": "Voir liste des droits d'accès"
          },
          {
              "_id": "updateTypeChambre",
              "nom": "Modifier type chambre"
          },
          {
              "_id": "updatePromotion",
              "nom": "Modifier un promotion"
          },
          {
              "_id": "getPlanTarifaire",
              "nom": "Voir les informations d'un plan tarifaire"
          },
          {
              "_id": "deletePartenaire",
              "nom": "Supprimer un partenaire"
          },
          {
              "_id": "getListHotel",
              "nom": "Voir liste type hotel"
          },
          {
              "_id": "getOneHotel",
              "nom": "Voir details hotel"
          },
          {
              "_id": "insertTypeChambre",
              "nom": "Créer un type chambre"
          },
          {
              "_id": "updatePartenaire",
              "nom": "Mettre à jour les informations d'un partenaire"
          },
          {
              "_id": "deletePromotion",
              "nom": "Supprimer un promotion"
          },
          {
              "_id": "modifierDisponibiliteTypeChambre",
              "nom": "modifier disponibilité des types chambres"
          },
          {
              "_id": "admin",
              "nom": "Administrateur"
          }
      ]
  }
};

const restrictedPartner = {
  "data": {
      "status": 200,
      "user": {
          "_id": "6285df63b3bf1a092735a8b1",
          "nom": "Adrware",
          "prenom": "Dev",
          "email": "adrhotel@yopmail.com",
          "mdp": "$2b$10$/.P0W4bClYUXDicU/hXfbOIEfYmLdYCo1.KEHFzS0PFDt2re.td2C",
          "dateInscription": "2022-01-14T14:45:31.454Z",
          "companie": "h1",
          "telephone": "0347428806",
          "numeroRandom": 40799,
          "isActive": true,
          "tentative": 3
      },
      "atribAR": [
        {
          "_id": "getListTarif",
          "nom": "Voir liste tarif"
        },
      ],
      "notAtribAR": [
          {
            "_id": "getListTypeChambre",
            "nom": "Voir liste type chambre"
          },
          {
              "_id": "deleteTypeChambre",
              "nom": "Supprimer un type chambre"
          },
          {
              "_id": "updatePlanTarifaire",
              "nom": "Modifier un plan tarifaire"
          },
          {
              "_id": "getHotel",
              "nom": "Voir details hotel"
          },
          {
              "_id": "deleteHotel",
              "nom": "Supprimer un hotel"
          },
          {
              "_id": "insertHotel",
              "nom": "Créer un hotel"
          },
          {
              "_id": "insertPromotion",
              "nom": "Creer promotion"
          },
          {
              "_id": "disocPartnerWithAR",
              "nom": "Enlever un droit d'accès d'un partenaire"
          },
          {
              "_id": "deletePlanTarifaire",
              "nom": "Supprimer un plan tarifaire"
          },
          {
              "_id": "getPartenaire",
              "nom": "Voir les informations d'un partenaire"
          },
          {
              "_id": "assocPartnerWithAR",
              "nom": "Donner un partenaire un droit d'accès"
          },
          {
              "_id": "updateHotel",
              "nom": "modifierHotel"
          },
          {
              "_id": "insertPlanTarifaire",
              "nom": "Créer un plan tarifaire"
          },
          {
              "_id": "getListPromotion",
              "nom": "Voir liste promotion"
          },
          {
              "_id": "insertPartenaire",
              "nom": "Créer un partenaire"
          },
          {
              "_id": "getTypeChambre",
              "nom": "Voir informations type chambre"
          },
          {
              "_id": "getPromotion",
              "nom": "Voir details promotion"
          },
          {
              "_id": "getListPartenaire",
              "nom": "Voir liste partenaires"
          },
          {
              "_id": "getListDroitAcces",
              "nom": "Voir liste des droits d'accès"
          },
          {
              "_id": "updateTypeChambre",
              "nom": "Modifier type chambre"
          },
          {
              "_id": "updatePromotion",
              "nom": "Modifier un promotion"
          },
          {
              "_id": "getPlanTarifaire",
              "nom": "Voir les informations d'un plan tarifaire"
          },
          {
              "_id": "deletePartenaire",
              "nom": "Supprimer un partenaire"
          },
          {
              "_id": "getListHotel",
              "nom": "Voir liste type hotel"
          },
          {
              "_id": "getOneHotel",
              "nom": "Voir details hotel"
          },
          {
              "_id": "insertTypeChambre",
              "nom": "Créer un type chambre"
          },
          {
              "_id": "updatePartenaire",
              "nom": "Mettre à jour les informations d'un partenaire"
          },
          {
              "_id": "deletePromotion",
              "nom": "Supprimer un promotion"
          },
          {
              "_id": "modifierDisponibiliteTypeChambre",
              "nom": "modifier disponibilité des types chambres"
          },
          {
              "_id": "admin",
              "nom": "Administrateur"
          }
      ]
  }
};

describe('test get sidebarConfig', () => {
  test ('test if getUserDetails is called', async () => {
    axios.post = jest.fn().mockResolvedValue(superAdminUser);
    const context = {};
    context.getUserDetails = jest.fn().mockImplementation(() => axios.post('/user/details'));
    
    await getSidebarConfig(context);

    // assert
    expect(context.getUserDetails).toBeCalled();
  });

  test('test if all sidebar elements are accessible to super admin', async () => {
    axios.post = jest.fn().mockResolvedValue(superAdminUser);
    const context = {};
    context.getUserDetails = jest.fn().mockImplementation(() => axios.post('/user/details'));
    
    const sidebarConfig = await getSidebarConfig(context);

    expect(sidebarConfig[0].userIsAllowed).toStrictEqual(['*']);
    for (let i = 1; i < sidebarConfig.length - 1; i+=1) {
      expect(sidebarConfig[i].userIsAllowed).toBe(true);
      if (sidebarConfig[i].children) {
        sidebarConfig[i].children.forEach(child => {
          expect(child.userIsAllowed).toBe(true);
        });
      }
    }
  });

  test('test if all sidebar elements are inaccessible except listTarif', async () => {
    axios.post = jest.fn().mockResolvedValue(restrictedPartner);
    const context = {};
    context.getUserDetails = jest.fn().mockImplementation(() => axios.post('/user/details'));
    
    const sidebarConfig = await getSidebarConfig(context);

    for (let i = 1; i < sidebarConfig.length - 1; i+=1) {
      if (sidebarConfig[i].title === 'plans tarifaires') {
        expect(sidebarConfig[i].userIsAllowed).toBe(true);
        if (sidebarConfig[i].children) {
          sidebarConfig[i].children.forEach(child => {
            if (child.title === 'tarifs') {
              expect(child.userIsAllowed).toBe(true);
            } else {
              expect(child.userIsAllowed).toBe(false);
            }
            
          });
        }
      } else if (sidebarConfig[i].title !== 'Hotels') {
        expect(sidebarConfig[i].userIsAllowed).toBe(false);
        if (sidebarConfig[i].children) {
          sidebarConfig[i].children.forEach(child => {
            expect(child.userIsAllowed).toBe(false);
          });
        }
      }
    }
  });
});