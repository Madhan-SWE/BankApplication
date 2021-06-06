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


class Withdraw {
    constructor() {
        this._maxAmount = 50000;
        this._minAmount = 500;
        this._noOfWithdrawsPerDay = 3;
        this._withdrawHistory = {};
    }

    addAccountToWithdrawHistory(accountNumber){
        this._withdrawHistory[accountNumber] = [];
    }

    addCountToWithdrawHistory(accountNumber, dateString){
        this._withdrawHistory[accountNumber].push(
            dateString: 0
        )
    }

    incrementWithdrawCount(accountNumber, dateString){
        this._withdrawHistory[accountNumber].forEach(
            (withdraw) => {
                if(withdraw.dateString === dateString)
                {
                    withdraw.dateString = withdraw.dateString + 1;
                }
            }
        )
    }

    findWithdrawCountByDate(accountNumber, dateString){
        let res = this._withdrawHistory[accountNumber].filter(
            (withdraw) => withdraw.withdrawDate === dateString
        )

        if (res.length === 0){
            this.addCountToWithdrawHistory(dateString)
            return 0
        }

        return res[0][dateString]
    }

    isBelowMaxAmount(withdrawAmount) {
        if(withdrawAmount<this._maxAmount)
        {
            return false
        }
        return true
    }

    isAboveMinAmount(withdrawAmount) {
        if(withdrawAmount>this._minAmount){
            return true
        }
        return false
    }


    isBelowWithdrawLimit(accountNumber) {
        let today = new Date().toLocaleDateString();
        let withdrawCount = this.findWithdrawCountByDate(accountNumber, today);
        if(withdrawCount<=this._noOfWithdrawsPerDay){
            return true
        }
        return false
    }

    isAboveMinimumBalance(accountObj, withdrawAmount) {
        let postBalance = accountObj.balance - withdrawAmount;
        if (accountObj.minimumBalance >= postBalance) {
            return true
        }
        return false
    }

    isWithdrawPossible(accountObj, withdrawAmount) {
        let accountNumber = accountObj.accountNumber;
        if(
            this.isBelowWithdrawLimit(accountNumber=) ||
            !this.isAboveMinAmount(withdrawAmount) ||
            !this.isBelowMaxAmount(withdrawAmount) ||
            this.isAboveMinimumBalance(withdrawAmount)
        ){
            return false
        }
        return true
    }


    withdrawAmount(accountObj, withdrawAmount) {
        if(!this.isWithdrawPossible(accountObj, withdrawAmount)){
            return false
        }
        return accountObj.subtractFromBalance(withdrawAmount)

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
            this.isBelowDepositLimit(accountNumber) ||
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



class Transaction{

    constructor() {
        this._accounts = [];
        this._currentAccountNumber = 1000;\
        this._withdrawObj = new Withdraw();
        this._depositObj = newD eposit();
    }

    createAccount(name){
        let account = new Account(name, this._currentAccountNumber)
        this._accounts.push(account);
    }

    findAccountObj(accountNumber){
        let res = this._accounts.filter(
            (account) => account.accountNumber === accountNumber
        )

        if(res.length === 0)
        {
            return false
        }

        return res[0]
    }

    depositAmount(accountNumber, amount){
        let accountObj = this.findAccountObj(accountNumber)
        if(!accountObj)
        {
            return false
        }

        let result = this._depositObj.depositAmount(accountObj, amount)
        if(!result){
            return false
        }

        return true
    }

    withdrawAmount(accountNumber, amount){
        let accountObj = this.findAccountObj(accountNumber)
        if(!accountObj)
        {
            return false
        }

        let result = this._withdrawObj.withdrawAmount(accountObj, amount)
        if(!result){
            return false
        }

        return true
    }


    transferAmount(accountNumber1, accountNumber2, amount){
        let accountObj1 = this.findAccountObj(accountNumber1)
        if(!accountObj1)
        {
            return false
        }

        let accountObj2 = this.findAccountObj(accountNumber2)
        if(!accountObj2)
        {
            return false
        }

        let res1 = this._withdrawObj.isWithdrawPossible(accountObj1)
        if(!res1)
        {
            return false
        }

        let res2 = this._depositObj.isDepositPossible(accountObj2)
        if(!res2){
            return false
        }
        
        result1 = this._withdrawObj.withdrawAmount(accountObj1, amount);
        result2 = this._depositObj.depositAmount(accountObj2, amount);
        return true
    }
}