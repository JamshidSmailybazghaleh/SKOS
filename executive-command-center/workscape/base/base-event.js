/*
==========================================================
SKOS Framework
Base Event
Version : 1.0.0
BUILD : BUILD-000026
==========================================================
*/

class BaseEvent {

    constructor(name, payload = {}) {

        this.id = crypto.randomUUID();

        this.name = name;

        this.payload = payload;

        this.timestamp = new Date();

        this.source = null;

        this.target = null;

        this.propagationStopped = false;

    }

    setSource(source) {

        this.source = source;

    }

    setTarget(target) {

        this.target = target;

    }

    stopPropagation() {

        this.propagationStopped = true;

    }

    isPropagationStopped() {

        return this.propagationStopped;

    }

    serialize() {

        return {

            id: this.id,

            name: this.name,

            payload: this.payload,

            timestamp: this.timestamp,

            source: this.source,

            target: this.target

        };

    }

}

export default BaseEvent;
