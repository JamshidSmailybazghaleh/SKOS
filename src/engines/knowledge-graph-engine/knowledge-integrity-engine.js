/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Governance Layer
 * File        : knowledge-integrity-engine.js
 *
 * Build       : BUILD-000910.3
 * Version     : 1.0.0
 *
 * Mission:
 * Preserve knowledge authenticity, integrity,
 * provenance and change verification.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


const crypto =
require("crypto");



class KnowledgeIntegrityEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-INTEGRITY-ENGINE";


        this.name =
            "Knowledge Integrity Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000910.3";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.auditEngine =
            options.auditEngine || null;


        this.objects =
            new Map();


        this.hashHistory =
            [];


        this.integrityEvents =
            [];


        this.createdAt =
            new Date();


    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "INTEGRITY_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "INTEGRITY_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Register knowledge object
     */


    registerObject(

        objectId,

        data = {}

    ){


        if(!objectId){


            throw new Error(

                "Knowledge object id required."

            );

        }



        const hash =

            this.generateHash(

                data.content || ""

            );



        const object = {


            id:

                objectId,


            title:

                data.title || "Unknown",


            type:

                data.type || "KNOWLEDGE_OBJECT",


            version:

                data.version || "1.0.0",


            hash,


            provenance:

                data.provenance || [],


            createdAt:

                new Date(),


            updatedAt:

                new Date()


        };



        this.objects.set(

            objectId,

            object

        );



        this.hashHistory.push({

            objectId,


            hash,


            timestamp:

                new Date()

        });



        this.recordEvent(

            "KNOWLEDGE_OBJECT_REGISTERED",

            {

                objectId,

                hash

            }

        );



        return object;

    }





    /**
     * Generate content hash
     */


    generateHash(

        content

    ){


        return crypto

            .createHash(

                "sha256"

            )

            .update(

                String(content)

            )

            .digest(

                "hex"

            );

    }





    /**
     * Verify integrity
     */


    verify(

        objectId,

        content

    ){


        const object =

            this.objects.get(

                objectId

            );



        if(!object){


            throw new Error(

                "Knowledge object not found."

            );

        }



        const currentHash =

            this.generateHash(

                content

            );



        const valid =

            currentHash ===

            object.hash;



        const event = {


            objectId,


            originalHash:

                object.hash,


            currentHash,


            valid,


            timestamp:

                new Date()

        };



        this.integrityEvents.push(

            event

        );



        if(!valid){


            this.recordEvent(

                "INTEGRITY_VIOLATION_DETECTED",

                event

            );


        }


        return event;

    }





    /**
     * Update knowledge object
     */


    updateObject(

        objectId,

        content

    ){


        const object =

            this.objects.get(

                objectId

            );



        if(!object){


            throw new Error(

                "Knowledge object not found."

            );

        }



        const newHash =

            this.generateHash(

                content

            );



        object.hash =

            newHash;



        object.updatedAt =

            new Date();



        object.version =

            this.incrementVersion(

                object.version

            );



        this.hashHistory.push({

            objectId,


            hash:

                newHash,


            timestamp:

                new Date()

        });



        this.recordEvent(

            "KNOWLEDGE_OBJECT_UPDATED",

            {

                objectId,

                newHash

            }

        );



        return object;

    }





    /**
     * Version increment
     */


    incrementVersion(

        version

    ){


        const parts =

            version

                .split(".")

                .map(

                    Number

                );



        parts[2]++;



        return parts.join(".");

    }





    /**
     * Add provenance record
     */


    addProvenance(

        objectId,

        source

    ){


        const object =

            this.objects.get(

                objectId

            );



        if(object){


            object.provenance.push({

                source,


                timestamp:

                    new Date()

            });

        }



        return object;

    }





    getObject(

        objectId

    ){


        return (

            this.objects.get(

                objectId

            )

            ||

            null

        );

    }





    getHashHistory(){


        return this.hashHistory;

    }





    getIntegrityEvents(){


        return this.integrityEvents;

    }





    getStatistics(){


        return {


            objects:

                this.objects.size,


            hashes:

                this.hashHistory.length,


            integrityChecks:

                this.integrityEvents.length,


            violations:

                this.integrityEvents.filter(

                    item =>

                    !item.valid

                ).length


        };

    }





    getStatus(){


        return {


            engineId:

                this.engineId,


            name:

                this.name,


            version:

                this.version,


            build:

                this.build,


            status:

                this.status,


            statistics:

                this.getStatistics()


        };

    }





    stop(){


        this.status =
            "STOPPED";


        this.recordEvent(

            "INTEGRITY_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "INTEGRITY_ENGINE_SHUTDOWN"

        );


        return true;

    }





    recordEvent(

        event,

        metadata = {}

    ){


        if(this.monitoring){


            this.monitoring.recordEvent(

                event,

                metadata

            );

        }

    }





    updateMetric(

        metric

    ){


        if(this.monitoring){


            this.monitoring.updateMetric(

                metric

            );

        }

    }


}



module.exports =

    KnowledgeIntegrityEngine;
