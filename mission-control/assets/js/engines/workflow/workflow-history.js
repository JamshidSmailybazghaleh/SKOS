/*
====================================================
SKOS Mission Control

Workflow History

File:
workflow-history.js

Operation:
OP-005

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const WorkflowHistory = {

    initialized: false,

    history: [],

    async initialize() {

        Logger.info(
            "Workflow History Initializing..."
        );

        this.history = [];

        this.initialized = true;

        Logger.info(
            "Workflow History Ready."
        );

        return true;

    },

    add(workflowId, step, status, details = "") {

        const record = {

            historyId: this.generateHistoryId(),

            workflowId: workflowId,

            step: step,

            status: status,

            details: details,

            timestamp: new Date().toISOString()

        };

        this.history.push(record);

        Logger.info(
            "Workflow History Added : " +
            record.historyId
        );

        return record;

    },

    get(historyId) {

        return this.history.find(
            record => record.historyId === historyId
        );

    },

    getByWorkflow(workflowId) {

        return this.history.filter(
            record => record.workflowId === workflowId
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
            "Workflow History Cleared."
        );

    },

    generateHistoryId() {

        return "WFH-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(WorkflowHistory);
