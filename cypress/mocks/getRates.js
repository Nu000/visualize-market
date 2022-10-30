export const getRates = (response) => {
  const endpoint = 'https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/rates?origin=CNSGH&destination=NLRTM';
  cy.route({
    method: 'GET',
    url: endpoint,
    response,
  }).as('getRates');
};
