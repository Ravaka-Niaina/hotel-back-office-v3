
import React from 'react';
import axios from 'axios';
import { describe, expect, test } from '@jest/globals';
import { screen , render } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import {BrowserRouter as Router, useNavigate, } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import RoomTypeForm from '../RoomTypeForm';
import config from '../../../config/api';
import Wrapper from "../../context/Wrapper";

const mockResultsOfAPIs = () => {
    axios.post = jest.fn().mockImplementation((url) => {
        if (url === `${config.host}/planTarifaire`) {
          return Promise.resolve({
            data: {
              "list": [
                  {
                      "_id": "629611d73e88b46249d2a1e5",
                      "nom": "Petit déjeuner - flexible",
                      "isActif": true
                  },
                  {
                      "_id": "629610223e88b46249d2a1e0",
                      "nom": "Petit déjeuner - Non remboursable",
                      "isActif": true
                  }
              ],
              "nbResult": 2,
              "nbContentPerPage": 1000,
              "nbPage": 1,
              "status": 200
            }
          });
        } 
        
        if (url.startsWith(`${config.host}/typeChambre/detailsChambre`)) {
          return Promise.resolve({ data: {
            "status": 204,
            "message": "Ce type de chambre n'existe pas",
            "typeChambre": null
          } }); 
        }
        
        if (url === `${config.host}/equipement/`) {
          return Promise.resolve({ data: {
            "data": [
                {
                    "_id": "61fc3b90706cc805d14aaac1",
                    "tag": "connected_tv",
                    "label": "connected tv",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "61fc4b72706cc805d14aaac3",
                    "tag": "accessible",
                    "label": "accessible",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "61fc49dd706cc805d14aaac2",
                    "tag": "local_parking",
                    "label": "local parking",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6193e0e510749a3eb138c894",
                    "label": "wifi",
                    "tag": "wifi",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979ad",
                    "tag": "ventilateur",
                    "label": "ventilateur",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979ae",
                    "tag": "ustensille-cuisine",
                    "label": "ustensille cuisine",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979af",
                    "tag": "telephone",
                    "label": "telephone",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979b0",
                    "tag": "table-manger",
                    "label": "table à manger",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979b1",
                    "tag": "streaming",
                    "label": "streaming",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979b2",
                    "tag": "sol-carrele",
                    "label": "sol carrelé",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979b3",
                    "tag": "serviette",
                    "label": "serviette",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979b4",
                    "tag": "service-reveil",
                    "label": "service réveil",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979b5",
                    "tag": "seche-linge",
                    "label": "sèche linge",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979b6",
                    "tag": "seche-cheveux",
                    "label": "sèche cheveux",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979b7",
                    "tag": "sauna",
                    "label": "sauna",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979b8",
                    "tag": "satellite",
                    "label": "satellite",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979b9",
                    "tag": "reveil",
                    "label": "réveil",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979ba",
                    "tag": "refrigerateur",
                    "label": "réfrigérateur",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979bb",
                    "tag": "radio",
                    "label": "radio",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979bc",
                    "tag": "produits-menagers",
                    "label": "produits ménagers",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979bd",
                    "tag": "prise-pres-lit",
                    "label": "prise près lit",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979be",
                    "tag": "presse-pantalon",
                    "label": "presse-pantalon",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979bf",
                    "tag": "portable-coffre-fort",
                    "label": "portable coffre fort",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979c0",
                    "tag": "plaque",
                    "label": "plaque",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979c1",
                    "tag": "piscine-privee",
                    "label": "piscine privée",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979c2",
                    "tag": "piscine-debordement",
                    "label": "piscine débordement",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979c3",
                    "tag": "parquet",
                    "label": "parquet",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979c4",
                    "tag": "ordinateur",
                    "label": "ordinateur",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979c5",
                    "tag": "ordinateur-portable",
                    "label": "ordinateur portable",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979c6",
                    "tag": "moquette",
                    "label": "moquette",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979c7",
                    "tag": "mobilier-ext",
                    "label": "mobilier ext",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979c8",
                    "tag": "minibar",
                    "label": "minibar",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979c9",
                    "tag": "micro-ondes",
                    "label": "micro-ondes",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979ca",
                    "tag": "lit-pliant",
                    "label": "lit pliant",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979cb",
                    "tag": "lave-vaisselle",
                    "label": "lave vaisselle",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979cc",
                    "tag": "lave-linge",
                    "label": "lave-linge",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979cd",
                    "tag": "grille-pain",
                    "label": "grille-pain",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979ce",
                    "tag": "four",
                    "label": "four",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979cf",
                    "tag": "espace-repas-ext",
                    "label": "éspace repas ext",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979d0",
                    "tag": "dressing",
                    "label": "dressing",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979d1",
                    "tag": "couverture-chauffante",
                    "label": "couverture chauffante",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979d2",
                    "tag": "console",
                    "label": "console",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979d3",
                    "tag": "coin-salon",
                    "label": "coin salon",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979d4",
                    "tag": "coin-repas",
                    "label": "coin repas",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979d5",
                    "tag": "cheminee",
                    "label": "cheminéé",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979d6",
                    "tag": "chauffage",
                    "label": "chauffage",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979d7",
                    "tag": "chambre-communiquant",
                    "label": "chambre communiquant",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979d8",
                    "tag": "chambre-anti-allergie",
                    "label": "chambre anti-allergie",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979d9",
                    "tag": "chaise-haute-enfant",
                    "label": "chaise haute enfant",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979da",
                    "tag": "chaines-cable",
                    "label": "chaines cable",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979db",
                    "tag": "casier",
                    "label": "casier",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979dc",
                    "tag": "canape",
                    "label": "canapé",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979dd",
                    "tag": "canape-lit",
                    "label": "canapé-lit",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979de",
                    "tag": "bouteille-eau",
                    "label": "bouteille d'eau",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979df",
                    "tag": "berceau",
                    "label": "berceau",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979e0",
                    "tag": "barbecue",
                    "label": "barbecue",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979e1",
                    "tag": "article-toilette",
                    "label": "article toilette",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979e2",
                    "tag": "armoire",
                    "label": "armoire",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979e3",
                    "tag": "adapteur",
                    "label": "adapteur",
                    "etat": 1,
                    "checked": false
                },
                {
                    "_id": "6350f0026cc5aefb366979e4",
                    "tag": "acces-executif",
                    "label": "accès executif",
                    "etat": 1,
                    "checked": false
                }
            ]
        } });
        }

        if (url === `${config.host}/typeChambre/insert`) {
            return Promise.resolve({ 
                data: {
                    "status": 400,
                    "errors": {
                        "nom": "Nom vide",
                        "name": "Nom vide",
                        "etage": "Etage n'est pas un nombre positif",
                        "chambreTotal": "Chambre total n'est pas un nombre positif",
                        "nbAdulte": "Nombre d'adulte n'est pas un nombre valide",
                        "nbEnfant": "Nombre d'enfant n'est pas un nombre valide",
                        "superficie": "La superficie n'est pas un nombre positif",
                        "photo": "Veuillez choisir au moins une photo",
                        "description": "Description vide",
                        "desc": "Description vide"
                    }
                } 
            });
        }
    });
};

