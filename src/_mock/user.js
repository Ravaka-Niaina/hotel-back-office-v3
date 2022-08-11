import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  nom: faker.name.firstName(),
  prenom: faker.name.lastName(),
  email: faker.internet.email(),
  dateInscription: faker.date.past(),
  companie: faker.company.companyName(),
  droitAcces: "Super utilisateur",
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
