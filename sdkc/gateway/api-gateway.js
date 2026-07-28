/*
====================================================
SKOS Mission Control

API Gateway

BUILD-000375

Version : 1.0.0

Status  : ACTIVE
====================================================
*/

class APIGateway {

    constructor() {

        this.version = "1.0.0";

        this.routes = new Map();

        this.middlewares = [];

        this.initialized = false;

    }

    async initialize() {

        Logger.info(
            "Initializing API Gateway..."
        );

        this.registerDefaultRoutes();

        this.initialized = true;

        Logger.info(
            "API Gateway Ready."
        );

        return true;

    }

    registerRoute(endpoint, handler) {

        this.routes.set(endpoint, handler);

    }

    registerMiddleware(handler) {

        this.middlewares.push(handler);

    }

    async handle(request) {

        try {

            await this.validate(request);

            for (const middleware of this.middlewares) {

                await middleware(request);

            }

            const handler = this.routes.get(

                request.endpoint

            );

            if (!handler) {

                throw new Error(

                    "Unknown Endpoint."

                );

            }

            const result = await handler(

                request.payload

            );

            AuditService.record(

                "API_REQUEST",

                {

                    endpoint:
                        request.endpoint,

                    success: true,

                    timestamp:
                        new Date().toISOString()

                }

            );

            return {

                status: "success",

                result

            };

        }

        catch (error) {

            Logger.error(error);

            AuditService.record(

                "API_ERROR",

                {

                    endpoint:
                        request.endpoint,

                    message:
                        error.message

                }

            );

            return {

                status: "error",

                message:
                    error.message

            };

        }

    }

    async validate(request) {

        if (!request) {

            throw new Error(
                "Request Required."
            );

        }

        if (!request.endpoint) {

            throw new Error(
                "Endpoint Required."
            );

        }

        return true;

    }

    registerDefaultRoutes() {

        this.registerRoute(

            "/assistant",

            async payload => {

                return await

                KnowledgeAssistantEngine.ask(

                    payload.question

                );

            }

        );

        this.registerRoute(

            "/query",

            async payload => {

                return await

                KnowledgeQueryEngine.query(

                    payload.query

                );

            }

        );

        this.registerRoute(

            "/reason",

            async payload => {

                return await

                ReasoningEngine.reason(

                    payload.query

                );

            }

        );

        this.registerRoute(

            "/recommend",

            async payload => {

                return await

                RecommendationEngine.recommend(

                    payload.query

                );

            }

        );

        this.registerRoute(

            "/publish",

            async payload => {

                return await

                PublicationEngine.publish(

                    payload.objectId

                );

            }

        );

        this.registerRoute(

            "/library",

            async payload => {

                return await

                DigitalLibraryEngine.search(

                    payload.query

                );

            }

        );

        this.registerRoute(

            "/bookstore",

            async () => {

                return await

                BookstoreEngine.listProducts();

            }

        );

        this.registerRoute(

            "/revenue",

            async () => {

                return await

                RevenueEngine.report();

            }

        );

    }

    listRoutes() {

        return Array.from(

            this.routes.keys()

        );

    }

    status() {

        return {

            initialized:
                this.initialized,

            version:
                this.version,

            routes:
                this.routes.size

        };

    }

}

window.APIGateway =
    new APIGateway();

Object.freeze(
    window.APIGateway
);
