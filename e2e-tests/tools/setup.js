const args = process.argv.slice(2);
const fs = require("fs");

/**
 * Set the env file default
 * @param {string} environment environment to run the tests
 * @return {void}
 */
function setupEnv(environment = "prod") {
    const filePath = ".env";
    const content = `NODE_ENV="${environment}"`;

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            throw new Error("Error creating the .env file:", err);
        } else {
            console.log(".env file created!");
        }
    });
}

/**
 * Setup the env file for QA environment with QA data
 * @return {void}
 */
function setupEnvQA() {
    const filePath = ".env.qa";
    const content = 'USER="admin"\nPASS="admin"';

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            throw new Error("Error creating the .env.qa file:", err);
        } else {
            console.log(".env file created!");
        }
    });
}

/**
 * Setup the env file for PROD environment with PROD data
 * @return {void}
 */
function setupEnvProd() {
    const filePath = ".env.prod";
    const content = 'USER="admin"\nPASS="admin"';

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            throw new Error("Error creating the .env.qa file:", err);
        } else {
            console.log(".env file created!");
        }
    });
}

/**
 * Executor read the parameters and set the env file creator methods
 * @return {void}
 */
function executor() {
    if (args.includes("--qa")) {
        setupEnv("qa");
        setupEnvQA();
    }

    if (args.length == 0) {
        setupEnv();
        setupEnvProd();
    }
}

// call the executor
executor();
