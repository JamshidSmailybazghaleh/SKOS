/*
==========================================================
SKOS Executive Command Center
Base Engine Connector
Version : 1.0.0
BUILD : BUILD-000019
==========================================================
*/

class BaseEngineConnector {

    constructor() {

        this.engine = null;

        this.connected = false;

        this.engineName = "Unknown";

    }



    async connect(engine) {

        this.engine = engine;

        this.connected = true;

        console.info(

            "[" + this.engineName + "] Connected"

        );

    }



    disconnect() {

        this.engine = null;

        this.connected = false;

    }



    isConnected() {

        return this.connected;

    }



    async initialize() {

        console.warn(

            "[" + this.engineName +

            "] initialize() must be overridden."

        );

    }



    async execute(payload) {

        if (!this.connected) {

            throw new Error(

                this.engineName +

                " not connected."

            );

        }

        return await this.engine.execute(

            payload

        );

    }



    async synchronize() {

        if (

            this.connected &&

            this.engine.sync

        ) {

            return await this.engine.sync();

        }

    }



    async refresh() {

        if (

            this.connected &&

            this.engine.refresh

        ) {

            return await this.engine.refresh();

        }

    }



    async shutdown() {

        if (

            this.connected &&

            this.engine.shutdown

        ) {

            await this.engine.shutdown();

        }

        this.disconnect();

    }

}

export default BaseEngineConnector;
