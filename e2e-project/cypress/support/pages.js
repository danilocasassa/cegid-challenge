const { Common } = require("./common");

class Pages {
    constructor() {
        this.common = new Common();
    }

    /**
     * Visit the home page and wait the elements be visible
     * @return {void}
     */
    visitHome() {
        cy.visit("/");
        this.common.waitLoad();
    }

    /**
     * Select the nav option desired
     * @param {String} optionName nav bar option
     * @return {void}
     */
    selectNavOption(optionName) {
        cy.get("a.nav-link")
            .contains(optionName)
            .should("be.visible")
            .should("have.attr", "href")
            .then((href) => {
                cy.get(`a[href="${href}"]`).contains(optionName).should("be.visible").click();
                cy.url().should("include", href);
            });
    }

    // Select Home section from nav option
    selectHomeSection = () => this.selectNavOption("Home");

    // Select Cart section from nav option
    selectCartSection = () => this.selectNavOption("Cart");

    selectCategory(categoryName) {
        cy.get("a.list-group-item").contains(categoryName).should("be.visible").click();

        this.common.waitLoad();
        cy.wait(2000);
    }

    /**
     * Select the Phones section from categories picker
     * @return {void}
     */
    selectPhonesCategory = () => this.selectCategory("Phones");

    selectMonitorsCategory = () => this.selectCategory("Monitors");

    /**
     * Select the desired product and check if was selected correctly
     * @param {Object} productRef Product reference to be selected
     * @return {void}
     */
    selectProduct(productRef) {
        cy.get("a.hrefch")
            .contains(productRef.name)
            .should("be.visible")
            .should("have.attr", "href")
            .then((href) => {
                const urlParams = new URLSearchParams(href.split("?")[1] || "");
                const id = urlParams.get("idp_");

                cy.request({
                    method: "POST",
                    url: `${this.common.apiDomain}view`,
                    body: {
                        id,
                    },
                }).then((response) => {
                    const productDetails = response.body;

                    cy.get(`a[href="${href}"]`).find("img.card-img-top.img-fluid").should("be.visible").click();

                    cy.url().should("include", href);
                    cy.get("h2.name").should("contain.text", productRef.name);
                    cy.get("h3.price-container").should("contain.text", productDetails.price.toString());
                });
            });
    }

    /**
     * Add the product on the Cart
     * @return {void}
     */
    addProductOnCart() {
        cy.get("a.btn.btn-success.btn-lg").contains("Add to cart").click();
        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Product added.");
        });
    }
}

module.exports.Pages = Pages;
