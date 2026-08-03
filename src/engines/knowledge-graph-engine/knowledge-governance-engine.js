/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-governance-engine.js
 *
 * Build       : BUILD-000429
 * Version     : 1.0.0
 *
 * Mission:
 * Manage governance rules, ownership, lifecycle,
 * stewardship and decision authority of knowledge assets.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeGovernanceEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Governance Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.governanceRecords =
            new Map();


        this.policies =
            new Map();


        this.decisions =
            [];


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_GOVERNANCE_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Register governance record
     */


    registerGovernance(

        knowledgeId,

        data = {}

    ) {


        if (

            !knowledgeId

        ) {


            throw new Error(

                "Knowledge id required."

            );

        }



        const record = {


            knowledgeId,


            owner:

                data.owner || null,


            steward:

                data.steward || null,


            classification:

                data.classification || "PUBLIC",


            lifecycle:

                data.lifecycle || "ACTIVE",


            reviewCycle:

                data.reviewCycle || "STANDARD",


            status:

                "GOVERNED",


            createdAt:

                new Date()

        };



        this.governanceRecords.set(

            knowledgeId,

            record

        );



        this.addHistory(

            "GOVERNANCE_REGISTERED",

            record

        );



        return record;

    }





    /**
     * Create governance policy
     */


    createPolicy(

        policyId,

        policy

    ) {


        if (

            !policyId

        ) {


            throw new Error(

                "Governance policy id required."

            );

        }



        const record = {


            id:

                policyId,


            name:

                policy.name || "Unnamed Policy",


            rules:

                policy.rules || [],


            enabled:

                true,


            createdAt:

                new Date()

        };



        this.policies.set(

            policyId,

            record

        );



        this.addHistory(

            "GOVERNANCE_POLICY_CREATED",

            {

                policyId

            }

        );



        return record;

    }





    /**
     * Assign knowledge owner
     */


    assignOwner(

        knowledgeId,

        owner

    ) {


        const record =

            this.governanceRecords.get(

                knowledgeId

            );



        if (

            record

        ) {


            record.owner =

                owner;

        }



        this.addHistory(

            "KNOWLEDGE_OWNER_ASSIGNED",

            {

                knowledgeId,

                owner

            }

        );



        return record;

    }





    /**
     * Assign steward
     */


    assignSteward(

        knowledgeId,

        steward

    ) {


        const record =

            this.governanceRecords.get(

                knowledgeId

            );



        if (

            record

        ) {


            record.steward =

                steward;

        }



        this.addHistory(

            "KNOWLEDGE_STEWARD_ASSIGNED",

            {

                knowledgeId,

                steward

            }

        );



        return record;

    }





    /**
     * Update lifecycle state
     */


    updateLifecycle(

        knowledgeId,

        lifecycle

    ) {


        const record =

            this.governanceRecords.get(

                knowledgeId

            );



        if (

            record

        ) {


            record.lifecycle =

                lifecycle;

        }



        this.addHistory(

            "LIFECYCLE_UPDATED",

            {

                knowledgeId,

                lifecycle

            }

        );



        return record;

    }





    /**
     * Make governance decision
     */


    recordDecision(

        decision

    ) {


        const record = {


            id:

                decision.id || crypto.randomUUID(),


            knowledgeId:

                decision.knowledgeId,


            actor:

                decision.actor,


            action:

                decision.action,


            reason:

                decision.reason || null,


            timestamp:

                new Date()

        };



        this.decisions.push(

            record

        );



        this.addHistory(

            "GOVERNANCE_DECISION_RECORDED",

            record

        );



        return record;

    }





    getGovernance(

        knowledgeId

    ) {


        return this.governanceRecords.get(

            knowledgeId

        );

    }





    getRecords() {


        return Array.from(

            this.governanceRecords.values()

        );

    }





    getPolicies() {


        return Array.from(

            this.policies.values()

        );

    }





    getDecisions() {


        return this.decisions;

    }





    /**
     * Statistics
     */


    getStatistics() {


        const records =

            this.getRecords();



        return {


            governedObjects:

                records.length,


            policies:

                this.policies.size,


            decisions:

                this.decisions.length,


            active:

                records.filter(

                    item =>

                        item.status === "GOVERNED"

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


            records:

                this.governanceRecords.size,


            policies:

                this.policies.size,


            decisions:

                this.decisions.length


        };

    }





    addHistory(

        event,

        data = {}

    ) {


        const record = {


            event,


            data,


            timestamp:

                new Date()

        };



        this.history.push(

            record

        );



        this.recordEvent(

            event,

            data

        );

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

            "KNOWLEDGE_GOVERNANCE_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeGovernanceEngine;
