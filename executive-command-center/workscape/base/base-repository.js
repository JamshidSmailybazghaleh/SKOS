/*
==========================================================
SKOS Framework
Base Repository
Version : 1.0.0
BUILD : BUILD-000025
==========================================================
*/

class BaseRepository {

    constructor(name = "Repository") {

        this.name = name;

        this.items = new Map();

    }

    add(item) {

        if (!item || !item.id) {

            throw new Error(

                "Repository item must have an id."

            );

        }

        this.items.set(item.id, item);

    }

    get(id) {

        return this.items.get(id) || null;

    }

    getAll() {

        return Array.from(

            this.items.values()

        );

    }

    has(id) {

        return this.items.has(id);

    }

    update(id, values = {}) {

        const item = this.get(id);

        if (!item) {

            return false;

        }

        Object.assign(item, values);

        return true;

    }

    remove(id) {

        return this.items.delete(id);

    }

    count() {

        return this.items.size;

    }

    clear() {

        this.items.clear();

    }

    find(predicate) {

        return this.getAll().filter(predicate);

    }

    first(predicate) {

        return this.getAll().find(predicate) || null;

    }

    serialize() {

        return this.getAll();

    }

    destroy() {

        this.clear();

    }

}

export default BaseRepository;
