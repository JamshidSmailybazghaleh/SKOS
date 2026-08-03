/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Knowledge Inference Engine
 * File      : knowledge-inference-engine.js
 *
 * Build     : BUILD-000700.5
 * Version   : 1.0.0
 *
 * Mission:
 * Generate derived knowledge from existing knowledge.
 * ==========================================================
 */


class KnowledgeInferenceEngine {


    constructor() {


        this.name =
            "Knowledge Inference Engine";


        this.version =
            "1.0.0";


        this.status =
            "READY";


        this.rules =
            [];


        this.derivedKnowledge =
            [];


    }




    addRule(rule) {


        if (
            typeof rule !== "function"
        ) {

            throw new Error(
                "Inference rule must be a function."
            );

        }



        this.rules.push(rule);



        return true;

    }




    infer(context) {


        const results =
            [];



        for (
            const rule of this.rules
        ) {


            const result =
                rule(context);



            if (
                result
            ) {


                if (

                    !this.exists(result)

                ) {


                    results.push(
                        result
                    );


                    this.derivedKnowledge.push(
                        result
                    );

                }

            }


        }



        return results;

    }




    exists(knowledge) {


        return this.derivedKnowledge.some(

            item =>

                item.id === knowledge.id

        );

    }




    getDerivedKnowledge() {


        return this.derivedKnowledge;

    }




    clear() {


        this.derivedKnowledge =
            [];


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


            rules:

                this.rules.length,


            derived:

                this.derivedKnowledge.length


        };

    }


}



module.exports =
    KnowledgeInferenceEngine;
