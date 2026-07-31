/*
==========================================================
SKOS Framework
Base Factory
Version : 1.0.0
BUILD : BUILD-000029
==========================================================
*/

class BaseFactory {

    constructor() {

        this.registry = new Map();

    }

    register(type, constructor) {

        if (!type || !constructor) {

            throw new Error(

                "Factory registration failed."

            );

        }

        this.registry.set(

            type,

            constructor

        );

    }

    unregister(type) {

        this.registry.delete(type);

    }

    has(type) {

        return this.registry.has(type);

    }

    create(type, ...args) {

        if (!this.registry.has(type)) {

            throw new Error(

                "Unknown factory type : " + type

            );

        }

        const Constructor =

            this.registry.get(type);

        return new Constructor(...args);

    }

    registeredTypes() {

        return Array.from(

            this.registry.keys()

        );

    }

    clear() {

        this.registry.clear();

    }

    destroy() {

        this.clear();

    }

}

const factory =

new BaseFactory();

export default factory;
