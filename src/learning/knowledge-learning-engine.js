/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Knowledge Learning Engine
 * File      : knowledge-learning-engine.js
 *
 * Build     : BUILD-000700.7
 * Version   : 1.0.0
 *
 * Mission:
 * Learn from knowledge activity and patterns.
 * ==========================================================
 */


class KnowledgeLearningEngine {


    constructor() {


        this.name =
            "Knowledge Learning Engine";


        this.version =
            "1.0.0";


        this.status =
            "READY";


        this.events =
            [];


        this.patterns =
            [];


        this.models =
            new Map();


    }




    recordEvent(event) {


        if (!event) {

            throw new Error(
                "Learning event required."
            );

        }



        this.events.push({

            ...event,

            timestamp:
                new Date()

        });



        return true;

    }




    analyzePatterns() {


        const result =
            [];



        for (
            const event of this.events
        ) {


            if (
                event.type
            ) {


                result.push({

                    pattern:

                        event.type,


                    occurrences:

                        1


                });

            }


        }



        this.patterns =
            result;



        return result;

    }




    addModel(
        name,
        model
    ) {


        this.models.set(

            name,

            model

        );


        return true;

    }




    getModel(name) {


        return (

            this.models.get(name)

            ||

            null

        );

    }




    learn(context) {


        this.recordEvent({

            type:
                "LEARNING_EXECUTION",


            context

        });



        return this.analyzePatterns();

    }




    getEvents() {


        return this.events;

    }




    getPatterns() {


        return this.patterns;

    }




    clear() {


        this.events =
            [];


        this.patterns =
            [];


        this.models.clear();



        return true;

    }




    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            events:

                this.events.length,


            patterns:

                this.patterns.length,


            models:

                this.models.size


        };

    }


}



module.exports =
    KnowledgeLearningEngine;
