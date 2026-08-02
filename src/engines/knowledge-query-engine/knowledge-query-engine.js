/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Query Engine
 * File       : knowledge-query-engine.js
 *
 * Build      : BUILD-000361
 * Version    : 1.0.0
 *
 * Status     : Active
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeQueryEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Query Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.repository =
            options.repository || null;


        this.monitoring =
            options.monitoring || null;


        this.queryHistory =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_QUERY_ENGINE_INITIALIZED"

        );


        return true;

    }





    execute(query = {}) {


        this.recordEvent(

            "QUERY_STARTED",

            query

        );


        let results =
            [];



        try {


            if (!this.repository) {


                throw new Error(

                    "Repository not connected."

                );

            }



            const objects =

                this.repository.list();



            results =

                objects.filter(

                    object =>

                        this.match(

                            object,

                            query

                        )

                );



            this.recordEvent(

                "QUERY_COMPLETED",

                {

                    results:

                        results.length

                }

            );



            return results;



        }

        catch(error) {


            const message =

                error instanceof Error

                ?

                error.message

                :

                String(error);



            this.recordEvent(

                "QUERY_FAILED",

                {

                    error:

                        message

                }

            );


            throw error;

        }


    }





    match(object, query) {


        if (

            query.id &&

            object.id !== query.id

        ) {

            return false;

        }



        if (

            query.type &&

            object.type !== query.type

        ) {

            return false;

        }



        if (

            query.tags &&

            Array.isArray(object.tags)

        ) {


            const hasTags =

                query.tags.every(

                    tag =>

                        object.tags.includes(tag)

                );


            if (!hasTags) {

                return false;

            }

        }




        if (

            query.text

        ) {


            const content =

                JSON.stringify(object)

                .toLowerCase();



            if (

                !content.includes(

                    query.text.toLowerCase()

                )

            ) {

                return false;

            }

        }



        return true;


    }





    searchById(id) {


        return this.execute({

            id

        });

    }





    searchByTag(tag) {


        return this.execute({

            tags:

                [

                    tag

                ]

        });

    }





    getHistory() {


        return [

            ...this.queryHistory

        ];

    }





    recordEvent(

        name,

        data = {}

    ) {


        const event = {


            name,


            data,


            timestamp:

                new Date()


        };


        this.queryHistory.push(

            event

        );



        if (this.monitoring) {


            this.monitoring.recordEvent(

                name,

                data

            );

        }


    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            queries:

                this.queryHistory.length


        };


    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "KNOWLEDGE_QUERY_ENGINE_SHUTDOWN"

        );


        return true;


    }


}



module.exports =
    KnowledgeQueryEngine;
