/**
 * SKOS Logger Service
 *
 * File ID:
 * CORE-003
 *
 * Version:
 * 1.0.0
 *
 * Build:
 * BUILD-000001
 */


const fs = require("fs");
const path = require("path");


class Logger {


    constructor(options = {}) {


        this.level =
            options.level || "INFO";


        this.logPath =
            options.logPath ||
            path.join(
                __dirname,
                "../../monitoring/logs/skos.log"
            );


        this.logs = [];


        this.status =
            "CREATED";


    }



    /**
     * Initialize Logger
     */

    initialize(){


        const directory =
            path.dirname(
                this.logPath
            );


        if(!fs.existsSync(directory)){


            fs.mkdirSync(
                directory,
                {
                    recursive:true
                }
            );

        }


        this.status =
            "INITIALIZED";


        this.info(
            "LOGGER_INITIALIZED"
        );


        return true;

    }



    /**
     * Write Log
     */

    write(
        level,
        message,
        metadata={}
    ){


        const entry = {


            level,


            message,


            metadata,


            timestamp:
                new Date()
                .toISOString()


        };



        this.logs.push(entry);



        fs.appendFileSync(

            this.logPath,

            JSON.stringify(entry)
            + "\n"

        );



        return entry;

    }



    /**
     * Information Log
     */

    info(
        message,
        metadata={}
    ){

        return this.write(
            "INFO",
            message,
            metadata
        );

    }



    /**
     * Warning Log
     */

    warn(
        message,
        metadata={}
    ){

        return this.write(
            "WARN",
            message,
            metadata
        );

    }



    /**
     * Error Log
     */

    error(
        message,
        metadata={}
    ){

        return this.write(
            "ERROR",
            message,
            metadata
        );

    }



    /**
     * Get Logs
     */

    getLogs(){


        return this.logs;

    }



    /**
     * Status
     */

    getStatus(){


        return {

            status:
                this.status,

            totalLogs:
                this.logs.length,

            level:
                this.level

        };


    }



    /**
     * Shutdown
     */

    shutdown(){


        this.status =
            "SHUTDOWN";


        return true;

    }


}



module.exports = Logger;
