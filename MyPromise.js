const STATE = {
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
    PENDING: 'pending'
}

class MyPromise {
    #thenCbs = [];
    #state = STATE.PENDING;
    #value
    #onSuccessBind = this.#onSuccess.bind(this);
    #onFailBind = this.#onFail.bind(this);
    constructor(cb) {
        try {
           // cb(this.#onSuccess, this.#onFail) //we can see that onSuccess and onFail functions are used as callbacks so this keyword is lost(notice that both functions also have this keyword inside of them)
            cb(this.#onSuccessBind, this.#onFailBind) 
        } catch(e) {
            this.onFail(e);
        }
        
    }

    #runCallbacks() {
        if(this.#state === STATE.FULFILLED) {
            this.#thenCbs.forEach(callback => {
                callback(this.#value)
            })
            this.#thenCbs = []
        }

        if(this.#state === STATE.REJECTED) {
            this.#catchCbs.forEach(callback => {
                callback(this.#value)
            })
            this.#catchCbs = []
        }
    }

    #onSuccess(value) {
        if(this.#state !== STATE.PENDING) return;
        this.#value = value;
        this.#state = STATE.FULFILLED;
        this.#runCallbacks();
    }

    #onFail(value) {
        if(this.#state !== STATE.PENDING) return;
        this.#value = value;
        this.#state = STATE.REJECTED;
    }

    then(thenCb, catchCb) {
        if(thenCb != null) this.#thenCbs.push(thenCb);
        if(catchCb != null) this.#catchCbs.push(catchCb);

        this.#runCallbacks();
        //needs to return a new Promise
    }

    catch(cb) {
        this.then(undefined, cb);
    }

    finally(cb) {

    }
}

module.exports = MyPromise;

// const p = new Promise(cb);


// let promise = newPromise((resolve, reject) => { // a Promise takes a callback

// })

// promise.then(() => {

// }).catch(() => {

// })

//FINALLY IN PROMISE
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally

//The finally() method can be useful if you want to do some processing or cleanup once the promise is settled, regardless of its outcome.


// we know that then method itself in a promise gets two callbacks where the first callback would be for success and the scond one would be for failure

// then(() => {}, () => {})

//CALL FUNCTION AND BIND************************

//BIND: https://www.w3schools.com/js/js_function_call.asp
//1--A common mistake for new JavaScript programmers is to extract a method from an object, then to later call that function and expect it to use the original object as its this (e.g., by using the method in callback-based code).
// 2--When a function is used as a callback, this is lost.

// const person = {
//     firstName:"John",
//     lastName: "Doe",
//     display: function () {
//       let x = document.getElementById("demo");
//       x.innerHTML = this.firstName + " " + this.lastName;
//     }
//   }
  
//   setTimeout(person.display, 3000);

//BIND::IMPORTANT **************************************
// this.x = 9;    // 'this' refers to global 'window' object here in a browser
// const module = {
//   x: 81,
//   getX: function() { return this.x; }
// };

// module.getX();
// //  returns 81

// const retrieveX = module.getX;
// retrieveX();
// //  returns 9; the function gets invoked at the global scope

// //  Create a new function with 'this' bound to module
// //  New programmers might confuse the
// //  global variable 'x' with module's property 'x'
// const boundGetX = retrieveX.bind(module);
// boundGetX();
// //  returns 81