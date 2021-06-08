const Account = require("./Account");
const Withdraw = require("./Withdraw");
const Deposit = require("./Deposit");

class Transaction {
    constructor() {
        this._accounts = [];
        this._currentAccountNumber = 1000;
        this._withdrawObj = new Withdraw();
        this._depositObj = new Deposit();
    }

    createAccount(name) {
        let account = new Account(name, this._currentAccountNumber);
        this._accounts.push(account);
        console.log("Account created : " + this._currentAccountNumber);
        this._currentAccountNumber++;
        return true
    }

    findAccountObj(accountNumber) {
        let res = this._accounts.filter(
            (account) => account.accountNumber === accountNumber
        );

        if (res.length === 0) {
            console.log("Account " + accountNumber + " not found !");
            return false;
        }

        return res[0];
    }

    depositAmount(accountNumber, amount) {
        console.log("Depositing " + amount + " to account " + accountNumber);
        let accountObj = this.findAccountObj(accountNumber);
        if (!accountObj) {
            return false;
        }

        let result = this._depositObj.depositAmount(accountObj, amount);
        if (!result) {
            return false;
        }

        return true;
    }

    withdrawAmount(accountNumber, amount) {
        console.log("Withdrawing " + amount + " from account " + accountNumber);
        let accountObj = this.findAccountObj(accountNumber);
        if (!accountObj) {
            return false;
        }

        let result = this._withdrawObj.withdrawAmount(accountObj, amount);
        if (!result) {
            return false;
        }

        return true;
    }

    transferAmount(accountNumber1, accountNumber2, amount) {
        console.log(
            "Transferring " +
                amount +
                " from " +
                accountNumber1 +
                " To " +
                accountNumber2
        );
        let accountObj1 = this.findAccountObj(accountNumber1);
        if (!accountObj1) {
            return false;
        }

        let accountObj2 = this.findAccountObj(accountNumber2);
        if (!accountObj2) {
            return false;
        }

        let res1 = this._withdrawObj.isWithdrawPossible(accountObj1, amount);
        if (!res1) {
            return false;
        }

        let res2 = this._depositObj.isDepositPossible(accountObj2, amount);
        if (!res2) {
            return false;
        }

        let result1 = this._withdrawObj.withdrawAmount(accountObj1, amount);
        let result2 = this._depositObj.depositAmount(accountObj2, amount);
        return true;
    }
}

module.exports = Transaction;
