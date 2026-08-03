/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Knowledge Reasoning Engine
 * File      : knowledge-reasoning-engine.js
 *
 * Build     : BUILD-000700.3
 * Version   : 1.0.0
 *
 * Mission:
 * Analyze Knowledge Graph and generate reasoning results.
 * ==========================================================
 */


class KnowledgeReasoningEngine {


    constructor() {


        this.name =
            "Knowledge Reasoning Engine";


        this.version =
            "1.0.0";


        this.status =
            "READY";


        this.rules =
            [];


        this.insights =
            [];

    }




    addRule(rule) {


        if (
            typeof rule !== "function"
        ) {

            throw new Error(
                "Rule must be a function."
            );

        }



        this.rules.push(rule);



        return true;

    }




    analyze(graph) {


        const result = [];



        for (
            const rule of this.rules
        ) {


            const insight =
                rule(graph);



            if (
                insight
            ) {

                result.push(
                    insight
                );

            }


        }



        this.insights =
            result;



        return result;

    }




    inferRelationship(
        graph,
        source,
        relation
    ) {


        return graph.edges.filter(

            edge =>

                edge.source === source

                &&

                edge.relation === relation

        );

    }




    findPatterns(graph) {


        const patterns = [];



        for (
            const edge of graph.edges
        ) {


            patterns.push({

                source:
                    edge.source,


                relation:
                    edge.relation,


                target:
                    edge.target

            });


        }



        return patterns;

    }




    getInsights() {


        return this.insights;

    }




    clearInsights() {


        this.insights =
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


            insights:

                this.insights.length


        };

    }


}



module.exports =
    KnowledgeReasoningEngine;
