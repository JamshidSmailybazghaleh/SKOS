/*
====================================================
SKOS Mission Control

Pattern Detector

File:
pattern-detector.js

Operation:
OP-009

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const PatternDetector = {

    initialized: false,

    async initialize() {

        Logger.info(
            "Pattern Detector Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Pattern Detector Ready."
        );

        return true;

    },

    async detect(experiences) {

        Logger.info(
            "Pattern Detection Started..."
        );

        const patterns = [];

        if (
            !Array.isArray(experiences) ||
            experiences.length === 0
        ) {

            return patterns;

        }

        const total =
            experiences.length;

        const failures =
            experiences.filter(
                item =>
                    item.status === "FAILED"
            ).length;

        const successes =
            experiences.filter(
                item =>
                    item.status === "SUCCESS"
            ).length;

        if (failures > 0) {

            patterns.push({

                id: "PATTERN-001",

                type: "FAILURE",

                description:
                    "Repeated execution failures detected.",

                occurrences:
                    failures

            });

        }

        if (successes === total) {

            patterns.push({

                id: "PATTERN-002",

                type: "SUCCESS",

                description:
                    "All recorded executions completed successfully.",

                occurrences:
                    successes

            });

        }

        const heavyExecution =
            experiences.filter(
                item =>
                    item.executedActions >= 10
            ).length;

        if (heavyExecution > 0) {

            patterns.push({

                id: "PATTERN-003",

                type: "WORKLOAD",

                description:
                    "High execution workload detected.",

                occurrences:
                    heavyExecution

            });

        }

        Logger.info(
            "Pattern Detection Completed."
        );

        return patterns;

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(PatternDetector);
