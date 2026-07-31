/*
==========================================================
SKOS Framework
Base Registry
Version : 1.0.0
BUILD : BUILD-000028
==========================================================
*/

class BaseRegistry {

    constructor(name = "SKOS Registry") {

        this.name = name;

        this.items = new Map();

    }

    register(key, object) {

        if (!key) {

            throw new Error(

                "Registry key is required."

            );

        }

        this.items.set(key, object);

    }

    unregister(key) {

        this.items.delete(key);

    }

    has(key) {

        return this.items.has(key);

    }

    resolve(key) {

        return this.items.get(key) || null;

    }

    keys() {

        return Array.from(

            this.items.keys()

        );

    }

    values() {

        return Array.from(

            this.items.values()

        );

    }

    entries() {

        return Array.from(

            this.items.entries()

        );

    }

    count() {

        return this.items.size;

    }

    clear() {

        this.items.clear();

    }

    destroy() {

        this.clear();

    }

}

const registry =

    new BaseRegistry();

export default registry;
