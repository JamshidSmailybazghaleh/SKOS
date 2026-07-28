/*
====================================================
SKOS Mission Control

Runtime Service

File:
runtime-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const RuntimeService = {


    state: {

        status: "INITIALIZING",

        startedAt: null,

        services: {},

        engines: {},

        session: {},

        context: {}

    },


    async initialize() {


        Logger.info(

            "Runtime Service Initializing..."

        );


        this.state.status =
            "ACTIVE";


        this.state.startedAt =

            new Date()

            .toISOString();


        this.state.session =

            this.createSession();


        return true;

    },


    createSession() {


        return {


            id:

                "SESSION-" +

                Date.now(),


            started:

                new Date()

                .toISOString(),


            user:

                "SYSTEM",


            mode:

                "OPERATING"


        };

    },


    registerService(
        name,
        instance
    ) {


        this.state.services[name] = {


            status:
                "ACTIVE",


            registered:

                new Date()

                .toISOString()


        };


        return true;

    },


    registerEngine(
        name,
        instance
    ) {


        this.state.engines[name] = {


            status:
                "ACTIVE",


            registered:

                new Date()

                .toISOString()


        };


        return true;

    },


    setContext(
        key,
        value
    ) {


        this.state.context[key] =
            value;


    },


    getContext(
        key
    ) {


        return this.state.context[key];

    },


    getState() {


        return this.state;

    },


    getStatus() {


        return {


            status:

                this.state.status,


            uptime:

                this.calculateUptime(),


            services:

                Object.keys(

                    this.state.services

                ).length,


            engines:

                Object.keys(

                    this.state.engines

                ).length


        };


    },


    calculateUptime() {


        if (!this.state.startedAt) {

            return 0;

        }


        const start =

            new Date(

                this.state.startedAt

            );


        return (

            Date.now()

            -

            start.getTime()

        );

    },


    shutdown() {


        this.state.status =
            "STOPPED";


        return true;

    },


    status() {


        return this.state.status;


    }


};


window.RuntimeService =

    RuntimeService;


Object.freeze(
    RuntimeService
);
