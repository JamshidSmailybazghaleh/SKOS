/**
 * SKOS Metadata Engine
 *
 * File ID:
 * ENG-META-001
 *
 * Version:
 * 1.0.0
 *
 * Build:
 * BUILD-000001
 */


class MetadataEngine {


    constructor(options = {}) {


        this.logger =
            options.logger || null;


        this.validator =
            options.validator || null;


        this.status =
            "CREATED";


        this.records = [];


    }



    /**
     * Initialize Engine
     */

    initialize(){


        this.status =
            "INITIALIZED";


        this.log(
            "METADATA_ENGINE_INITIALIZED"
        );


        return true;

    }



    /**
     * Generate Metadata
     */

    execute(
        object
    ){


        this.log(
            "METADATA_GENERATION_STARTED",
            {
                object
            }
        );



        const metadata = {


            object_id:
                object.id ||
                "UNKNOWN",


            title:
                object.title ||
                "UNTITLED",


            author:
                object.author ||
                "UNKNOWN",


            language:
                object.language ||
                "UNKNOWN",


            format:
                object.format ||
                "UNKNOWN",


            category:
                object.category ||
                "GENERAL",


            version:
                "1.0.0",


            created_at:
                new Date()
                .toISOString(),


            status:
                "CREATED"


        };



        this.records.push(
            metadata
        );



        this.log(
            "METADATA_GENERATED",
            {
                id:
                metadata.object_id
            }
        );



        return metadata;

    }



    /**
     * Find Metadata
     */

    find(
        id
    ){


        return this.records.find(

            item =>
            item.object_id === id

        );


    }



    /**
     * Status
     */

    getStatus(){


        return {

            status:
            this.status,


            records:
            this.records.length

        };


    }



    /**
     * Logger
     */

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



    /**
     * Shutdown
     */

    shutdown(){


        this.status =
            "SHUTDOWN";


        return true;

    }


}



module.exports = MetadataEngine;
