/*
====================================================
SKOS Mission Control

Analytics History

File:
analytics-history.js

Operation:
OP-006

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AnalyticsHistory = {

    initialized: false,

    history: [],

    async initialize() {

        Logger.info(
            "Analytics History Initializing..."
        );

        this.history = [];

        this.initialized = true;

        Logger.info(
            "Analytics History Ready."
        );

        return true;

    },

    add(record) {

        if (!record) {

            Logger.error(
                "Invalid Analytics Record."
            );

            return false;

        }

        const historyRecord = {

            historyId:
                this.generateHistoryId(),

            timestamp:
                new Date().toISOString(),

            reportType:
                record.reportType || "SUMMARY",

            workflowId:
                record.workflowId || null,

            assets:
                record.assets || 0,

            products:
                record.products || 0,

            publications:
                record.publications || 0,

            sales:
                record.sales || 0,

            successRate:
                record.successRate || 0,

            metadata:
                record.metadata || {}

        };

        this.history.push(historyRecord);

        Logger.info(
            "Analytics History Added : " +
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
            "Analytics History Cleared."
        );

    },

    generateHistoryId() {

        return "ANH-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(AnalyticsHistory);
