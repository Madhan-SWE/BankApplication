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
        return this._minimumBalance
    }

    get maximumBalance(){
        return this._maximumBalance
    }

    set balance(amount){
        this._balance = amount
    }
    
}

module.exports = Account;










