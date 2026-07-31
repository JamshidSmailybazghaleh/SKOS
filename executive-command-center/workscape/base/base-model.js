/*
==========================================================
SKOS Framework
Base Model
Version : 1.0.0
BUILD : BUILD-000023
==========================================================
*/

class BaseModel {

    constructor(data = {}) {

        this.id = data.id || null;

        this.uuid = data.uuid || null;

        this.name = data.name || "";

        this.description = data.description || "";

        this.version = data.version || "1.0.0";

        this.status = data.status || "draft";

        this.createdAt =
            data.createdAt || new Date();

        this.updatedAt =
            data.updatedAt || new Date();

        this.metadata =
            data.metadata || {};

    }

    getId() {

        return this.id;

    }

    setId(id) {

        this.id = id;

    }

    getName() {

        return this.name;

    }

    setName(name) {

        this.name = name;

    }

    getStatus() {

        return this.status;

    }

    setStatus(status) {

        this.status = status;

    }

    touch() {

        this.updatedAt =
            new Date();

    }

    serialize() {

        return {

            id: this.id,

            uuid: this.uuid,

            name: this.name,

            description: this.description,

            version: this.version,

            status: this.status,

            createdAt: this.createdAt,

            updatedAt: this.updatedAt,

            metadata: this.metadata

        };

    }

    load(data) {

        Object.assign(this, data);

        this.touch();

    }

    clone() {

        return new BaseModel(

            this.serialize()

        );

    }

}

export default BaseModel;
