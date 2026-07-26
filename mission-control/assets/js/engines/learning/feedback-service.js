/*
====================================================
SKOS Mission Control

Feedback Service

File:
feedback-service.js

Operation:
OP-009

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const FeedbackService = {

    initialized: false,

    feedbacks: [],

    async initialize() {

        Logger.info(
            "Feedback Service Initializing..."
        );

        this.feedbacks = [];

        this.initialized = true;

        Logger.info(
            "Feedback Service Ready."
        );

        return true;

    },

    submit(feedback = {}) {

        if (!feedback.source) {

            Logger.error(
                "Feedback source is required."
            );

            return null;

        }

        const record = {

            feedbackId:
                this.generateFeedbackId(),

            timestamp:
                new Date().toISOString(),

            source:
                feedback.source,

            category:
                feedback.category || "GENERAL",

            message:
                feedback.message || "",

            rating:
                feedback.rating || null,

            metadata:
                feedback.metadata || {}

        };

        this.feedbacks.push(record);

        Logger.info(
            "Feedback Registered : " +
            record.feedbackId
        );

        return record;

    },

    get(feedbackId) {

        return this.feedbacks.find(
            item => item.feedbackId === feedbackId
        );

    },

    getAll() {

        return this.feedbacks;

    },

    count() {

        return this.feedbacks.length;

    },

    clear() {

        this.feedbacks = [];

        Logger.info(
            "Feedback History Cleared."
        );

    },

    generateFeedbackId() {

        return "FDB-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(FeedbackService);
