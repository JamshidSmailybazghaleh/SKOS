/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Alert Manager
 * File      : alert-manager.js
 *
 * Build     : BUILD-000443
 * Version   : 1.0.0
 *
 * Mission:
 * Manage alerts, severity classification,
 * alert lifecycle and notification readiness.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class AlertManager {


    constructor(options = {}) {


        this.name =
            "Alert Manager";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.alerts =
            [];


        this.rules =
            new Map();


        this.history =
            [];


        this.options =
            options;

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordHistory(

            "ALERT_MANAGER_INITIALIZED"

        );


        return true;

    }





    registerRule(

        ruleId,

        rule

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



        return record;

    }





    createAlert(

        severity,

        message,

        metadata = {}

    ) {


        const alert = {


            id:

                `ALERT-${Date.now()}`,


            severity:

                severity || "INFO",


            message,


            metadata,


            status:

                "OPEN",


            createdAt:

                new Date(),


            resolvedAt:

                null

        };



        this.alerts.push(

            alert

        );



        this.recordHistory(

            "ALERT_CREATED",

            alert

        );



        return alert;

    }





    resolveAlert(

        alertId

    ) {


        const alert =

            this.alerts.find(

                item =>

                    item.id === alertId

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



        this.recordHistory(

            "ALERT_RESOLVED",

            alert

        );



        return alert;

    }





    getAlert(

        alertId

    ) {


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





    getBySeverity(

        severity

    ) {


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


            resolvedAlerts:

                this.getResolvedAlerts()

                    .length,


            rules:

                this.rules.size

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


        this.history.push(

            {

                event,


                data,


                timestamp:

                    new Date()

            }

        );

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordHistory(

            "ALERT_MANAGER_SHUTDOWN"

        );


        return true;

    }

}


module.exports =
    AlertManager;
