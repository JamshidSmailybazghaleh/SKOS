/*
====================================================
SKOS Mission Control

Task Orchestrator Engine

BUILD-000368

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

const TaskOrchestratorEngine = {

    queue: [],

    running: false,

    async initialize() {

        Logger.info(
            "Task Orchestrator Engine Initializing..."
        );

        return true;

    },

    async submit(task) {

        if (!task || !task.id) {

            throw new Error(
                "Invalid Task."
            );

        }

        this.queue.push(task);

        Logger.info(
            "Task Submitted: " + task.id
        );

        return task.id;

    },

    async execute() {

        if (this.running) {

            return;

        }

        this.running = true;

        while (this.queue.length > 0) {

            const task = this.queue.shift();

            await this.executeTask(task);

        }

        this.running = false;

    },

    async executeTask(task) {

        Logger.info(
            "Executing Task: " + task.id
        );

        try {

            for (const step of task.steps) {

                await this.dispatch(step);

            }

            AuditService.record(

                "TASK_COMPLETED",

                task

            );

        }

        catch (error) {

            Logger.error(error);

            AuditService.record(

                "TASK_FAILED",

                {

                    id: task.id,

                    error: error.message

                }

            );

        }

    },

    async dispatch(step) {

        switch (step.engine) {

            case "RepositoryEngine":

                return await RepositoryEngine.execute(step);

            case "ReasoningEngine":

                return await ReasoningEngine.reason(
                    step.query
                );

            case "RecommendationEngine":

                return await RecommendationEngine.recommend(
                    step.query
                );

            case "KnowledgeAssistantEngine":

                return await KnowledgeAssistantEngine.ask(
                    step.query
                );

            default:

                Logger.warn(

                    "Unknown Engine: " +

                    step.engine

                );

        }

    },

    queueSize() {

        return this.queue.length;

    },

    status() {

        return {

            running: this.running,

            queue: this.queue.length

        };

    }

};

window.TaskOrchestratorEngine =
    TaskOrchestratorEngine;

Object.freeze(
    TaskOrchestratorEngine
);
