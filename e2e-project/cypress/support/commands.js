Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
    const delay = options?.delay || 100;
    return originalFn(element, text, { ...options, delay });
});

Cypress.Commands.add("logStep", (message) => {
    message = `     ${message}`;
    cy.task("log", message);
    cy.log(message);
});
