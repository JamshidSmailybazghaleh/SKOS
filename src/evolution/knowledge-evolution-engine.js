/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Knowledge Evolution Engine
 * File      : knowledge-evolution-engine.js
 *
 * Build     : BUILD-000701.0
 * Version   : 1.0.0
 * ==========================================================
 */

class KnowledgeEvolutionEngine {

    constructor() {

        this.name =
            "Knowledge Evolution Engine";

        this.version =
            "1.0.0";

        this.status =
            "READY";

        this.rules = [];

        this.history = [];

        this.evolutions = [];

    }


    addRule(rule) {

        if (typeof rule !== "function") {

            throw new Error(
                "Evolution rule must be a function."
            );

        }

        this.rules.push(rule);

        return true;

    }


    evolve(context) {

        const results = [];

        for (const rule of this.rules) {

            const evolution =
                rule(context);

            if (evolution) {

                this.evolutions.push(evolution);

                this.history.push({

                    context,

                    evolution,

                    timestamp:
                        new Date()

                });

                results.push(evolution);

            }

        }

        return results;

    }


    getEvolutionHistory() {

        return this.history;

    }


    getEvolutionResults() {

        return this.evolutions;

    }


    clear() {

        this.rules = [];

        this.history = [];

        this.evolutions = [];

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

            evolutions:
                this.evolutions.length,

            history:
                this.history.length

        };

    }

}

module.exports =
    KnowledgeEvolutionEngine;
