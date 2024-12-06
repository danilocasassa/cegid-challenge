const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
dotenv.config();

const envFile = `.env.${process.env.NODE_ENV || "prod"}`;
dotenv.config({ path: envFile });

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://www.demoblaze.com/",
        viewportWidth: 1280,
        viewportHeight: 720,
        env: {
            username: process.env.USER,
            password: process.env.PASS,
            apiDomain: "https://api.demoblaze.com/",
        },
        setupNodeEvents(on, config) {
            require("cypress-mochawesome-reporter/plugin")(on);
            on("task", {
                log(message) {
                    console.log(message);
                    return null;
                },
            });
            return config;
        },
        reporter: "cypress-mochawesome-reporter",
        reporterOptions: {
            reportDir: "cypress/reports",
            overwrite: true,
            html: true,
            json: true,
            charts: true,
            reportPageTitle: "E2E Results",
            embeddedScreenshots: true,
            inlineAssets: true,
        },
    },
});
