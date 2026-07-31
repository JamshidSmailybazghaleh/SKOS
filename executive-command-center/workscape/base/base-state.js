/*
==========================================================
SKOS Framework
Base State
Version : 1.0.0
BUILD : BUILD-000024
==========================================================
*/

class BaseState {

    constructor(initialState = {}) {

        this.state = { ...initialState };

        this.listeners = new Map();

    }

    get(key = null) {

        if (key === null) {

            return this.state;

        }

        return this.state[key];

    }

    set(key, value) {

        this.state[key] = value;

        this.notify(key, value);

    }

    update(values = {}) {

        Object.keys(values).forEach(key => {

            this.state[key] = values[key];

            this.notify(key, values[key]);

        });

    }

    has(key) {

        return Object.prototype.hasOwnProperty.call(

            this.state,

            key

        );

    }

    remove(key) {

        delete this.state[key];

        this.notify(key, undefined);

    }

    clear() {

        this.state = {};

    }

    subscribe(key, callback) {

        if (!this.listeners.has(key)) {

            this.listeners.set(key, []);

        }

        this.listeners.get(key).push(callback);

    }

    unsubscribe(key, callback) {

        if (!this.listeners.has(key)) {

            return;

        }

        const list = this.listeners
            .get(key)
            .filter(fn => fn !== callback);

        this.listeners.set(key, list);

    }

    notify(key, value) {

        if (!this.listeners.has(key)) {

            return;

        }

        this.listeners
            .get(key)
            .forEach(callback => callback(value));

    }

    serialize() {

        return { ...this.state };

    }

    destroy() {

        this.clear();

        this.listeners.clear();

    }

}

export default BaseState;
