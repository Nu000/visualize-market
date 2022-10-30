import { getPorts } from '../mocks/getPorts';
import { getRates } from '../mocks/getRates';

describe('Market Rates dashboard', () => {
  beforeEach(() => {
    cy.server();
    cy.fixture('ports.json').then((rc) => {
      getPorts(rc);
    });
    cy.fixture('rates.json').then((rc) => {
      getRates(rc);
    });
    cy.visit('http://localhost:3000');
    cy.wait('@getPorts');
    cy.wait('@getRates');
  });
  it('shows origin', () => {
    cy.contains('Market Rates');
    cy.contains('Origin');
    cy.contains('Destination');
  });

  it('select ports', function() {
    cy.get('#origin-select').click();
    cy.get('#origin-select-option-1').click();
    cy.get('#dest-select').click();
    cy.get('#dest-select-option-3').click();
    cy.get('#chart').should('be.visible')
  });

  it('select market postions', function() {
    cy.get('#high-checkbox').check();
    cy.get('#chart').should('be.visible')
    cy.get('#mean-checkbox').check();
    cy.get('#chart').should('be.visible')
    cy.get('#low-checkbox').check();
    cy.get('#chart').should('be.visible')
  });

  it('Search origin', function() {
    cy.get('#origin-select').type('Shang');
    cy.get('#origin-select-option-0').click();
    cy.get('#chart').should('be.visible')
  });

  it('Search dest', function() {
    cy.get('#dest-select').type('Rott');
    cy.get('#dest-select-option-0').click();
    cy.get('#chart').should('be.visible')
  });
});
