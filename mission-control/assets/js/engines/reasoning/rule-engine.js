/*
====================================================
SKOS Mission Control

Rule Engine

File:
rule-engine.js

Operation:
OP-007

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const RuleEngine = {

    initialized: false,

    rules: [],

    async initialize() {

        Logger.info(
            "Rule Engine Initializing..."
        );

        this.rules = [];

        this.registerDefaultRules();

        this.initialized = true;

        Logger.info(
            "Rule Engine Ready."
        );

        return true;

    },

    registerDefaultRules() {

        this.rules.push({

            id: "RULE-001",

            name: "Missing Assets",

            condition(data) {

                return data.assets === 0;

            },

            action(result) {

                result.issues.push(
                    "No registered assets."
                );

                result.recommendations.push(
                    "Register knowledge assets."
                );

            }

        });

        this.rules.push({

            id: "RULE-002",

            name: "No Sales",

            condition(data) {

                return data.sales === 0;

            },

            action(result) {

                result.recommendations.push(
                    "Review publication and revenue strategy."
                );

            }

        });

        this.rules.push({

            id: "RULE-003",

            name: "Low Workflow Activity",

            condition(data) {

                return data.workflows < 10;

            },

            action(result) {

                result.recommendations.push(
                    "Increase workflow automation."
                );

            }

        });

    },

    evaluate(data) {

        Logger.info(
            "Evaluating Rules..."
        );

        const result = {

            issues: [],

            recommendations: []

        };

        for (const rule of this.rules) {

            try {

                if (rule.condition(data)) {

                    rule.action(result);

                }

            }

            catch (error) {

                Logger.error(
                    "Rule Failed : " +
                    rule.id
                );

            }

        }

        Logger.info(
            "Rule Evaluation Completed."
        );

        return result;

    },

    register(rule) {

        if (!rule || !rule.id) {

            Logger.error(
                "Invalid Rule."
            );

            return false;

        }

        this.rules.push(rule);

        Logger.info(
            "Rule Registered : " +
            rule.id
        );

        return true;

    },

    getAll() {

        return this.rules;

    },

    count() {

        return this.rules.length;

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(RuleEngine);
