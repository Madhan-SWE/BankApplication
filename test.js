const assert = require("assert");

const Transaction = require("./Transaction");
const transactionObj = new Transaction();
// console.log(transactionObj.createAccount("Madhan"));
// console.log(transactionObj.createAccount("Madhan2"));
// console.log(transactionObj.depositAmount(1000, 100001));
// console.log(transactionObj.depositAmount(1000, 5000));
// console.log(transactionObj.depositAmount(1000, 499));
// console.log(transactionObj.depositAmount(1000, 50001));
// console.log(transactionObj.depositAmount(1000, 50000));
// console.log(transactionObj.depositAmount(1000, 500));
// console.log(transactionObj.depositAmount(1000, 500));
// // console.log(transactionObj.depositAmount(1002, 500));

// console.log(transactionObj.withdrawAmount(1000, 10));
// console.log(transactionObj.withdrawAmount(1000, 25000));
// console.log(transactionObj.withdrawAmount(1000, 25001));
// console.log(transactionObj.withdrawAmount(1000, 25000));
// console.log(transactionObj.withdrawAmount(1000, 25000));
// console.log(transactionObj.withdrawAmount(1000, 1000));
// // console.log(transactionObj.withdrawAmount(1000, 1000));

// // console.log(transactionObj.transferAmount(1000, 1001, 2001));
// // console.log(transactionObj.withdrawAmount(1000, 25000));
// // console.log(transactionObj.withdrawAmount(1000, 25000));
// // console.log(transactionObj.withdrawAmount(1000, 1000));
// // console.log(transactionObj.withdrawAmount(1000, 1000));
// // console.log(transactionObj.withdrawAmount(1000, 1000));

describe("Madatory Tests", () => {
    before(() => {
        console.log("Setup section");
    });

    after(() => {
        console.log("Cleanup section");
    });

    describe("Sanity Tests", () => {
        beforeEach(() => {
            console.log("BASIC TEST:");
        });

        it("Create account", () => {
            assert.equal(transactionObj.createAccount("Test Account 1"), true);
        });

        it("Deposit Amount", () => {
            assert.equal(transactionObj.depositAmount(1000, 5000), true);
        });

        it("Withdraw Amount", () => {
            assert.equal(transactionObj.withdrawAmount(1000, 1000), true);
        });

        it("Transfer Amount", () => {
            assert.equal(transactionObj.createAccount("Test Account 2"), true);
            assert.equal(transactionObj.createAccount("Test Account 3"), true);
            assert.equal(transactionObj.depositAmount(1001, 5000), true);
            assert.equal(transactionObj.transferAmount(1001, 1002, 2000), true);
        });
    });

    describe("Negative Tests", () => {
        beforeEach(() => {
            console.log("NEGATIVE TEST:");
        });

        it("Deposit Cannot be less than 500", () => {
            assert.equal(transactionObj.createAccount("Test Account 4"), true);
            assert.equal(transactionObj.depositAmount(1003, 499), false);
        });

        it("Deposit Cannot be more than 50000", () => {
            assert.equal(transactionObj.depositAmount(1003, 50001), false);
        });

        it("Withdraw Cannot be less than 1000", () => {
            assert.equal(transactionObj.withdrawAmount(1003, 999), false);
        });

        it("Withdraw Cannot be more than 25000", () => {
            assert.equal(transactionObj.withdrawAmount(1003, 25001), false);
        });

        it("Only 3 deposits allowed in a day", () => {
            assert.equal(transactionObj.createAccount("Test Account 5"), true);
            assert.equal(transactionObj.depositAmount(1004, 20000), true);
            assert.equal(transactionObj.depositAmount(1004, 20000), true);
            assert.equal(transactionObj.depositAmount(1004, 20000), true);
            assert.equal(transactionObj.depositAmount(1004, 20000), false);
        });

        it("Only 3 withdrawls allowed in a day", () => {
            assert.equal(transactionObj.withdrawAmount(1004, 20000), true);
            assert.equal(transactionObj.withdrawAmount(1004, 20000), true);
            assert.equal(transactionObj.withdrawAmount(1004, 20000), true);
            assert.equal(transactionObj.withdrawAmount(1004, 20000), false);
        });

        it("Deposit to invalid account Number", () => {
            assert.equal(transactionObj.depositAmount(1005, 20000), false);
        });

        it("Withdraw from invalid account Number", () => {
            assert.equal(transactionObj.depositAmount(1005, 20000), false);
        });

        it("transfer from invalid account Number", () => {
            assert.equal(
                transactionObj.transferAmount(1005, 1004, 2000),
                false
            );
        });

        it("transfer to invalid account Number", () => {
            assert.equal(
                transactionObj.transferAmount(1004, 1005, 2000),
                false
            );
        });

        it("Account Balance cannot be more than 100000", () => {
            assert.equal(transactionObj.createAccount("Test Account 6"), true);
            assert.equal(transactionObj.depositAmount(1005, 50000), true);
            assert.equal(transactionObj.depositAmount(1005, 50000), true);
            assert.equal(transactionObj.depositAmount(1005, 50000), false);
        });

        it("Account Balance cannot be less than 0", () => {
            assert.equal(transactionObj.createAccount("Test Account 7"), true);
            assert.equal(transactionObj.depositAmount(1006, 2000), true);
            assert.equal(transactionObj.withdrawAmount(1006, 20000), false);
        });
    });

    describe("Corner Tests", () => {
        beforeEach(() => {
            console.log("CORNER TEST:");
        });

        it("Deposit 500", () => {
            assert.equal(transactionObj.createAccount("Test Account 8"), true);
            assert.equal(transactionObj.depositAmount(1007, 500), true);
        });

        it("Deposit 50000", () => {
            assert.equal(transactionObj.depositAmount(1007, 50000), true);
        });

        it("Withdraw 1000", () => {
            assert.equal(transactionObj.withdrawAmount(1007, 1000), true);
        });

        it("Withdraw 25000", () => {
            assert.equal(transactionObj.withdrawAmount(1007, 25000), true);
        });

        it("Account Balance 100000", () => {
            assert.equal(transactionObj.createAccount("Test Account 9"), true);
            assert.equal(transactionObj.depositAmount(1008, 50000), true);
            assert.equal(transactionObj.depositAmount(1008, 50000), true);
        });

        it("Account Balance 0 by withdraw", () => {
            assert.equal(transactionObj.createAccount("Test Account 10"), true);
            assert.equal(transactionObj.depositAmount(1009, 2000), true);
            assert.equal(transactionObj.withdrawAmount(1009, 2000), true);
        });
    });
});
