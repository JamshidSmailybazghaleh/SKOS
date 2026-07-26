/*
====================================================
SKOS Mission Control

Adaptive Rules

File:
adaptive-rules.js

Operation:
OP-009

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AdaptiveRules = {

    initialized: false,

    rules: [],

    async initialize() {

        Logger.info(
            "Adaptive Rules Initializing..."
        );

        this.rules = [];

        this.initialized = true;

        Logger.info(
            "Adaptive Rules Ready."
        );

        return true;

    },

    register(rule) {

        if (!rule || !rule.id) {

            Logger.error(
                "Invalid Adaptive Rule."
            );

            return false;

        }

        this.rules.push(rule);

        Logger.info(
            "Adaptive Rule Registered : " +
            rule.id
        );

        return true;

    },

    apply(patterns = []) {

        Logger.info(
            "Applying Adaptive Rules..."
        );

        const updates = [];

        for (const rule of this.rules) {

            try {

                if (rule.condition(patterns)) {

                    updates.push(
                        rule.action(patterns)
                    );

                }

            }

            catch (error) {

                Logger.error(
                    "Adaptive Rule Failed : " +
                    rule.id
                );

            }

        }

        Logger.info(
            "Adaptive Rules Completed."
        );

        return updates;

    },

    getAll() {

        return this.rules;

    },

    count() {

        return this.rules.length;

    },

    clear() {

        this.rules = [];

        Logger.info(
            "Adaptive Rules Cleared."
        );

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(AdaptiveRules);
