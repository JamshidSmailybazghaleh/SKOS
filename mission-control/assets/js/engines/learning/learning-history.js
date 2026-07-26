/*
====================================================
SKOS Mission Control

Learning History

File:
learning-history.js

Operation:
OP-009

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const LearningHistory = {

    initialized: false,

    history: [],

    async initialize() {

        Logger.info(
            "Learning History Initializing..."
        );

        this.history = [];

        this.initialized = true;

        Logger.info(
            "Learning History Ready."
        );

        return true;

    },

    add(record) {

        if (!record) {

            Logger.error(
                "Invalid Learning Record."
            );

            return false;

        }

        const historyRecord = {

            learningId:
                this.generateLearningId(),

            timestamp:
                new Date().toISOString(),

            experienceId:
                record.experienceId || null,

            workflowId:
                record.workflowId || null,

            patternCount:
                record.patternCount || 0,

            improvementCount:
                record.improvementCount || 0,

            status:
                record.status || "COMPLETED",

            metadata:
                record.metadata || {}

        };

        this.history.push(historyRecord);

        Logger.info(
            "Learning History Added : " +
            historyRecord.learningId
        );

        return historyRecord;

    },

    get(learningId) {

        return this.history.find(
            item => item.learningId === learningId
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
            "Learning History Cleared."
        );

    },

    generateLearningId() {

        return "LRN-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(LearningHistory);
