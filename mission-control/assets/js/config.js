/*
====================================================
SKOS Mission Control
Configuration File

File:
config.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const CONFIG = {

    system: {

        name: "SKOS Mission Control",

        version: "Alpha 0.2",

        status: "ACTIVE"

    },



    repository: {

        name: "SKOS",

        owner: "JamshidSmailybazghaleh"

    },



    paths: {

        modules: "modules/",

        data: "data/",

        assets: "assets/",

        scripts: "assets/js/"

    },



    files: {

        registry: "registry.json",

        status: "STATUS.json",

        executiveSummary: "executive-summary.json"

    },



    dashboard: {

        containerId: "executive-summary-container"

    },



    development: {

        debug: true,

        logLevel: "INFO"

    }

};



Object.freeze(CONFIG);
