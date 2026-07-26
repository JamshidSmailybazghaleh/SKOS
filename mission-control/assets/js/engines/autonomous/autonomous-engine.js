/*
====================================================
SKOS Mission Control

Autonomous Engine

File:
autonomous-engine.js

Operation:
OP-008

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AutonomousEngine = {

    version: "1.0",

    initialized: false,

    async initialize() {

        Logger.info(
            "Autonomous Engine Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Autonomous Engine Ready."
        );

        return true;

    },

    async execute(context = {}) {

        Logger.info(
            "Autonomous Execution Started..."
        );

        const reasoningResult =
            await ReasoningEngine.process(context);

        const decision =
            await DecisionService.decide(
                reasoningResult
            );

        const executionPlan =
            await AutonomousService.prepare(
                decision
            );

        Logger.info(
            "Autonomous Execution Prepared."
        );

        return executionPlan;

    },

    async approve(plan) {

        Logger.info(
            "Approval Requested..."
        );

        return ApprovalService.request(
            plan
        );

    },

    async run(plan) {

        Logger.info(
            "Executing Approved Plan..."
        );

        return ExecutionManager.execute(
            plan
        );

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(AutonomousEngine);
