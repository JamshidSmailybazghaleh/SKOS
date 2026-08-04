/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Alert Manager
 * File      : alert-manager.js
 *
 * Build     : BUILD-000801.1
 * Version   : 2.0.0
 *
 * Mission:
 * Manage operational alerts,
 * severity classification,
 * lifecycle management,
 * and notification readiness.
 *
 * ==========================================================
 */


class AlertManager {


    constructor(options = {}) {


        this.name =
            "Alert Manager";


        this.version =
            "2.0.0";


        this.status =
            "CREATED";


        this.alerts =
            [];


        this.rules =
            new Map();


        this.history =
            [];


        this.events =
            [];


        this.counter =
            0;


        this.options =
            options;

    }




    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(
            "ALERT_MANAGER_INITIALIZED"
        );


        return true;

    }




    execute(context = {}) {


        if (
            context.component &&
            context.state
        ) {


            if (
                context.state !==
                "HEALTHY"
            ) {


                this.createAlert(

                    this.resolveSeverity(
                        context.state
                    ),

                    `Component ${context.component} unhealthy`,

                    {

                        component:
                            context.component,

                        state:
                            context.state

                    }

                );

            }


        }


        this.status =
            "READY";


        this.recordEvent(
            "ALERT_RUNTIME_EXECUTED"
        );


        return this.getStatistics();

    }




    resolveSeverity(state) {


        switch(state) {


            case "FAILED":

                return "CRITICAL";


            case "WARNING":

                return "WARNING";


            case "ERROR":

                return "ERROR";


            default:

                return "INFO";

        }


    }




    registerRule(

        ruleId,

        rule = {}

    ) {


        if (!ruleId) {


            throw new Error(
                "Rule id required."
            );

        }



        const record = {


            id:
                ruleId,


            condition:
                rule.condition || null,


            severity:
                rule.severity || "WARNING",


            enabled:
                true,


            createdAt:
                new Date()

        };



        this.rules.set(

            ruleId,

            record

        );



        this.recordEvent(

            "RULE_REGISTERED",

            record

        );


        return record;

    }





    disableRule(ruleId) {


        const rule =
            this.rules.get(
                ruleId
            );


        if (!rule) {

            return false;

        }


        rule.enabled =
            false;


        return true;

    }





    createAlert(

        severity,

        message,

        metadata = {}

    ) {


        this.counter++;


        const alert = {


            id:

                `ALERT-${String(this.counter)
                .padStart(6,"0")}`,


            severity:

                severity || "INFO",


            message,


            metadata,


            status:

                "OPEN",


            createdAt:

                new Date(),


            resolvedAt:

                null,


            acknowledgedAt:

                null

        };



        this.alerts.push(
            alert
        );



        this.recordEvent(

            "ALERT_CREATED",

            alert

        );



        return alert;

    }





    acknowledgeAlert(alertId) {


        const alert =
            this.getAlert(
                alertId
            );


        if (!alert) {


            throw new Error(
                "Alert not found."
            );

        }


        alert.status =
            "ACKNOWLEDGED";


        alert.acknowledgedAt =
            new Date();


        this.recordEvent(

            "ALERT_ACKNOWLEDGED",

            alert

        );


        return alert;

    }





    resolveAlert(alertId) {


        const alert =
            this.getAlert(
                alertId
            );



        if (!alert) {


            throw new Error(
                "Alert not found."
            );

        }



        alert.status =
            "RESOLVED";


        alert.resolvedAt =
            new Date();



        this.recordEvent(

            "ALERT_RESOLVED",

            alert

        );



        return alert;

    }





    getAlert(alertId) {


        return this.alerts.find(

            item =>
                item.id === alertId

        );

    }





    getAlerts() {


        return this.alerts;

    }





    getOpenAlerts() {


        return this.alerts.filter(

            alert =>
                alert.status === "OPEN"

        );

    }





    getResolvedAlerts() {


        return this.alerts.filter(

            alert =>
                alert.status === "RESOLVED"

        );

    }





    getBySeverity(severity) {


        return this.alerts.filter(

            alert =>
                alert.severity === severity

        );

    }





    evaluateRule(

        ruleId,

        value

    ) {


        const rule =
            this.rules.get(
                ruleId
            );


        if (!rule) {


            throw new Error(
                "Rule not found."
            );

        }



        return {


            ruleId,


            triggered:
                Boolean(value),


            severity:
                rule.severity


        };

    }





    getStatistics() {


        return {


            totalAlerts:
                this.alerts.length,


            openAlerts:
                this.getOpenAlerts()
                .length,


            acknowledgedAlerts:

                this.alerts.filter(

                    alert =>
                        alert.status ===
                        "ACKNOWLEDGED"

                ).length,


            resolvedAlerts:
                this.getResolvedAlerts()
                .length,


            rules:
                this.rules.size,


            events:
                this.events.length


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


            alerts:
                this.alerts.length


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





    recordEvent(

        event,

        data = {}

    ) {


        this.events.push({

            event,

            data,

            timestamp:
                new Date()

        });


        this.recordHistory(
            event,
            data
        );

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "ALERT_MANAGER_SHUTDOWN"

        );


        return true;

    }


}


module.exports =
    AlertManager;
