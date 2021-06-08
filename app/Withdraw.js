class Withdraw {
    constructor() {
        this._maxAmount = 25000;
        this._minAmount = 1000;
        this._noOfWithdrawsPerDay = 3;
        this._withdrawHistory = {};
    }

    addAccountToWithdrawHistory(accountNumber) {
        this._withdrawHistory[accountNumber] = {};
    }

    addCountToWithdrawHistory(accountNumber, dateString) {
        this._withdrawHistory[accountNumber][dateString] = 0;
    }

    incrementWithdrawCount(accountNumber, dateString) {
        this._withdrawHistory[accountNumber][dateString]++;
    }

    findWithdrawCountByDate(accountNumber, dateString) {
        if (this._withdrawHistory[accountNumber] === undefined) {
            this.addAccountToWithdrawHistory(accountNumber);
        }
        let res = this._withdrawHistory[accountNumber][dateString];

        if (res === undefined) {
            this.addCountToWithdrawHistory(accountNumber, dateString);
            return 0;
        }
        return res;
    }

    isAboveMaxAmount(withdrawAmount) {
        if (withdrawAmount > this._maxAmount) {
            console.log(
                "WITHDRAW FAILED: Withdraw amount cannot be greater than : " +
                    this._maxAmount
            );
            return true;
        }
        return false;
    }

    isBelowMinAmount(withdrawAmount) {
        if (withdrawAmount < this._minAmount) {
            console.log(
                "WITHDRAW FAILED: Withdraw amount cannot be lesser than : " +
                    this._minAmount
            );
            return true;
        }
        return false;
    }

    isNotBelowWithdrawLimit(accountNumber) {
        let today = new Date().toLocaleDateString();
        let withdrawCount = this.findWithdrawCountByDate(accountNumber, today);
        if (withdrawCount < this._noOfWithdrawsPerDay) {
            return false;
        }
        console.log(
            "WITHDRAW FAILED: Only " +
                this._noOfWithdrawsPerDay +
                " withdrawls Allowed in a day for account Number" +
                accountNumber
        );

        return true;
    }

    isNotAboveMinimumBalance(accountObj, withdrawAmount) {
        let postBalance = accountObj.balance - withdrawAmount;
        if (accountObj.minimumBalance <= postBalance) {
            return false;
        }
        console.log(
            "WITHDRAW FAILED: Insufficient balance in account no: " +
                accountObj.accountNumber
        );
        return true;
    }

    isWithdrawPossible(accountObj, withdrawAmount) {
        let accountNumber = accountObj.accountNumber;
        if (
            this.isNotBelowWithdrawLimit(accountNumber) ||
            this.isAboveMaxAmount(withdrawAmount) ||
            this.isBelowMinAmount(withdrawAmount) ||
            this.isNotAboveMinimumBalance(accountObj, withdrawAmount)
        ) {
            return false;
        }
        return true;
    }

    withdrawAmount(accountObj, withdrawAmount) {
        if (!this.isWithdrawPossible(accountObj, withdrawAmount)) {
            return false;
        }
        let postBalance = accountObj.balance - withdrawAmount;
        accountObj.balance = postBalance;
        let today = new Date().toLocaleDateString();
        this.incrementWithdrawCount(accountObj.accountNumber, today);
        console.log(
            "TRANSACTION (Withdraw) SUCCESSFUL: Current Balance for account " +
                accountObj.accountNumber +
                ": " +
                postBalance
        );
        return true;
    }
}

module.exports = Withdraw;
