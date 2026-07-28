/*
====================================================
SKOS Mission Control

Natural Language Engine

BUILD-000366

Version:
1.1.0

Status:
ACTIVE
====================================================
*/

const NaturalLanguageEngine = {

    supportedLanguages: [

        "fa",
        "en"

    ],

    async initialize() {

        Logger.info(

            "Natural Language Engine Initializing..."

        );

        return true;

    },

    async process(sentence, context = {}) {

        if (!sentence) {

            throw new Error(

                "Sentence Required."

            );

        }

        const normalized =

            this.normalize(sentence);

        const language =

            this.detectLanguage(normalized);

        const intent =

            this.detectIntent(normalized);

        const entities =

            this.extractEntities(normalized);

        const command =

            this.buildCommand(

                language,

                intent,

                entities,

                context

            );

        return await this.execute(command);

    },

    normalize(text) {

        return text

            .replace(/\s+/g, " ")

            .trim();

    },

    detectLanguage(text) {

        const persian =

            /[\u0600-\u06FF]/;

        return persian.test(text)

            ? "fa"

            : "en";

    },

    detectIntent(text) {

        if (

            text.includes("چیست") ||

            text.includes("توضیح")

        ) {

            return "EXPLAIN";

        }

        if (

            text.includes("پیشنهاد")

        ) {

            return "RECOMMEND";

        }

        if (

            text.includes("مرتبط")

        ) {

            return "RELATION";

        }

        if (

            text.includes("مقایسه")

        ) {

            return "COMPARE";

        }

        return "SEARCH";

    },

    extractEntities(text) {

        return {

            query: text,

            timestamp:

                new Date().toISOString()

        };

    },

    buildCommand(

        language,

        intent,

        entities,

        context

    ) {

        return {

            language,

            intent,

            entities,

            context

        };

    },

    async execute(command) {

        switch (

            command.intent

        ) {

            case "EXPLAIN":

                return await

                KnowledgeAssistantEngine.ask(

                    command.entities.query

                );

            case "RECOMMEND":

                return await

                RecommendationEngine.recommend(

                    command.entities.query

                );

            case "RELATION":

                return await

                ReasoningEngine.reason(

                    command.entities.query

                );

            case "COMPARE":

                return {

                    message:

                        "Compare Engine will be implemented in a future build."

                };

            default:

                return await

                KnowledgeQueryEngine.query(

                    command.entities.query

                );

        }

    },

    status() {

        return "READY";

    }

};

window.NaturalLanguageEngine =

NaturalLanguageEngine;

Object.freeze(

NaturalLanguageEngine
);
