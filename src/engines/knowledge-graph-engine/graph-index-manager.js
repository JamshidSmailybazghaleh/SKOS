/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * Module     : Graph Index Manager
 *
 * File       : graph-index-manager.js
 *
 * Build      : BUILD-000425
 * Version    : 2.0.0
 *
 * Status     : Core Stabilization Phase
 *
 * Mission:
 * Manage high performance indexes
 * for Knowledge Graph entities.
 *
 * Responsibilities:
 * - Create Indexes
 * - Maintain Index Entries
 * - Search Knowledge Objects
 * - Provide Stable Index API
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphIndexManager {


    constructor(options = {}) {


        this.name =
            "Graph Index Manager";


        this.version =
            "2.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.indexes =
            new Map();


        /*
         * Default indexes
         */

        this.createIndex("id");

        this.createIndex("type");

        this.createIndex("tag");

        this.createIndex("language");


    }




    /**
     * ======================================================
     * Initialize
     * ======================================================
     */


    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_INDEX_MANAGER_INITIALIZED"

        );


        return true;


    }





    /**
     * ======================================================
     * Index Management
     * ======================================================
     */


    createIndex(name) {


        if (!name) {

            throw new Error(
                "Index name required."
            );

        }


        if (!this.indexes.has(name)) {


            this.indexes.set(

                name,

                new Map()

            );


        }


        return true;


    }





    hasIndex(name) {


        return this.indexes.has(name);


    }





    removeIndex(name) {


        return this.indexes.delete(name);


    }





    /**
     * ======================================================
     * Add Object
     *
     * Supports:
     *
     * add(object)
     *
     * and
     *
     * add(index,key,object)
     *
     * ======================================================
     */


    add(...args) {


        /*
         * New API
         */

        if (args.length === 1) {


            const object =
                args[0];


            if (
                !object ||
                !object.id
            ) {

                throw new Error(
                    "Indexed object requires id."
                );

            }


            this.indexValue(

                "id",

                object.id,

                object

            );


            if (object.type) {

                this.indexValue(
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

                        this.indexValue(
                            "tag",
                            tag,
                            object
                        );

                    }

                );

            }


            if (object.language) {

                this.indexValue(
                    "language",
                    object.language,
                    object
                );

            }


            this.recordEvent(

                "GRAPH_INDEX_OBJECT_ADDED",

                {
                    id: object.id
                }

            );


            return object;


        }





        /*
         * Legacy Test API
         */

        if (args.length === 3) {


            const [

                index,

                key,

                object

            ] = args;


            this.indexValue(

                index,

                key,

                object

            );


            return object;


        }


        throw new Error(
            "Invalid add arguments."
        );


    }






    /**
     * ======================================================
     * Internal Index Writer
     * ======================================================
     */


    indexValue(

        index,

        key,

        object

    ) {


        this.createIndex(index);


        const map =

            this.indexes.get(index);



        if (!map.has(key)) {


            map.set(

                key,

                []

            );


        }



        map
            .get(key)
            .push(object);



    }





    /**
     * ======================================================
     * Search
     * ======================================================
     */


    search(

        index,

        key

    ) {


        if (
            !this.indexes.has(index)
        ) {

            return [];

        }



        return (

            this.indexes
                .get(index)
                .get(key)

            ||

            []

        );


    }





    /**
     * ======================================================
     * Find APIs
     * ======================================================
     */


    findById(id) {


        const result =

            this.search(
                "id",
                id
            );


        return (

            result[0]

            ||

            null

        );


    }





    findByType(type) {


        return this.search(

            "type",

            type

        );


    }





    findByTag(tag) {


        return this.search(

            "tag",

            tag

        );


    }





    findByLanguage(language) {


        return this.search(

            "language",

            language

        );


    }





    /**
     * ======================================================
     * Remove
     * ======================================================
     */


    remove(id) {


        const object =

            this.findById(id);



        if (!object) {

            return false;

        }



        const idIndex =

            this.indexes.get("id");


        idIndex.delete(id);



        this.recordEvent(

            "GRAPH_INDEX_OBJECT_REMOVED",

            {
                id
            }

        );



        return true;


    }





    /**
     * ======================================================
     * Statistics
     * ======================================================
     */


    count() {


        const index =

            this.indexes.get("id");


        return index.size;


    }





    getStatus() {


        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            indexes:
                this.indexes.size,

            indexedObjects:
                this.count()

        };


    }





    /**
     * ======================================================
     * Monitoring
     * ======================================================
     */


    recordEvent(

        name,

        metadata = {}

    ) {


        if (

            this.monitoring &&

            typeof this.monitoring.recordEvent === "function"

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

            this.monitoring &&

            typeof this.monitoring.updateMetric === "function"

        ) {


            this.monitoring.updateMetric(

                name

            );


        }


    }





    /**
     * ======================================================
     * Shutdown
     * ======================================================
     */


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
