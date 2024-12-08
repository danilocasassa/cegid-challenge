const { Pages } = require("./pages");

class Cart extends Pages {
    constructor() {
        super();
        this.method = "POST";
        this.cartEndpoint = "viewcart";
        this.itemsendpoint = "view";
    }

    /**
     * Get the cart info from viewcart request intercepted
     * @return {void}
     */
    getCartInfo() {
        this.common.getResponse(this.method, this.cartEndpoint);
    }

    /**
     * Wait Items be loaded into cart
     * @return {void}
     */
    waitItemsLoad() {
        this.common.waitLoad(this.method, this.itemsendpoint);
    }

    /**
     * Clear the cart if not empty
     * @return {void}
     */
    clear() {
        cy.get("#tbodyid").then((tbody) => {
            if (tbody.find("tr").length > 0) {
                cy.get("a")
                    .contains("Delete")
                    .then((elements) => {
                        cy.wrap(elements.first()).should("be.visible").click();
                        cy.wait(3000);
                        this.clear();
                    });
            } else {
                cy.log("Cart is empty.");
            }
        });
    }

    /**
     * Get the Details of the items from endpoint request
     * @param {object} items Array of object with the items data (required the field prod_id)
     * @return {Object} itemsDetails object with the detailed info from each item
     */
    getItemsDetails(items) {
        const itemsDetails = [];

        items.forEach((item) => {
            cy.request({
                method: "POST",
                url: `${this.common.apiDomain}view`,
                body: { id: item.prod_id },
            }).then((response) => {
                cy.log("Fetched item details: ", JSON.stringify(response.body));
                itemsDetails.push(response.body);
            });
        });

        return cy.wrap(itemsDetails);
    }

    /**
     * Validate the cart table with the elements inserted
     * @return {void}
     */
    validateCart() {
        cy.get("table.table").then((table) => {
            let titleIndex, priceIndex;

            const headerRow = table.find("thead tr");
            headerRow.children("th").each((index, col) => {
                const colName = Cypress.$(col).text().trim();
                if (colName === "Title") titleIndex = index;
                if (colName === "Price") priceIndex = index;
            });

            if (titleIndex === undefined || priceIndex === undefined) {
                throw new Error("Could not find Title or Price columns");
            }

            const rows = table.find("tbody tr");
            expect(rows.length).to.equal(2);

            const cartItems = Cypress.env(`response_${this.cartEndpoint}`);
            this.getItemsDetails(cartItems.Items).then((itemsDetails) => {
                let total = 0;

                rows.each((index, row) => {
                    const $row = Cypress.$(row);
                    const title = $row
                        .find(`td:nth-child(${titleIndex + 1})`)
                        .text()
                        .trim();
                    const price = $row
                        .find(`td:nth-child(${priceIndex + 1})`)
                        .text()
                        .trim();

                    const cartItem = itemsDetails.find((item) => item.title === title);

                    if (!cartItem) {
                        throw new Error(`Item not found in API response: ${title}`);
                    }

                    expect(title).to.equal(cartItem.title);
                    expect(price).to.include(cartItem.price.toString());

                    total += parseInt(cartItem.price);
                });

                cy.get("#totalp")
                    .should("be.visible")
                    .invoke("text")
                    .then((text) => {
                        expect(parseFloat(text)).to.equal(total);
                    });
            });
        });
    }

    /**
     * Do the order using the data for order parameter
     * @param {Object} data object with the payment details
     */
    placeOrder(data) {
        const cartItems = Cypress.env(`response_${this.cartEndpoint}`);
        this.getItemsDetails(cartItems.Items).then((itemsDetails) => {
            const total = itemsDetails.reduce((acc, item) => acc + parseInt(item.price), 0);
            cy.get('button[data-target="#orderModal"]').should("be.visible").click();
            cy.wait(500);
            cy.get("#totalm")
                .should("be.visible")
                .invoke("text")
                .then((text) => {
                    expect(parseInt(text.split(":")[1].trim())).to.equal(total);
                });

            cy.get("#name").type(data.name);
            cy.get("#country").type(data.country);
            cy.get("#city").type(data.city);
            cy.get("#card").type(data.card);
            cy.get("#month").type(data.month);
            cy.get("#year").type(data.year);
            cy.get("button.btn.btn-primary").contains("Purchase").click();
        });
    }

    /**
     * Validate the Confirmation screen
     * @param {Object} data object with payment data
     * @return {void}
     */
    validatePurchase(data) {
        cy.get("h2").contains("Thank you for your purchase!");

        cy.get("p.lead.text-muted")
            .should("be.visible")
            .invoke("html")
            .then((html) => {
                const fields = html.split("<br>");
                cy.log("FIELDS:", fields);

                const dataHtml = {
                    id: fields[0].replace("Id: ", "").trim(),
                    amount: fields[1].replace("Amount: ", "").trim(),
                    cardNumber: fields[2].replace("Card Number: ", "").trim(),
                    name: fields[3].replace("Name: ", "").trim(),
                    date: fields[4].replace("Date: ", "").trim(),
                };

                const cartItems = Cypress.env(`response_${this.cartEndpoint}`);
                this.getItemsDetails(cartItems.Items).then((itemsDetails) => {
                    const total = itemsDetails.reduce((acc, item) => acc + parseInt(item.price), 0);
                    const value = dataHtml.amount.split(" ");
                    expect(value[0]).to.eql(total.toString());
                    expect(value[1]).to.eql("USD");
                });

                expect(parseInt(dataHtml.id)).to.be.a("number");
                expect(dataHtml.cardNumber).to.eql(data.card);
                expect(dataHtml.name).to.eql(data.name);

                const currentDate = new Date();

                let previousMonth = currentDate.getMonth();
                let year = currentDate.getFullYear();

                if (previousMonth === 0) {
                    previousMonth = 12;
                    year -= 1;
                }
                const formattedDate = `${currentDate.getDate()}/${previousMonth}/${year}`;
                expect(dataHtml.date).to.equal(formattedDate);
            });
    }

    /**
     * Close the modal of purchase confirmation and wait the home page load
     * @return {void}
     */
    closePurchaseModal() {
        cy.get("button.confirm.btn.btn-lg.btn-primary").contains("OK").should("be.visible").click();
        this.common.waitLoad();
    }
}

module.exports.Cart = Cart;
