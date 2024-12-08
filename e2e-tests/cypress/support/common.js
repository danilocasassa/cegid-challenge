class Common {
    constructor() {
        this.apiDomain = Cypress.env("apiDomain");
    }

    /**
     * Save in a env file the endpoint response
     * @param {string} method CRUD HTTP methods
     * @param {string} endpoint endpoint path to be saved
     * @return {void}
     */
    getResponse(method = "GET", endpoint = "entries") {
        cy.intercept(method, `${this.apiDomain}/${endpoint}`).as(endpoint);
        cy.wait(`@${endpoint}`).should((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            Cypress.env(`response_${endpoint}`, interception.response.body);
            return interception.response.body;
        });
    }

    /**
     * Intercept the request and wait the status code be 200
     * @param {string} method CRUD HTTP methods
     * @param {string} endpoint endpoint path to wait for done
     */
    waitLoad(method = "GET", endpoint = "entries") {
        cy.intercept(method, `${this.apiDomain}/${endpoint}`).as(endpoint);
        cy.wait(`@${endpoint}`).should((interception) => {
            if (interception) {
                expect(interception.response.statusCode).to.eq(200);
            } else {
                cy.log(`The request for the endpoint ${endpoint} did not occur.`);
            }
        });
    }
}

module.exports.Common = Common;
