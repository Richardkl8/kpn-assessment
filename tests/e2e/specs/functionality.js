describe('Functionality tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Filters', () => {
    it('should return 3 phones when filtered on Apple, white and has 5g', () => {
      cy.setFilters('Apple', 'WIT', true);
      cy.get('[data-cy="phone-card"]').should('have.length', 3);
    });

    it('should return 10 phones when filtered on Samsung, black and has no 5g', () => {
      cy.setFilters('Samsung', 'ZWART', false);
      cy.get('[data-cy="phone-card"]').should('have.length', 10);
    });

    it('should start the list with the iphone 13 when sorted on most sold', () => {
      cy.get('#MOST_SOLD').click();
      cy.get('[data-cy="phone-card"]:first').contains('h3', 'iPhone 13');
    });

    it('should start the list with the Xiaomi 12 5G when sorted on date', () => {
      cy.get('#DATE').click();
      cy.get('[data-cy="phone-card"]:first').contains('h3', 'Samsung Galaxy A53 5G');
    });

    it('should start the list with the Samsung Galaxy A52s 5G Dual-SIM when sorted on promotion', () => {
      cy.get('#PROMOTION').click();
      cy.get('[data-cy="phone-card"]:first').contains('h3', 'Samsung Galaxy A52s 5G Dual-SIM');
    });
  });
});
