class Account {
    constructor(accountHolderName, accountNumber) {
        this._accountHolderName = this.accountHolderName;
        this._accountNumber = accountNumber;
        this._balance = 0;
        this._maximumBalance = 100000;
        this._minimumBalance = 0;
    }

    get balance() {
        return this._balance
    }

    get accountNumber() {
        return this._accountNumber
    }

    get minimumBalance(){
        return this._maximumBalance
    }

    get maximumBalance(){
        return this._maximumBalance
    }

    addToBalance(amount) {
        this._balance = this._balance + amount;
        return true
    }

    subtractFromBalance(amount) {
        this._balance = this._balance - amount;
        return true
    }
}


class Deposit {
    constructor() {
        this._maxAmount = 50000;
        this._minAmount = 500;
        this._noOfDepositsPerDay = 3;
        this._depositHistory = {};
    }

    addAccountToDepositHistory(accountNumber){
        this._depositHistory[accountNumber] = [];
    }

    addCountToDepositHistory(accountNumber, dateString){
        this._depositHistory[accountNumber].push(
            dateString: 0
        )
    }

    incrementDepositCount(accountNumber, dateString){
        this._depositHistory[accountNumber].forEach(
            (deposit) => {
                if(deposit.dateString === dateString)
                {
                    deposit.dateString = deposit.dateString + 1;
                }
            }
        )
    }

    findDepositCountByDate(accountNumber, dateString){
        let res = this._depositHistory[accountNumber].filter(
            (deposit) => Ddposit.DepositDate === dateString
        )

        if (res.length === 0){
            this.addCountToDepositHistory(dateString)
            return 0
        }

        return res[0][dateString]
    }

    isBelowMaxAmount(depositAmount) {
        if(depositAmount<this._maxAmount)
        {
            return false
        }
        return true
    }

    isAboveMinAmount(depositAmount) {
        if(depositAmount>this._minAmount){
            return true
        }
        return false
    }


    isBelowDepositLimit(accountNumber) {
        let today = new Date().toLocaleDateString();
        let depositCount = this.findDepositCountByDate(accountNumber, today);
        if(depositCount<=this._noOfDepositsPerDay){
            return true
        }
        return false
    }

    isAboveMinimumBalance(accountObj, depositAmount) {
        let postBalance = accountObj.balance + depositAmount;
        if (accountObj.maximumBalance <= postBalance) {
            return true
        }
        return false
    }

    isDepositPossible(accountObj, depositAmount) {
        let accountNumber = accountObj.accountNumber;
        if(
            this.isBelowDepositLimit(accountNumber, depositAmount) ||
            !this.isAboveMinAmount(depositAmount) ||
            !this.isBelowMaxAmount(depositAmount) ||
            this.isAboveMinimumBalance(depositAmount)
        ){
            return false
        }
        return true
    }


    depositAmount(accountObj, depositAmount) {
        if(!this.isDepositPossible(accountObj, depositAmount)){
            return false
        }
        return accountObj.addToBalance(depositAmount);
    }
}