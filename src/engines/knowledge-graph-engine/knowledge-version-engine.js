/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Version Engine
 * File        : knowledge-version-engine.js
 *
 * Build       : BUILD-000425
 * Version     : 1.0.0
 *
 * Mission:
 * Manage knowledge object versions,
 * history and evolution lifecycle.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeVersionEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-VERSION-ENGINE";


        this.name =
            "Knowledge Version Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000425";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;



        this.versions =
            new Map();



        this.history =
            [];

    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_VERSION_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "KNOWLEDGE_VERSION_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Create first version
     */


    createVersion(

        objectId,

        content,

        metadata = {}

    ){


        if(

            !objectId

        ){


            throw new Error(

                "Knowledge object id required."

            );

        }



        const version = {


            id:

                this.generateVersionId(),


            objectId,


            number:

                "1.0.0",


            content,


            metadata,


            active:

                true,


            createdAt:

                new Date()

        };



        this.versions.set(

            version.id,

            version

        );



        this.history.push(

            {

                action:

                    "CREATE",


                version

            }

        );



        this.recordEvent(

            "KNOWLEDGE_VERSION_CREATED",

            {

                objectId,

                version:

                    version.number

            }

        );



        return version;

    }





    /**
     * Create new version
     */


    updateVersion(

        versionId,

        newContent,

        change = {}

    ){


        const current =

            this.versions.get(

                versionId

            );



        if(

            !current

        ){


            throw new Error(

                "Version not found."

            );

        }



        current.active = false;



        const nextVersion = {


            id:

                this.generateVersionId(),


            objectId:

                current.objectId,


            number:

                this.incrementVersion(

                    current.number

                ),


            content:

                newContent,


            metadata:

                {

                    previous:

                        current.id,


                    change

                },



            active:

                true,


            createdAt:

                new Date()

        };



        this.versions.set(

            nextVersion.id,

            nextVersion

        );



        this.history.push(

            {

                action:

                    "UPDATE",


                version:

                    nextVersion

            }

        );



        this.recordEvent(

            "KNOWLEDGE_VERSION_UPDATED",

            {

                objectId:

                    current.objectId

            }

        );



        return nextVersion;

    }





    /**
     * Increment version
     */


    incrementVersion(

        version

    ){


        const parts =

            version

            .split(

                "."

            )

            .map(

                Number

            );



        parts[2]++;



        return parts.join(

            "."

        );

    }





    /**
     * Get active version
     */


    getCurrentVersion(

        objectId

    ){


        const versions =

            Array.from(

                this.versions.values()

            )

            .filter(

                item =>

                    item.objectId === objectId &&

                    item.active

            );



        return versions[0] || null;

    }





    /**
     * Get all versions
     */


    getVersions(

        objectId

    ){


        return Array.from(

            this.versions.values()

        )

        .filter(

            item =>

                item.objectId === objectId

        );

    }





    /**
     * Rollback
     */


    rollback(

        versionId

    ){


        const target =

            this.versions.get(

                versionId

            );



        if(

            !target

        ){


            throw new Error(

                "Rollback target not found."

            );

        }



        for(

            const version of

            this.versions.values()

        ){


            if(

                version.objectId === target.objectId

            ){


                version.active = false;

            }

        }



        target.active = true;



        this.history.push(

            {

                action:

                    "ROLLBACK",


                versionId,


                timestamp:

                    new Date()

            }

        );



        this.recordEvent(

            "KNOWLEDGE_VERSION_ROLLBACK",

            {

                versionId

            }

        );



        return target;

    }





    /**
     * Version history
     */


    getHistory(){


        return this.history;

    }





    generateVersionId(){


        return (

            "VER-" +

            Date.now()

        );

    }





    getStatistics(){


        return {


            objects:

                new Set(

                    Array.from(

                        this.versions.values()

                    )

                    .map(

                        item => item.objectId

                    )

                ).size,


            versions:

                this.versions.size,


            history:

                this.history.length


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

            "KNOWLEDGE_VERSION_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "KNOWLEDGE_VERSION_ENGINE_SHUTDOWN"

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

    KnowledgeVersionEngine;
