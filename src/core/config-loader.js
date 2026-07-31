/**
 * SKOS Configuration Loader
 *
 * Project:
 * Smaily Knowledge Operating System
 *
 * File ID:
 * CORE-002
 *
 * Version:
 * 1.0.0
 *
 * Build:
 * BUILD-000001
 */


const fs = require("fs");
const path = require("path");


class ConfigLoader {


    constructor(configPath = null) {

        this.configPath =
            configPath ||
            path.join(
                __dirname,
                "../../config/skos-config.json"
            );


        this.config = null;

        this.status = "CREATED";

    }



    /**
     * Initialize Loader
     */
    initialize() {


        this.status =
            "INITIALIZED";


        return true;

    }



    /**
     * Load Configuration
     */
    load() {


        if (!fs.existsSync(this.configPath)) {


            throw new Error(
                `Config file not found: ${this.configPath}`
            );

        }



        const rawConfig =
            fs.readFileSync(
                this.configPath,
                "utf-8"
            );



        this.config =
            JSON.parse(rawConfig);



        this.status =
            "LOADED";



        return this.config;

    }



    /**
     * Get Configuration Value
     */
    get(key) {


        if (!this.config) {

            throw new Error(
                "Configuration not loaded"
            );

        }



        return this.config[key];

    }



    /**
     * Validate Configuration
     */
    validate() {


        if (!this.config) {

            return false;

        }



        const requiredFields = [

            "system",
            "version",
            "environment"

        ];



        for (const field of requiredFields) {


            if (!this.config[field]) {

                return false;

            }

        }



        return true;

    }



    /**
     * System Status
     */
    getStatus() {


        return {

            status:
                this.status,

            path:
                this.configPath,

            loaded:
                this.config !== null

        };

    }



    /**
     * Shutdown
     */
    shutdown() {


        this.config = null;


        this.status =
            "SHUTDOWN";


        return true;

    }


}



module.exports = ConfigLoader;
