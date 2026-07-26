/*
====================================================
SKOS Mission Control

Approval Service

File:
approval-service.js

Operation:
OP-008

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const ApprovalService = {

    initialized: false,

    async initialize() {

        Logger.info(
            "Approval Service Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Approval Service Ready."
        );

        return true;

    },

    async request(plan) {

        if (!plan) {

            Logger.error(
                "Invalid Execution Plan."
            );

            return {
                approved: false,
                reason: "INVALID_PLAN"
            };

        }

        Logger.info(
            "Approval Request : " +
            plan.planId
        );

        return {
            approved: true,
            approvedAt: new Date().toISOString(),
            approver: "SYSTEM",
            planId: plan.planId
        };

    },

    async approve(plan) {

        Logger.info(
            "Plan Approved : " +
            plan.planId
        );

        return true;

    },

    async reject(plan, reason = "REJECTED") {

        Logger.warn(
            "Plan Rejected : " +
            plan.planId
        );

        return {
            approved: false,
            reason: reason
        };

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(ApprovalService);
