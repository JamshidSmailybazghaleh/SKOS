/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : API Gateway
 * File      : api-gateway.js
 *
 * Build     : BUILD-000805.1
 * Version   : 1.0.0
 *
 * Mission:
 * Provide controlled communication entry point
 * between external systems and SKOS services.
 *
 * ==========================================================
 */


class ApiGateway {


    constructor(options = {}) {


        this.name =
            "API Gateway";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.routes =
            new Map();


        this.requests =
            [];


        this.history =
            [];


        this.counter =
            0;


        this.options =
            options;

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordHistory(

            "API_GATEWAY_INITIALIZED"

        );


        return true;

    }





    registerRoute(

        path,

        handler

    ) {


        if (!path) {


            throw new Error(

                "Route path required."

            );

        }



        if (
            typeof handler !==
            "function"
        ) {


            throw new Error(

                "Route handler required."

            );

        }



        this.routes.set(

            path,

            handler

        );



        this.recordHistory(

            "ROUTE_REGISTERED",

            {

                path

            }

        );



        return true;

    }





    handleRequest(

        path,

        payload = {}

    ) {


        this.counter++;



        const request = {


            id:

                `REQ-${String(
                    this.counter
                ).padStart(6,"0")}`,


            path,


            payload,


            status:

                "RECEIVED",


            timestamp:

                new Date()

        };



        this.requests.push(

            request

        );



        const handler =
            this.routes.get(

                path

            );



        if (!handler) {


            request.status =
                "FAILED";



            request.error =
                "Route not found.";



            this.recordHistory(

                "REQUEST_FAILED",

                request

            );



            return request;

        }



        const result =
            handler(

                payload

            );



        request.status =
            "COMPLETED";



        request.response =
            result;



        this.recordHistory(

            "REQUEST_COMPLETED",

            request

        );



        return request;

    }





    getRoute(

        path

    ) {


        return this.routes.get(

            path

        );

    }





    getRoutes() {


        return this.routes;

    }





    getRequests() {


        return this.requests;

    }





    getHistory() {


        return this.history;

    }





    getStatistics() {


        return {


            routes:

                this.routes.size,


            requests:

                this.requests.length,


            successful:

                this.requests.filter(

                    request =>
                        request.status ===
                        "COMPLETED"

                ).length,


            failed:

                this.requests.filter(

                    request =>
                        request.status ===
                        "FAILED"

                ).length,


            history:

                this.history.length

        };

    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            routes:

                this.routes.size


        };

    }





    recordHistory(

        event,

        data = {}

    ) {


        this.history.push({

            event,


            data,


            timestamp:

                new Date()

        });

    }





    shutdown() {


        this.status =
            "SHUTDOWN";



        this.recordHistory(

            "API_GATEWAY_SHUTDOWN"

        );


        return true;

    }


}



module.exports =
    ApiGateway;
