/*
====================================================
SKOS Mission Control

Reasoning History

File:
reasoning-history.js

Operation:
OP-007

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const ReasoningHistory = {

    initialized: false,

    history: [],

    async initialize() {

        Logger.info(
            "Reasoning History Initializing..."
        );

        this.history = [];

        this.initialized = true;

        Logger.info(
            "Reasoning History Ready."
        );

        return true;

    },

    add(record) {

        if (!record) {

            Logger.error(
                "Invalid Reasoning Record."
            );

            return false;

        }

        const historyRecord = {

            historyId:
                this.generateHistoryId(),

            timestamp:
                new Date().toISOString(),

            workflowId:
                record.workflowId || null,

            ruleId:
                record.ruleId || null,

            inferenceId:
                record.inferenceId || null,

            decisionId:
                record.decisionId || null,

            status:
                record.status || "SUCCESS",

            summary:
                record.summary || "",

            metadata:
                record.metadata || {}

        };

        this.history.push(historyRecord);

        Logger.info(
            "Reasoning History Added : " +
            historyRecord.historyId
        );

        return historyRecord;

    },

    get(historyId) {

        return this.history.find(
            item => item.historyId === historyId
        );

    },

    getByWorkflow(workflowId) {

        return this.history.filter(
            item => item.workflowId === workflowId
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
            "Reasoning History Cleared."
        );

    },

    generateHistoryId() {

        return "RSN-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(ReasoningHistory);
