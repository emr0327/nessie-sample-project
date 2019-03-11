# Nessie Sample Project
A simple dashboard showing a developer their customer's accounts. It also allows users to create new accounts and delete existing accounts, find the nearest ATM and view all branch locations. This app demonstrates basic usage of APIs in a NodeJS application. There is a seeded "database" of <a href="https://gist.github.com/erichurst/7882666">geo-data</a> which has a list of zipcodes and their corresponding latitude and longitude. Makes use of the Nessie API for all other data.

# Requirements
* node v10+
* npm v5.6+
* Nessie API Key

# Installation
1. Clone the Project
```
git clone https://github.com/emr0327/nessie-sample-project.git
```
2. Navigate to the root of the project and create a file `.env`.
3. Open the file you just created (`.env`) and add your Nessie API key and the Nessie API URL as variables.
```
API_KEY='my_api_key'
API_URL='http://api.reimaginebanking.com'
```
> Note: Make sure to keep the variable names consistent with how they are written in `config.js`
```
module.exports = {
  BASE_URL: process.env.API_URL,
  API_KEY_PARAM: process.env.API_KEY
};
```

Retrieve your API key by creating an account at http://api.reimaginebanking.com.
4. Install required packages.
```
npm install
```

# Running the Application
Navigate to the root of the project and run:
```
npm start
```

Navigate to `localhost:3000` to view the dashboard.