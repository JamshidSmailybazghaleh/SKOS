/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * Module     : Graph Index Manager
 *
 * Build      : BUILD-000426
 * Version    : 2.0.0
 *
 * Status     : Core Stabilization Phase
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
            "2.0.0";


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



    /**
     * ======================================================
     * Lifecycle
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





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(
            "GRAPH_INDEX_MANAGER_SHUTDOWN"
        );


        return true;

    }





    /**
     * ======================================================
     * Compatibility Layer
     * ======================================================
     */


    createIndex(name) {


        if (!this.indexes[name]) {


            this.indexes[name] =
                new Map();

        }


        return true;

    }




    hasIndex(name) {


        return (
            this.indexes[name]
            instanceof Map
        );

    }




    removeIndex(name) {


        if (
            this.indexes[name]
        ) {


            delete this.indexes[name];

            return true;

        }


        return false;

    }





    /**
     * ======================================================
     * Add Object
     * ======================================================
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


        return object;


    }





    /**
     * Old API Compatibility
     */


    search(
        index,
        key
    ) {


        if (
            !this.indexes[index]
        ) {


            return [];

        }


        return (
            this.indexes[index].get(key)
            ||
            []
        );


    }





    /**
     * Internal Index
     */


    addToIndex(
        index,
        key,
        object
    ) {


        if (
            !this.indexes[index]
        ) {


            this.createIndex(index);

        }



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
     * ======================================================
     * Search Operations
     * ======================================================
     */


    findById(id) {


        return (
            this.indexes.id.get(id)
            ||
            null
        );


    }




    findByType(type) {


        return (
            this.indexes.type.get(type)
            ||
            []
        );


    }




    findByTag(tag) {


        return (
            this.indexes.tag.get(tag)
            ||
            []
        );


    }




    findByLanguage(language) {


        return (
            this.indexes.language.get(language)
            ||
            []
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



        this.indexes.id.delete(id);



        Object.keys(
            this.indexes
        )
        .forEach(
            indexName => {


                const index =
                    this.indexes[indexName];


                if (
                    index instanceof Map
                ) {


                    index.forEach(
                        (items,key) => {


                            index.set(
                                key,
                                items.filter(
                                    item =>
                                        item.id !== id
                                )
                            );


                        }
                    );


                }


            }
        );



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





    count() {


        return this.indexes.id.size;


    }





    clear() {


        Object.keys(
            this.indexes
        )
        .forEach(
            key => {

                this.indexes[key].clear();

            }
        );


        this.recordEvent(
            "GRAPH_INDEX_CLEARED"
        );


    }





    /**
     * Monitoring
     */


    recordEvent(
        name,
        metadata = {}
    ) {


        if (
            this.monitoring &&
            this.monitoring.recordEvent
        ) {


            this.monitoring.recordEvent(
                name,
                metadata
            );


        }


    }




    updateMetric(name) {


        if (
            this.monitoring &&
            this.monitoring.updateMetric
        ) {


            this.monitoring.updateMetric(
                name
            );


        }


    }



}



module.exports =
    GraphIndexManager;
