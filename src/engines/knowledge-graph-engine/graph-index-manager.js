/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * Module     : Graph Index Manager
 *
 * Build      : BUILD-000363
 * Version    : 1.0.0
 *
 * Status     : Monitoring Integrated
 *
 * Mission:
 * Manage high performance indexes
 * for Knowledge Graph entities.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphIndexManager {


    constructor(options = {}) {


        this.name =
            "Graph Index Manager";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;



        this.indexes = {


            id:
                new Map(),


            type:
                new Map(),


            tag:
                new Map(),


            language:
                new Map()


        };


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_INDEX_MANAGER_INITIALIZED"

        );


        return true;


    }





    /**
     * Add object to indexes
     */


    add(object) {


        if (
            !object ||
            !object.id
        ) {

            throw new Error(

                "Indexed object requires id."

            );

        }



        this.indexes.id.set(

            object.id,

            object

        );





        if (object.type) {


            this.addToIndex(

                "type",

                object.type,

                object

            );

        }





        if (
            Array.isArray(object.tags)
        ) {


            object.tags.forEach(

                tag => {


                    this.addToIndex(

                        "tag",

                        tag,

                        object

                    );


                }

            );


        }





        if (object.language) {


            this.addToIndex(

                "language",

                object.language,

                object

            );


        }





        this.recordEvent(

            "GRAPH_INDEX_OBJECT_ADDED",

            {

                id:

                    object.id

            }

        );



        this.updateMetric(

            "indexedObjects"

        );



        return object;


    }





    /**
     * Internal index handler
     */


    addToIndex(

        index,

        key,

        object

    ) {


        if (
            !this.indexes[index].has(key)
        ) {


            this.indexes[index].set(

                key,

                []

            );


        }



        this.indexes[index]

            .get(key)

            .push(object);



    }





    /**
     * Search by id
     */


    findById(id) {


        return (

            this.indexes.id.get(id)

            ||

            null

        );


    }





    /**
     * Search by type
     */


    findByType(type) {


        return (

            this.indexes.type.get(type)

            ||

            []

        );


    }





    /**
     * Search by tag
     */


    findByTag(tag) {


        return (

            this.indexes.tag.get(tag)

            ||

            []

        );


    }





    /**
     * Search by language
     */


    findByLanguage(language) {


        return (

            this.indexes.language.get(language)

            ||

            []

        );


    }





    /**
     * Remove object from index
     */


    remove(id) {


        const object =

            this.findById(id);



        if (!object) {

            return false;

        }



        this.indexes.id.delete(id);



        this.recordEvent(

            "GRAPH_INDEX_OBJECT_REMOVED",

            {

                id

            }

        );



        return true;


    }





    /**
     * Statistics
     */


    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            indexedObjects:

                this.indexes.id.size


        };


    }





    recordEvent(

        name,

        metadata = {}

    ) {


        if (
            this.monitoring
        ) {


            this.monitoring.recordEvent(

                name,

                metadata

            );

        }


    }





    updateMetric(

        name

    ) {


        if (
            this.monitoring
        ) {


            this.monitoring.updateMetric(

                name

            );

        }


    }





    shutdown() {


        this.status =
            "SHUTDOWN";



        this.recordEvent(

            "GRAPH_INDEX_MANAGER_SHUTDOWN"

        );


        return true;


    }


}



module.exports =

    GraphIndexManager;
