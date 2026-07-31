/**
 * SKOS Version Engine
 *
 * File ID:
 * ENG-VERSION-001
 *
 * Version:
 * 1.0.0
 *
 * Build:
 * BUILD-000001
 */


class VersionEngine {


    constructor(options = {}) {


        this.logger =
            options.logger || null;


        this.status =
            "CREATED";


        this.versions =
            new Map();


    }



    /**
     * Initialize
     */

    initialize(){


        this.status =
            "INITIALIZED";


        this.log(
            "VERSION_ENGINE_INITIALIZED"
        );


        return true;

    }



    /**
     * Create Initial Version
     */

    createVersion(
        objectId,
        data
    ){


        const version = {


            objectId,


            version:
            "1.0.0",


            data,


            createdAt:
            new Date()
            .toISOString(),


            status:
            "ACTIVE"


        };



        this.versions.set(

            objectId,

            [
                version
            ]

        );



        this.log(
            "VERSION_CREATED",
            version
        );



        return version;

    }



    /**
     * Update Version
     */

    updateVersion(
        objectId,
        data
    ){


        const history =
            this.versions.get(
                objectId
            );



        if(!history){


            throw new Error(
                "Object version not found"
            );

        }



        const current =
            history[
                history.length - 1
            ];



        const parts =
            current.version
            .split(".")
            .map(Number);



        parts[1]++;



        const newVersion = {


            objectId,


            version:
            parts.join("."),


            data,


            createdAt:
            new Date()
            .toISOString(),


            status:
            "ACTIVE"


        };



        history.push(
            newVersion
        );



        this.log(
            "VERSION_UPDATED",
            newVersion
        );



        return newVersion;

    }



    /**
     * Get Version History
     */

    getHistory(
        objectId
    ){


        return (
            this.versions.get(
                objectId
            )
            ||
            []
        );


    }



    /**
     * Status
     */

    getStatus(){


        return {

            status:
            this.status,


            objects:
            this.versions.size


        };


    }



    log(
        message,
        metadata={}
    ){


        if(this.logger){

            this.logger.info(
                message,
                metadata
            );

        }


    }



    shutdown(){


        this.status =
            "SHUTDOWN";


        return true;

    }


}


module.exports = VersionEngine;
