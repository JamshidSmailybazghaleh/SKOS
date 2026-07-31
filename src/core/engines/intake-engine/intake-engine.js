/**
 * SKOS Intake Engine
 *
 * File ID:
 * ENG-INTAKE-001
 *
 * Version:
 * 1.0.0
 *
 * Build:
 * BUILD-000001
 */


class IntakeEngine {


    constructor(options = {}) {


        this.logger =
            options.logger || null;


        this.validator =
            options.validator || null;


        this.identifier =
            options.identifier || null;


        this.status =
            "CREATED";


        this.queue = [];


    }



    /**
     * Initialize Engine
     */

    initialize(){


        this.status =
            "INITIALIZED";


        this.log(
            "INTAKE_ENGINE_INITIALIZED"
        );


        return true;

    }



    /**
     * Receive Knowledge Object
     */

    execute(
        input
    ){


        this.log(
            "INTAKE_STARTED",
            {
                input
            }
        );



        const validation =
            this.validator
            ?
            this.validator.validate(input)
            :
            {
                valid:true
            };



        if(!validation.valid){


            this.log(
                "INTAKE_FAILED",
                {
                    errors:
                    validation.errors
                }
            );


            return {

                status:
                "FAILED",

                errors:
                validation.errors

            };

        }



        const record = {


            id:
            this.identifier
            ?
            this.identifier.generate()
            :
            "SKOS-TEMP-ID",


            data:
            input,


            status:
            "RECEIVED",


            timestamp:
            new Date()
            .toISOString()


        };



        this.queue.push(record);



        this.log(
            "INTAKE_COMPLETED",
            {
                id:
                record.id
            }
        );



        return record;

    }



    /**
     * Queue Status
     */

    getQueue(){


        return this.queue;

    }



    /**
     * Engine Status
     */

    getStatus(){


        return {

            status:
            this.status,


            queueSize:
            this.queue.length

        };


    }



    /**
     * Internal Logger
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



module.exports = IntakeEngine;