describe('insert room type', () => {
  test('expect onSubmit function to be called at button submit click', async () => {
    // mock axios.post and onSubmit function
    const onSubmit = jest.fn().mockImplementation((injectedFunction) => {
      injectedFunction();
    });

    mockResultsOfAPIs();

    // render component
    act(() => {
        render(<Wrapper><Router><RoomTypeForm onSubmit={onSubmit} open /></Router></Wrapper>);
    });

    // click validate button
    const addButton = await screen.findByTestId('btnValidate');
    await userEvent.click(addButton);

    // expect onSubmit function to be called
    expect(onSubmit).toBeCalled();
  });

  test('all inputs should display errors if empty when validating', async () => {
    mockResultsOfAPIs();

    // render component
    act(() => {
        render(<Wrapper><Router><RoomTypeForm open /></Router></Wrapper>);
    });

    // click validate button
    const addButton = await screen.findByTestId('btnValidate');
    await userEvent.click(addButton);
      
    // expect errors to appear
    const errorsName = await screen.findAllByText('Nom vide');
    expect(errorsName.length).toBe(2);
    await screen.findByText('Chambre total n\'est pas un nombre positif');
    await screen.findByText('La superficie n\'est pas un nombre positif');
    await screen.findByText('Etage n\'est pas un nombre positif');
    await screen.findByText('Nombre d\'adulte n\'est pas un nombre valide');
    await screen.findByText('Nombre d\'enfant n\'est pas un nombre valide');
    const errorsDescription = await screen.findAllByText('Description vide');
    expect(errorsDescription.length).toBe(2);
  });

  test('inputs with valuse 0 should throw errors', () => {
    
  });
});