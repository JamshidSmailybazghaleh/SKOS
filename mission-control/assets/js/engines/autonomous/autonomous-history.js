/*
====================================================
SKOS Mission Control

Autonomous History

File:
autonomous-history.js

Operation:
OP-008

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AutonomousHistory = {

    initialized: false,

    history: [],

    async initialize() {

        Logger.info(
            "Autonomous History Initializing..."
        );

        this.history = [];

        this.initialized = true;

        Logger.info(
            "Autonomous History Ready."
        );

        return true;

    },

    add(record) {

        if (!record) {

            Logger.error(
                "Invalid Autonomous Record."
            );

            return false;

        }

        const historyRecord = {

            historyId:
                this.generateHistoryId(),

            timestamp:
                new Date().toISOString(),

            planId:
                record.planId || null,

            decisionId:
                record.decisionId || null,

            workflowId:
                record.workflowId || null,

            status:
                record.status || "UNKNOWN",

            executedActions:
                record.executedActions || 0,

            failedActions:
                record.failedActions || 0,

            duration:
                record.duration || 0,

            metadata:
                record.metadata || {}

        };

        this.history.push(historyRecord);

        Logger.info(
            "Autonomous History Added : " +
            historyRecord.historyId
        );

        return historyRecord;

    },

    get(historyId) {

        return this.history.find(
            item => item.historyId === historyId
        );

    },

    getAll() {

        return this.history;

    },

    count() {

        return this.history.length;

    },

    clear() {

        this.history = [];

        Logger.info(
            "Autonomous History Cleared."
        );

    },

    generateHistoryId() {

        return "ATH-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(AutonomousHistory);
