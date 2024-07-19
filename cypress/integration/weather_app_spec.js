describe('Weather App', () => {
    it('fetches and displays weather data', () => {
      cy.visit('/');
      cy.get('input[placeholder="Enter city name"]').type('London');
      cy.get('button').contains('Search').click();
      cy.contains('London', { timeout: 10000 }).should('be.visible');
      cy.contains('Temperature:').should('be.visible');
      cy.contains('Humidity:').should('be.visible');
      cy.contains('Description:').should('be.visible');
    });
  });