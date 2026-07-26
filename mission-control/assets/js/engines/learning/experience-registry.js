/*
====================================================
SKOS Mission Control

Experience Registry

File:
experience-registry.js

Operation:
OP-009

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const ExperienceRegistry = {

    initialized: false,

    experiences: [],

    async initialize() {

        Logger.info(
            "Experience Registry Initializing..."
        );

        this.experiences = [];

        this.initialized = true;

        Logger.info(
            "Experience Registry Ready."
        );

        return true;

    },

    async collect(data = {}) {

        const experience = {

            experienceId:
                this.generateExperienceId(),

            timestamp:
                new Date().toISOString(),

            workflowId:
                data.workflowId || null,

            decisionId:
                data.decisionId || null,

            executedActions:
                data.executedActions || 0,

            failedActions:
                data.failedActions || 0,

            status:
                data.status || "UNKNOWN",

            metadata:
                data.metadata || {}

        };

        this.experiences.push(experience);

        Logger.info(
            "Experience Registered : " +
            experience.experienceId
        );

        return experience;

    },

    get(experienceId) {

        return this.experiences.find(
            item =>
                item.experienceId === experienceId
        );

    },

    getAll() {

        return this.experiences;

    },

    count() {

        return this.experiences.length;

    },

    clear() {

        this.experiences = [];

        Logger.info(
            "Experience Registry Cleared."
        );

    },

    generateExperienceId() {

        return "EXP-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(ExperienceRegistry);
