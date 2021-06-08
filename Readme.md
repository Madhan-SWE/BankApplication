BANK APPLICATION
================
The below basic operations are implemented in the bank application.

* Create Account
* Withdraw Amount
* Deposit Amount
* Transfer Amount between Accounts

Conditions
----------
Below are the basic conditions of the application

* Balance cannot exceed 100000
* Minimum balance 0
* Minimum Deposit 500
* Maximum Deposit 50000
* Minimum withdrawl 1000
* Maximum withdrawl 25000
* Only 3 deposits allowed in a day(per account)
* Only 3 withdrawls allowed in day(per account)
* Account number should be valid
* Account should have sufficient balance

Setup
-----
To set up the application run the below command to install necessary packages
```
npm install
```

Run 
--------------
To run the test cases
```
npm test
````

Usage
-----
To use the application as part of other application, create object for transaction class and use it as below.

```
const Transaction = require("./app/Transaction");
const transactionObj = new Transaction();

// Created Account
transactionObj.createAccount("Test Account 1")

// Withdraw Money
transactionObj.withdrawAmount(1000, 1000)

// Deposit Amount
transactionObj.depositAmount(1000, 5000)

// Transfer Amount
transactionObj.transferAmount(1001, 1002, 2000)


```