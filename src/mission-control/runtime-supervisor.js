/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Runtime Supervisor
 * File      : runtime-supervisor.js
 *
 * Build     : BUILD-000902.1
 * Version   : 1.0.0
 *
 * Mission:
 * Supervise running SKOS runtime,
 * health state and recovery lifecycle.
 *
 * ==========================================================
 */


class RuntimeSupervisor {


    constructor(options = {}) {


        this.name =
            "SKOS Runtime Supervisor";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.options =
            options;


        this.bootManager =
            null;


        this.monitors =
            [];


        this.components =
            new Map();


        this.history =
            [];


        this.startedAt =
            null;


        this.failures =
            0;


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.record(

            "SUPERVISOR_INITIALIZED"

        );


        return true;

    }





    attachBootManager(

        manager

    ) {


        if (!manager) {


            throw new Error(

                "Boot manager required."

            );

        }


        this.bootManager =
            manager;


        return true;

    }





    attachMonitor(

        monitor

    ) {


        if (!monitor) {


            throw new Error(

                "Monitor required."

            );

        }


        this.monitors.push(

            monitor

        );


        return true;

    }





    registerComponent(

        id,

        component

    ) {


        if (!id) {


            throw new Error(

                "Component id required."

            );

        }


        this.components.set(

            id,

            {

                component,

                status:
                    "REGISTERED"

            }

        );


        return true;

    }





    async start() {


        this.status =
            "RUNNING";


        this.startedAt =
            new Date();


        this.record(

            "SUPERVISOR_STARTED"

        );


        return true;

    }





    async checkHealth() {


        const results = [];



        for (

            const monitor

            of

            this.monitors

        ) {


            if (

                typeof monitor.health ===

                "function"

            ) {


                results.push({

                    monitor:
                        monitor.name,


                    status:
                        await monitor.health()

                });

            }

        }



        return results;

    }





    async supervise() {


        const health =

            await this.checkHealth();



        const failed =

            health.filter(

                item =>

                    item.status !==
                    "HEALTHY"

            );



        if (

            failed.length > 0

        ) {


            this.failures++;


            this.status =
                "WARNING";



            this.record({

                event:
                    "FAILURE_DETECTED",

                count:
                    failed.length

            });


        }

        else {


            this.status =
                "HEALTHY";

        }



        return {


            status:
                this.status,


            failures:
                this.failures,


            health

        };

    }





    async recover() {


        this.status =
            "RECOVERING";



        this.record(

            "RECOVERY_STARTED"

        );



        if (

            this.bootManager &&

            typeof this.bootManager.restart ===
            "function"

        ) {


            await this.bootManager.restart();

        }



        this.status =
            "HEALTHY";


        this.record(

            "RECOVERY_COMPLETED"

        );


        return true;

    }





    async stop() {


        this.status =
            "STOPPING";


        this.record(

            "SUPERVISOR_STOPPING"

        );



        this.status =
            "STOPPED";


        return true;

    }





    getRuntimeState() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            components:

                this.components.size,


            monitors:

                this.monitors.length,


            failures:

                this.failures,


            startedAt:

                this.startedAt

        };

    }





    getHistory() {


        return this.history;

    }





    record(event) {


        this.history.push({

            event,


            timestamp:

                new Date()

        });

    }





    async shutdown() {


        this.status =
            "SHUTDOWN";


        this.record(

            "SUPERVISOR_SHUTDOWN"

        );


        return true;

    }

}


module.exports =
RuntimeSupervisor;
