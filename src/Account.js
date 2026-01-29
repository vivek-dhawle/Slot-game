class Account{
    #balance
    constructor(){
        this.#balance=10000
    }


    increaseBalance(val){
        this.#balance+=val
    }
    decreaseBalnce(val){
        if(this.#balance-val<0)return 'low Balance'
        this.#balance-=val
    }

    getBalance(){
        return this.#balance
    }
}

export default Account 