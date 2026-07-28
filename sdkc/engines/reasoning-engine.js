/*
====================================================
SKOS Mission Control

Reasoning Engine

BUILD-000363

Version:
1.0

Status:
ACTIVE
====================================================
*/

const ReasoningEngine = {

    async initialize() {

        Logger.info(
            "Reasoning Engine Initializing..."
        );

        return true;

    },

    async reason(query) {

        Logger.info(
            "Reasoning Started"
        );

        const candidates =

            await KnowledgeQueryEngine.query(query);

        const ranked = [];

        for (const object of candidates) {

            const score =

                await this.calculateScore(object);

            ranked.push({

                object,

                score

            });

        }

        ranked.sort(

            (a, b) =>

            b.score - a.score

        );

        return ranked;

    },

    async calculateScore(object) {

        let score = 0;

        if (

            object.metadata.tags

        ) {

            score +=

                object.metadata.tags.length * 10;

        }

        if (

            object.metadata.references

        ) {

            score +=

                object.metadata.references.length * 5;

        }

        if (

            object.metadata.category

        ) {

            score += 20;

        }

        if (

            object.metadata.author

        ) {

            score += 10;

        }

        return score;

    },

    async related(objectId) {

        const edges =

            KnowledgeGraphEngine.getEdges(

                objectId

            );

        return edges;

    },

    async explain(objectId) {

        const relations =

            await this.related(objectId);

        return {

            object:

                objectId,

            relations:

                relations,

            evidence:

                relations.length

        };

    },

    status() {

        return "READY";

    }

};

window.ReasoningEngine =
    ReasoningEngine;

Object.freeze(
    ReasoningEngine);
