/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Progress Monitor
 * ------------------------------------------------------------
 * File      : progress-monitor.js
 * Operation : OP-017
 * Build     : BUILD-000394
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Monitors execution progress across projects,
 * workflows and tasks, providing real-time
 * operational visibility.
 *
 * Responsibilities:
 * - Monitor execution progress
 * - Calculate completion metrics
 * - Detect delays
 * - Generate alerts
 * - Produce execution summaries
 * - Support analytics integration
 *
 * Principle:
 * Progress Monitor observes execution.
 *
 * It does not:
 * - execute tasks
 * - modify workflows
 * - make strategic decisions
 *
 * ============================================================
 */

class ProgressMonitor {

    constructor(config = {}) {

        this.name = "ProgressMonitor";
        this.version = "1.0.0";

        this.config = config;

        this.initialized = false;
        this.running = false;

        this.projects = [];
        this.workflows = [];
        this.tasks = [];
        this.alerts = [];
        this.snapshots = [];

        this.statistics = {

            monitoredProjects: 0,
            monitoredWorkflows: 0,
            monitoredTasks: 0,
            alertsGenerated: 0,
            snapshotsCreated: 0

        };

    }

    /**
     * Initialize
     */
    initialize() {

        if (this.initialized) {

            return true;

        }

        this.initialized = true;

        return true;

    }

    /**
     * Execute
     */
    execute() {

        if (!this.initialized) {

            this.initialize();

        }

        this.running = true;

        return true;

    }

    /**
     * Shutdown
     */
    shutdown() {

        this.running = false;

        return true;

    }

    /**
     * Register Project
     */
    registerProject(project) {

        this.projects.push(project);

        this.statistics.monitoredProjects++;

        return project;

    }

    /**
     * Register Workflow
     */
    registerWorkflow(workflow) {

        this.workflows.push(workflow);

        this.statistics.monitoredWorkflows++;

        return workflow;

    }

    /**
     * Register Task
     */
    registerTask(task) {

        this.tasks.push(task);

        this.statistics.monitoredTasks++;

        return task;

    }

    /**
     * Calculate Overall Progress
     */
    calculateProgress() {

        if (this.tasks.length === 0) {

            return 0;

        }

        const total = this.tasks.reduce(

            (sum, task) => sum + (task.progress || 0),

            0

        );

        return Math.round(total / this.tasks.length);

    }

    /**
     * Detect Delayed Tasks
     */
    detectDelays(currentDate = new Date()) {

        const delayed = this.tasks.filter(task =>

            task.dueDate &&
            new Date(task.dueDate) < currentDate &&
            task.status !== "COMPLETED"

        );

        delayed.forEach(task => {

            this.createAlert(

                "TASK_DELAY",

                task.id,

                `Task "${task.title}" is overdue.`

            );

        });

        return delayed;

    }

    /**
     * Create Alert
     */
    createAlert(type, entityId, message) {

        const alert = {

            id: this.generateID(),

            type,

            entityId,

            message,

            createdAt: new Date()

        };

        this.alerts.push(alert);

        this.statistics.alertsGenerated++;

        return alert;

    }

    /**
     * Create Snapshot
     */
    createSnapshot() {

        const snapshot = {

            id: this.generateID(),

            overallProgress:
                this.calculateProgress(),

            projects:
                this.projects.length,

            workflows:
                this.workflows.length,

            tasks:
                this.tasks.length,

            alerts:
                this.alerts.length,

            createdAt: new Date()

        };

        this.snapshots.push(snapshot);

        this.statistics.snapshotsCreated++;

        return snapshot;

    }

    /**
     * Get Alerts
     */
    getAlerts() {

        return this.alerts;

    }

    /**
     * Health Check
     */
    healthCheck() {

        return {

            monitor: this.name,

            version: this.version,

            initialized: this.initialized,

            running: this.running,

            projects: this.projects.length,

            workflows: this.workflows.length,

            tasks: this.tasks.length,

            snapshots: this.snapshots.length,

            alerts: this.alerts.length,

            overallProgress:
                this.calculateProgress(),

            statistics: this.statistics

        };

    }

    /**
     * Generate Unique ID
     */
    generateID() {

        return (

            "progress-" +

            Date.now() +

            "-" +

            Math.floor(Math.random() * 100000)

        );

    }

    /**
     * Reset
     */
    reset() {

        this.projects = [];
        this.workflows = [];
        this.tasks = [];
        this.alerts = [];
        this.snapshots = [];

        this.statistics = {

            monitoredProjects: 0,
            monitoredWorkflows: 0,
            monitoredTasks: 0,
            alertsGenerated: 0,
            snapshotsCreated: 0

        };

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = ProgressMonitor;

}

if (typeof window !== "undefined") {

    window.ProgressMonitor = ProgressMonitor;

}
