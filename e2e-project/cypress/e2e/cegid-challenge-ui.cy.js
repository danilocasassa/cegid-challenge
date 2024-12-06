const { Authentication } = require("../support/authentication");
const { Cart } = require("../support/cart");
const { Pages } = require("../support/pages");

let auth;
let cart;
let pages;

describe("Cegid Challenge", () => {
    beforeEach(() => {
        auth = new Authentication();
        cart = new Cart();
        pages = new Pages();

        cy.logStep("Clearing the Cart before start");
        pages.visitHome();
        auth.login();
        cart.selectCartSection();
        cy.wait(2000);
        cart.clear();
    });

    it("Placing an Order", () => {
        cy.logStep("Add the first product to the cart");
        pages.selectHomeSection();
        pages.selectPhonesCategory();
        cy.fixture("data").then((data) => {
            pages.selectProduct(data.firstProduct);
        });
        pages.addProductOnCart();

        cy.logStep("Add the second product to the cart");
        pages.selectHomeSection();
        pages.selectMonitorsCategory();
        cy.fixture("data").then((data) => {
            pages.selectProduct(data.secondProduct);
        });
        pages.addProductOnCart();

        cy.logStep("Validate the cart");
        cart.selectCartSection();
        cart.getCartInfo();
        cy.wait(2000);

        cart.validateCart();

        cy.logStep("Finishing the order");
        cy.fixture("data").then((data) => {
            cart.placeOrder(data.order);
            cart.validatePurchase(data.order);
        });

        cy.logStep("Closing Purchase Modal");
        cart.closePurchaseModal();
    });
});
