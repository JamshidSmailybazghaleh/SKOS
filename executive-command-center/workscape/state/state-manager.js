/*
==========================================================
SKOS Executive Command Center
State Manager
Version : 1.0.0
BUILD : BUILD-000017
==========================================================
*/

class StateManager {

    constructor() {

        this.state = {};

        this.listeners = new Map();

    }



    initialize(initialState = {}) {

        this.state = {

            ...initialState

        };

    }



    get(key = null) {

        if (key === null) {

            return this.state;

        }

        return this.state[key];

    }



    set(key, value) {

        this.state[key] = value;

        this.notify(key);

    }



    update(object) {

        Object.assign(

            this.state,

            object

        );

        Object.keys(object)

        .forEach(

            key=>this.notify(key)

        );

    }



    remove(key) {

        delete this.state[key];

        this.notify(key);

    }



    clear() {

        this.state = {};

    }



    subscribe(key, callback) {

        if (

            !this.listeners.has(key)

        ) {

            this.listeners.set(

                key,

                []

            );

        }

        this.listeners

            .get(key)

            .push(callback);

    }



    unsubscribe(key, callback) {

        if (

            !this.listeners.has(key)

        ) {

            return;

        }

        const list =

            this.listeners.get(key)

            .filter(

                fn=>fn!==callback

            );

        this.listeners.set(

            key,

            list

        );

    }



    notify(key) {

        if (

            !this.listeners.has(key)

        ) {

            return;

        }

        this.listeners

            .get(key)

            .forEach(

                callback=>{

                    callback(

                        this.state[key]

                    );

                }

            );

    }



    destroy() {

        this.clear();

        this.listeners.clear();

    }

}

const stateManager =

    new StateManager();

export default stateManager;
