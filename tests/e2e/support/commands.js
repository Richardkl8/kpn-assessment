Cypress.Commands.add('setFilters', (manufacturer, phoneColor, has5g) => {
  cy.get(`#${manufacturer}`).click();
  cy.get(`#${phoneColor}`).click();
  cy.get(`#${has5g}`).click();
});
