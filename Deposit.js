class Deposit {
    constructor() {
        this._maxAmount = 50000;
        this._minAmount = 500;
        this._noOfDepositsPerDay = 3;
        this._depositHistory = {};
    }

    addAccountToDepositHistory(accountNumber) {
        this._depositHistory[accountNumber] = {};
    }

    addCountToDepositHistory(accountNumber, dateString) {
        this._depositHistory[accountNumber][dateString] = 0;
    }

    incrementDepositCount(accountNumber, dateString) {
        this._depositHistory[accountNumber][dateString]++;
    }

    findDepositCountByDate(accountNumber, dateString) {
        if (this._depositHistory[accountNumber] === undefined) {
            this.addAccountToDepositHistory(accountNumber);
        }
        let res = this._depositHistory[accountNumber][dateString];

        if (res === undefined) {
            this.addCountToDepositHistory(accountNumber, dateString);
            return 0;
        }
        return res;
    }

    isAboveMaxAmount(depositAmount) {
        if (depositAmount > this._maxAmount) {
            console.log(
                "DEPOSIT FAILED: Deposit amount cannot be greater than : " +
                    this._maxAmount
            );
            return true;
        }
        return false;
    }

    isBelowMinAmount(depositAmount) {
        if (depositAmount < this._minAmount) {
            console.log(
                "DEPOSIT FAILED: Deposit amount cannot be lesser than : " +
                    this._minAmount
            );
            return true;
        }
        return false;
    }

    isNotBelowDepositLimit(accountNumber) {
        let today = new Date().toLocaleDateString();
        let depositCount = this.findDepositCountByDate(accountNumber, today);
        if (depositCount < this._noOfDepositsPerDay) {
            return false;
        }
        console.log(
            "DEPOSIT FAILED: Only " +
                this._noOfDepositsPerDay +
                " deposits Allowed in a day for account " +
                accountNumber
        );
        return true;
    }

    isNotBelowMaximumBalance(accountObj, depositAmount) {
        let postBalance = accountObj.balance + depositAmount;
        if (accountObj.maximumBalance >= postBalance) {
            return false;
        }
        console.log(
            "DEPOSIT FAILED: Account Balance cannot exceed more than " +
                accountObj.maximumBalance +
                " for the account " +
                accountObj.accountNumber
        );
        return true;
    }

    isDepositPossible(accountObj, depositAmount) {
        let accountNumber = accountObj.accountNumber;
        if (
            this.isNotBelowDepositLimit(accountNumber) ||
            this.isBelowMinAmount(depositAmount) ||
            this.isAboveMaxAmount(depositAmount) ||
            this.isNotBelowMaximumBalance(accountObj, depositAmount)
        ) {
            return false;
        }
        return true;
    }

    depositAmount(accountObj, depositAmount) {
        if (!this.isDepositPossible(accountObj, depositAmount)) {
            return false;
        }
        let postBalance = accountObj.balance + depositAmount;
        accountObj.balance = postBalance;
        let today = new Date().toLocaleDateString();
        this.incrementDepositCount(accountObj.accountNumber, today);

        console.log(
            "TRANSACTION (Deposit) SUCCESSFUL: Current Balance for account " +
                accountObj.accountNumber +
                ": " +
                postBalance
        );

        return true;
    }
}

module.exports = Deposit;
