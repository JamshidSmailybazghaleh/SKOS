/**
 * SKOS SDKC Engine
 *
 * File ID: ENG-004
 * Build: BUILD-000004
 * Version: 1.1.0
 *
 * Monitoring Hook Integration
 */


class SDKCEngine {


    constructor(options = {}) {


        this.logger =
            options.logger || null;


        this.monitoring =
            options.monitoring || null;



        this.status =
            "CREATED";


        this.repository =
            new Map();


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.log(
            "SDKC_ENGINE_INITIALIZED"
        );



        this.recordMonitoringEvent(

            "SDKC_ENGINE_INITIALIZED"

        );


        return true;


    }





    store(object) {


        if (
            !object ||
            !object.id
        ) {


            throw new Error(

                "Knowledge Object must contain a valid id."

            );


        }



        this.repository.set(

            object.id,

            object

        );



        this.log(

            "OBJECT_STORED",

            {

                id:
                    object.id

            }

        );



        this.recordMonitoringEvent(

            "SDKC_OBJECT_STORED",

            {

                objectId:
                    object.id

            }

        );



        this.updateMonitoringMetric(

            "objectsStored"

        );



        return object;


    }





    retrieve(id) {


        const result =
            this.repository.get(id)
            || null;



        if (result) {


            this.recordMonitoringEvent(

                "SDKC_OBJECT_RETRIEVED",

                {

                    objectId:
                        id

                }

            );


        }



        return result;


    }





    exists(id) {


        return this.repository.has(id);


    }





    list() {


        return Array.from(

            this.repository.values()

        );


    }





    count() {


        return this.repository.size;


    }





    remove(id) {


        const deleted =
            this.repository.delete(id);



        if (deleted) {


            this.log(

                "OBJECT_REMOVED",

                {

                    id

                }

            );



            this.recordMonitoringEvent(

                "SDKC_OBJECT_REMOVED",

                {

                    objectId:
                        id

                }

            );


        }



        return deleted;


    }





    getStatus() {


        return {


            status:
                this.status,


            totalObjects:
                this.count()


        };


    }





    recordMonitoringEvent(

        event,

        details = {}

    ) {



        if (
            this.monitoring &&
            this.monitoring.recordEvent
        ) {


            this.monitoring.recordEvent(

                event,

                details

            );


        }


    }





    updateMonitoringMetric(

        metric

    ) {


        if (
            this.monitoring &&
            this.monitoring.updateMetric
        ) {


            this.monitoring.updateMetric(

                metric

            );


        }


    }





    log(

        message,

        metadata = {}

    ) {


        if (this.logger) {


            this.logger.info(

                message,

                metadata

            );


        }


    }





    shutdown() {


        this.status =
            "SHUTDOWN";



        this.log(

            "SDKC_ENGINE_SHUTDOWN"

        );



        this.recordMonitoringEvent(

            "SDKC_ENGINE_SHUTDOWN"

        );



        return true;


    }


}



module.exports =
    SDKCEngine;
