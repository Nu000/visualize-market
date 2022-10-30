export const getPorts = (response) => {
  const endpoint = 'https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/ports';
  cy.route({
    method: 'GET',
    url: endpoint,
    response,
  }).as('getPorts');
};
