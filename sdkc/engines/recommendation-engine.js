/*
====================================================
SKOS Mission Control

Recommendation Engine

BUILD-000364

Version:
1.0

Status:
ACTIVE
====================================================
*/

const RecommendationEngine = {

    async initialize() {

        Logger.info(
            "Recommendation Engine Initializing..."
        );

        return true;

    },

    async recommend(query, limit = 10) {

        const reasoning =

            await ReasoningEngine.reason(query);

        const recommendations = [];

        const visited = new Set();

        for (const item of reasoning) {

            const object = item.object;

            if (!visited.has(object.id)) {

                visited.add(object.id);

                recommendations.push({

                    id: object.id,

                    title: object.title,

                    score: item.score,

                    reason: "Semantic Similarity"

                });

            }

            if (recommendations.length >= limit) {

                break;

            }

        }

        return recommendations;

    },

    async related(objectId) {

        const relations =

            await ReasoningEngine.related(objectId);

        return relations;

    },

    async explain(objectId) {

        return await ReasoningEngine.explain(objectId);

    },

    status() {

        return "READY";

    }

};

window.RecommendationEngine =
    RecommendationEngine;

Object.freeze(
    RecommendationEngine
);
