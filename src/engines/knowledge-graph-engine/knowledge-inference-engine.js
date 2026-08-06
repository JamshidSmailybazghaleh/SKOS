/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Intelligence Layer
 * File        : knowledge-inference-engine.js
 *
 * Build       : BUILD-000911.2
 * Version     : 1.0.0
 *
 * Mission:
 * Generate new knowledge through inference
 * from existing knowledge objects.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeInferenceEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-INFERENCE-ENGINE";


        this.name =
            "Knowledge Inference Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000911.2";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.reasoningEngine =
            options.reasoningEngine || null;


        this.knowledgeGraph =
            new Map();


        this.inferenceRules =
            new Map();


        this.generatedKnowledge =
            [];


        this.inferenceHistory =
            [];

    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "INFERENCE_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "INFERENCE_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Add knowledge node
     */


    addNode(

        nodeId,

        data = {}

    ){


        if(!nodeId){


            throw new Error(

                "Knowledge node id required."

            );

        }



        const node = {


            id:

                nodeId,


            type:

                data.type || "KNOWLEDGE_OBJECT",


            attributes:

                data.attributes || {},


            relations:

                [],


            confidence:

                data.confidence || 0.5,


            createdAt:

                new Date()

        };



        this.knowledgeGraph.set(

            nodeId,

            node

        );



        return node;

    }





    /**
     * Create graph relation
     */


    addRelation(

        source,

        relation,

        target

    ){


        const sourceNode =

            this.knowledgeGraph.get(

                source

            );


        if(!sourceNode){


            throw new Error(

                "Source node not found."

            );

        }



        sourceNode.relations.push({


            relation,


            target,


            createdAt:

                new Date()


        });



        return true;

    }





    /**
     * Add inference rule
     */


    addInferenceRule(

        ruleId,

        definition = {}

    ){


        if(!ruleId){


            throw new Error(

                "Inference rule id required."

            );

        }



        const rule = {


            id:

                ruleId,


            premise:

                definition.premise || {},


            conclusion:

                definition.conclusion || {},


            confidence:

                definition.confidence || 0.5,


            enabled:

                true,


            createdAt:

                new Date()

        };



        this.inferenceRules.set(

            ruleId,

            rule

        );



        return rule;

    }





    /**
     * Execute inference
     */


    infer(

        context = {}

    ){


        const results = [];



        for(

            const rule of this.inferenceRules.values()

        ){


            if(

                !rule.enabled

            )

                continue;



            if(

                this.match(

                    rule.premise,

                    context

                )

            ){


                const knowledge = {


                    id:

                        this.generateId(),


                    sourceRule:

                        rule.id,


                    conclusion:

                        rule.conclusion,


                    confidence:

                        rule.confidence,


                    generatedAt:

                        new Date()

                };



                this.generatedKnowledge.push(

                    knowledge

                );


                results.push(

                    knowledge

                );

            }

        }



        const record = {


            context,


            results,


            timestamp:

                new Date()

        };



        this.inferenceHistory.push(

            record

        );



        this.recordEvent(

            "INFERENCE_COMPLETED",

            record

        );



        this.updateMetric(

            "inferenceRuns"

        );



        return record;

    }





    /**
     * Match inference premise
     */


    match(

        premise,

        context

    ){


        const keys =

            Object.keys(

                premise

            );



        return keys.every(

            key =>

                context[key] === premise[key]

        );

    }





    /**
     * Add generated knowledge back
     */


    promoteGeneratedKnowledge(

        knowledgeId

    ){


        const item =

            this.generatedKnowledge.find(

                k =>

                    k.id === knowledgeId

            );



        if(!item)

            return null;



        this.knowledgeGraph.set(

            knowledgeId,

            {


                id:

                    knowledgeId,


                type:

                    "INFERRED_KNOWLEDGE",


                attributes:

                    item.conclusion,


                confidence:

                    item.confidence,


                relations:

                    [],


                createdAt:

                    new Date()

            }

        );



        return item;

    }





    getKnowledgeGraph(){


        return Array.from(

            this.knowledgeGraph.values()

        );

    }





    getGeneratedKnowledge(){


        return this.generatedKnowledge;

    }





    getHistory(){


        return this.inferenceHistory;

    }





    getStatistics(){


        return {


            nodes:

                this.knowledgeGraph.size,


            rules:

                this.inferenceRules.size,


            generated:

                this.generatedKnowledge.length,


            executions:

                this.inferenceHistory.length


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

            "INFERENCE_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "INFERENCE_ENGINE_SHUTDOWN"

        );


        return true;

    }





    generateId(){


        return (

            "INFERRED-" +

            Date.now()

        );

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

    KnowledgeInferenceEngine;
