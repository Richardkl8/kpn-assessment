describe('Responsiveness tests', () => {
  context('Mobile resolution', () => {
    beforeEach(() => {
      cy.viewport(390, 844); // Iphone 12 resolution
      cy.visit('/');
    });

    it('should display the show filters button by default', () => {
      cy.get('[data-cy="show-filters-button"]').should('be.visible');
      cy.get('[data-cy="show"]').should('not.be.visible');
    });
  });

  context('Laptop resolution', () => {
    beforeEach(() => {
      cy.viewport(1440, 900); // Macbook 15 resolution
    });

    it('should display the filters', () => {
      cy.get('[data-cy="filters"]').should('be.visible');
      cy.get('[data-cy="show-filters-button"]').should('not.be.visible');
    });
  });
});
