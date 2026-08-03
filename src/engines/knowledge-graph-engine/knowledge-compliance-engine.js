/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-compliance-engine.js
 *
 * Build       : BUILD-000406
 * Version     : 1.0.0
 *
 * Mission:
 * Validate Knowledge Objects against
 * governance standards, policies and rules.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeComplianceEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Compliance Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.rules =
            new Map();


        this.reports =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_COMPLIANCE_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Add compliance rule
     */


    addRule(

        ruleId,

        rule

    ) {


        if (

            !ruleId

        ) {


            throw new Error(

                "Compliance rule id required."

            );

        }



        const record = {


            id:

                ruleId,


            name:

                rule.name || "Unnamed Rule",


            category:

                rule.category || "GENERAL",


            condition:

                rule.condition || {},


            severity:

                rule.severity || "MEDIUM",


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

            "COMPLIANCE_RULE_CREATED",

            {

                ruleId

            }

        );



        return record;

    }





    /**
     * Remove rule
     */


    removeRule(

        ruleId

    ) {


        return this.rules.delete(

            ruleId

        );

    }





    /**
     * Get rule
     */


    getRule(

        ruleId

    ) {


        return (

            this.rules.get(

                ruleId

            )

            ||

            null

        );

    }





    /**
     * Execute compliance check
     */


    check(

        objectId,

        context = {}

    ) {


        if (

            !objectId

        ) {


            throw new Error(

                "Knowledge Object id required."

            );

        }



        const violations =

            [];



        this.rules.forEach(

            rule => {


                if (

                    rule.enabled &&

                    !this.evaluateRule(

                        rule.condition,

                        context

                    )

                ) {


                    violations.push(

                        {

                            ruleId:

                                rule.id,


                            severity:

                                rule.severity,


                            message:

                                rule.name

                        }

                    );

                }


            }

        );



        const compliant =

            violations.length === 0;



        const report = {


            objectId,


            compliant,


            violations,


            checkedAt:

                new Date()

        };



        this.reports.push(

            report

        );



        this.recordEvent(

            "COMPLIANCE_CHECK_COMPLETED",

            {

                objectId,


                compliant

            }

        );



        this.updateMetric(

            "complianceChecks"

        );



        return report;

    }





    /**
     * Evaluate compliance condition
     */


    evaluateRule(

        condition,

        context

    ) {


        const keys =

            Object.keys(

                condition

            );



        if (

            keys.length === 0

        ) {


            return true;

        }



        return keys.every(

            key =>

                context[key] === condition[key]

        );

    }





    /**
     * Enable rule
     */


    enableRule(

        ruleId

    ) {


        const rule =

            this.getRule(

                ruleId

            );



        if (

            rule

        ) {


            rule.enabled = true;

        }



        return rule;

    }





    /**
     * Disable rule
     */


    disableRule(

        ruleId

    ) {


        const rule =

            this.getRule(

                ruleId

            );



        if (

            rule

        ) {


            rule.enabled = false;

        }



        return rule;

    }





    /**
     * Get compliance reports
     */


    getReports() {


        return this.reports;

    }





    /**
     * Get rules registry
     */


    getRegistry() {


        return Array.from(

            this.rules.values()

        );

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            rules:

                this.rules.size,


            reports:

                this.reports.length,


            compliant:

                this.reports.filter(

                    item =>

                        item.compliant

                ).length,


            violations:

                this.reports.filter(

                    item =>

                        !item.compliant

                ).length


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


            rules:

                this.rules.size,


            reports:

                this.reports.length


        };

    }





    recordEvent(

        event,

        metadata = {}

    ) {


        if (

            this.monitoring

        ) {


            this.monitoring.recordEvent(

                event,

                metadata

            );

        }

    }





    updateMetric(

        metric

    ) {


        if (

            this.monitoring

        ) {


            this.monitoring.updateMetric(

                metric

            );

        }

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "KNOWLEDGE_COMPLIANCE_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeComplianceEngine;
