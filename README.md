# CEGID CHALLENGE

It is an answer to the CEGID CHALLENGE


## SUMMARY

The challenge was divided in 4 different parts:

1: [QA](#qa)

2: [UI Tests](#ui-tests)

3: [API Tests](#api-tests)

4: [Development](#development)

## QA

Goal: Writing Test Cases

Challenge:
1. Analyse the website https://www.cegid.com/ib/pt/casos-de-sucesso/
2. Explore the website understanding its capabilities and features.
3. Identify most important test scenarios to be covered.
4. Write at least 3 test cases, positive or negative, that you consider top priority.

Create a text or markdown file for each test scenario.


The scenarios is on [this file](./test_cases.txt)

## UI Tests

For this challenge, I created the scenarios using the language **Javascript** and the framework **Cypress**.

### Get Started

Navigate to the `e2e-tests` project and install the dependencies: 
```bash
cd .\e2e-tests\
npm install
```
You have to run the setup script to create the environment file parameters
Run the script to create the setup for **QA** or **PROD** environment

QA Environment:
```bash
cd .\e2e-tests\
npm run setup:qa
```

### Running the Test case

Scenario:

1. Access the website https://www.demoblaze.com/
2. Login using the username 'admin' e password 'admin’.
3. Add the 'Iphone 6 32Gb’ phone to the shopping cart.
4. Add the 'ASUS Full HD’ monitor to the shopping cart
5. Place the order

You can run the test above using 2 option, headed or headless mode.

Running `npm run test` you will run the test in headless mode, only the results will be shown into console log.

Running `npm run test:headed`, the browser will be open and you will be able to see the script execution in action

After the run is completed, you will be able to see the results of the test on the terminal console. 

![image](https://github.com/user-attachments/assets/2a5bb7e2-7723-49f5-aac6-7e6da59bae46)

But, the script will generate a report with the result of the test on [report folder](./e2e-tests/cypress/reports/) in html format.

The report will be created like this image:

![image](https://github.com/user-attachments/assets/2d17e8dc-dce8-42c8-bfe4-bec14dce5a84)

## API Tests

I created the tests for this part of the challenge using **Python** as the language and **PYTEST** as the framework.

### Get Started

First of all, please make sure that you have Python installed on your machine. If not, you can download the latest version of Python here https://www.python.org/downloads/windows/

Navigate to the `api-tests` project folder and install the requirements: 
```bash
cd .\api-tests\
pip install -r requirements.txt
```

For this test, you have to create your `API_TOKEN`, access this URL, https://gorest.co.in/consumer/login, and log in with your preferred account type.

Save the token generated into `.env` file in the `api-tests` folder:

```
API_TOKEN="YOUR GENERATED TOKEN HERE"
```

### Running the Test Case

Scenario:

1. Create a new user
2. Get the newly created user to check that it was created successfully
3. Delete the user

To run the test, run the command `pytest`

The test will be executed and you can see the results in the console terminal. 

![image](https://github.com/user-attachments/assets/9ffc4e0a-451f-4b10-a929-140f44d0158e)

To run the tests and generate a report html file, you have to run the command
`pytest --html=report.html`

After the run is completed, a reporter file html will be created into the root folder `api-tests/report.html`

The report will be created like this image:

![image](https://github.com/user-attachments/assets/4e8cf0c0-75e6-4722-b4e7-5e2985a53792)

## Development

For this part of the challenge, I created a script in **Javascript** language using **NodeJs**

### The challenge

Create a method, in the language of your choice, to detect if a string is palindrome - reads the same backward or forward.

Example of palindrome words: kayak, deified, rotator

Input: String to validate

Output: True if the input String is palindrome, False otherwise

### Running the code

In the terminal console, go to the root of the project and select the command below:

```
node isPalindrome "WORD"
```

You can check if any word is a Palindrome or if any phrase is a palindrome as well.

```
node .\isPalindrome.js "Socorram-me, subi no ônibus em Marrocos."
```

To get the response of this execution is TRUE or FALSE, you must add the code `echo $?`.
```bash
node .\isPalindrome.js "Socorram-me, subi no ônibus em Marrocos."
echo $?
```

The result of this execution will be like:

```bash
Debugger attached.
"Socorram-me, subi no ônibus em Marrocos."  is a palindrome
Waiting for the debugger to disconnect...
True
```

![image](https://github.com/user-attachments/assets/125f5d50-ca2a-45d3-9958-0b89e05e1401)

## Author

- [@danilocasassa](https://www.github.com/danilocasassa)

