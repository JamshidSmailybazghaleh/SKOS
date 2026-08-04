/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Health Monitor
 * File      : health-monitor.js
 *
 * Build     : BUILD-000800.8
 * Version   : 2.0.0
 *
 * Mission:
 * Monitor operational health of SKOS components
 * and provide unified runtime health reports.
 *
 * ==========================================================
 */


class HealthMonitor {


    constructor(options = {}) {


        this.name =
            "Health Monitor";


        this.version =
            "2.0.0";


        this.status =
            "CREATED";


        this.components =
            new Map();


        this.history =
            [];


        this.events =
            [];


        this.options =
            options;


    }



    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(
            "HEALTH_MONITOR_INITIALIZED"
        );


        return true;

    }




    execute(context = {}) {


        if (context.components) {


            for (
                const component of context.components
            ) {


                this.updateHealth(

                    component.id,

                    component.state,

                    component.details || {}

                );


            }

        }


        this.status =
            "READY";


        this.recordEvent(
            "HEALTH_CHECK_COMPLETED"
        );


        return this.generateReport();

    }




    registerComponent(

        componentId,

        metadata = {}

    ) {


        if (!componentId) {


            throw new Error(
                "Component id required."
            );

        }



        this.components.set(

            componentId,

            {


                id:
                    componentId,


                name:
                    metadata.name ||
                    componentId,


                state:
                    "UNKNOWN",


                severity:
                    "INFO",


                lastCheck:
                    null,


                uptime:
                    0,


                details:
                    {}


            }

        );


        this.recordEvent(

            "COMPONENT_REGISTERED",

            {
                componentId
            }

        );


        return true;

    }




    updateHealth(

        componentId,

        state,

        details = {}

    ) {


        const component =
            this.components.get(
                componentId
            );



        if (!component) {


            throw new Error(
                "Component not registered."
            );

        }



        component.state =
            state;



        component.severity =
            this.resolveSeverity(
                state
            );



        component.details =
            details;



        component.lastCheck =
            new Date();



        this.history.push({

            componentId,

            state,

            timestamp:
                component.lastCheck

        });



        return component;

    }




    resolveSeverity(state) {


        switch(state) {


            case "HEALTHY":

                return "INFO";


            case "WARNING":

                return "WARNING";


            case "FAILED":

                return "CRITICAL";


            default:

                return "UNKNOWN";


        }


    }





    incrementUptime(

        componentId,

        milliseconds

    ) {


        const component =
            this.components.get(
                componentId
            );



        if (!component) {

            return false;

        }



        component.uptime +=
            milliseconds;


        return true;

    }




    getHealthScore() {


        const total =
            this.components.size;



        if (total === 0) {

            return 0;

        }



        const healthy =

            this.getHealthyComponents()
            .length;



        return Math.round(

            (healthy / total) * 100

        );

    }





    getComponentHealth(
        componentId
    ) {


        return this.components.get(
            componentId
        );

    }





    getAllHealth() {


        return Array.from(

            this.components.values()

        );


    }





    getHealthyComponents() {


        return this.getAllHealth()

            .filter(

                component =>

                    component.state ===
                    "HEALTHY"

            );


    }





    getUnhealthyComponents() {


        return this.getAllHealth()

            .filter(

                component =>

                    component.state !==
                    "HEALTHY"

            );


    }





    generateReport() {


        return {


            timestamp:
                new Date(),


            healthScore:
                this.getHealthScore(),


            total:
                this.components.size,


            healthy:
                this.getHealthyComponents()
                    .length,


            unhealthy:
                this.getUnhealthyComponents()
                    .length,


            components:
                this.getAllHealth()


        };


    }




    recordEvent(

        type,

        data = {}

    ) {


        this.events.push({

            type,

            data,

            timestamp:
                new Date()

        });


    }




    getEvents() {


        return this.events;


    }





    getStatistics() {


        return {


            registeredComponents:
                this.components.size,


            healthChecks:
                this.history.length,


            events:
                this.events.length,


            healthScore:
                this.getHealthScore()


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


            components:
                this.components.size,


            healthScore:
                this.getHealthScore()


        };


    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(
            "HEALTH_MONITOR_SHUTDOWN"
        );


        return true;

    }


}


module.exports =
    HealthMonitor;
