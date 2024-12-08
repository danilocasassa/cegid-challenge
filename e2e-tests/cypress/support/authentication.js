class Authentication {
    constructor() {
        this.username = Cypress.env("username");
        this.password = Cypress.env("password");
    }

    /**
     * Realize the login in the app
     * @param {string} username
     * @param {string} password
     * @returns {void}
     */
    login(username = this.username, password = this.password) {
        cy.get("#login2").should("be.visible").click();
        cy.wait(500);
        cy.get("#logInModalLabel").should("be.visible");
        cy.get("#loginusername").type(username);
        cy.get("#loginpassword").type(password);
        cy.get("button.btn.btn-primary").contains("Log in").click();
        cy.get("#nameofuser").should("have.text", `Welcome ${this.username}`);
    }
}

module.exports.Authentication = Authentication;
