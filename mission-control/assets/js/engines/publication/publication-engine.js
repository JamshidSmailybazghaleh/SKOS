/*
====================================================
SKOS Mission Control

Publication Engine

File:
publication-engine.js

Engine:
OP-001

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const PublicationEngine = {

    id: "OP-001",

    name: "Publication Engine",

    version: "1.0",

    status: "IDLE",

    initialized: false,

    async initialize() {

        Logger.info(
            "Publication Engine Initializing..."
        );

        this.initialized = true;

        this.status = "READY";

        Logger.info(
            "Publication Engine Ready."
        );

    },

    async publish(assetId) {

        Logger.info(
            "Publishing Asset : " + assetId
        );

        /*
            Future Steps

            Validate Asset

            Generate Metadata

            Generate Package

            Export Formats

            Register Publication

            Distribute

        */

        return true;

    },

    async validate(assetId) {

        Logger.info(
            "Validate : " + assetId
        );

        return true;

    },

    async buildPackage(assetId) {

        Logger.info(
            "Building Package : " + assetId
        );

        return true;

    },

    async distribute(assetId) {

        Logger.info(
            "Distribution : " + assetId
        );

        return true;

    },

    async archive(assetId) {

        Logger.info(
            "Archive : " + assetId
        );

        return true;

    },

    getStatus() {

        return this.status;

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(PublicationEngine);
