/**
 * SKOS Intake Engine
 *
 * ENG-INTAKE-001
 * BUILD-000001
 */

class IntakeEngine {

    constructor() {

        this.name = "Intake Engine";
        this.version = "1.0.0";

        this.status = "CREATED";

        this.queue = [];

    }


    initialize() {

        this.status = "INITIALIZED";

        return {
            status: this.status
        };

    }


    execute(object = {}) {


        const receivedObject = {

            id: object.id,

            title: object.title,

            receivedAt: new Date()

        };


        this.queue.push(
            receivedObject
        );


        return {

            status: "RECEIVED",

            object: receivedObject

        };

    }


    getQueue() {

        return this.queue;

    }


    getStatus() {

        return {

            name: this.name,

            version: this.version,

            status: this.status,

            queue: this.queue.length

        };

    }

}


module.exports = IntakeEngine;
