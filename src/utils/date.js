export function getFrenchDate (stringDate) {
  const dateElements = stringDate.split(' ');
  const months = {
      January: 'Janvier',
      February: 'Février',
      March: 'Mars',
      April: 'Avril',
      May: 'Mai',
      June: 'Juin',
      July: 'Juillet',
      August: 'Août',
      September: 'Septembre',
      October: 'Octobre',
      November: 'Novembre',
      December: 'Décembre'
  };
  
  const finalDateElements = [
      dateElements[0],
      months[dateElements[1]],
      dateElements[2]
  ];

  return finalDateElements;
};