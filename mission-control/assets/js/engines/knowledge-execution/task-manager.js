/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Task Manager
 * ------------------------------------------------------------
 * File      : task-manager.js
 * Operation : OP-017
 * Build     : BUILD-000393
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Manages the complete lifecycle of execution tasks
 * within the SKOS ecosystem.
 *
 * Responsibilities:
 * - Create tasks
 * - Assign tasks
 * - Prioritize tasks
 * - Track task progress
 * - Complete or cancel tasks
 * - Produce task statistics
 *
 * Principle:
 * Task Manager manages operational work.
 *
 * It does not:
 * - define strategy
 * - create workflows
 * - monitor overall execution
 *
 * ============================================================
 */

class TaskManager {

    constructor(config = {}) {

        this.name = "TaskManager";
        this.version = "1.0.0";

        this.config = config;

        this.initialized = false;
        this.running = false;

        this.tasks = [];
        this.taskTemplates = [];
        this.assignments = [];

        this.statistics = {

            tasksCreated: 0,
            tasksAssigned: 0,
            tasksCompleted: 0,
            tasksCancelled: 0,
            activeTasks: 0

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
     * Create Task
     */
    createTask(data = {}) {

        const task = {

            id: this.generateID(),

            workflowId:
                data.workflowId || null,

            projectId:
                data.projectId || null,

            title:
                data.title || "Execution Task",

            description:
                data.description || "",

            priority:
                data.priority || "MEDIUM",

            assignedTo:
                data.assignedTo || null,

            status: "PENDING",

            progress: 0,

            dueDate:
                data.dueDate || null,

            createdAt: new Date(),

            updatedAt: new Date()

        };

        this.tasks.push(task);

        this.statistics.tasksCreated++;
        this.statistics.activeTasks++;

        return task;

    }

    /**
     * Assign Task
     */
    assignTask(taskId, assignee) {

        const task = this.findTask(taskId);

        if (!task) {

            return null;

        }

        task.assignedTo = assignee;
        task.status = "ASSIGNED";
        task.updatedAt = new Date();

        this.assignments.push({

            taskId,
            assignee,
            assignedAt: new Date()

        });

        this.statistics.tasksAssigned++;

        return task;

    }

    /**
     * Update Progress
     */
    updateProgress(taskId, progress) {

        const task = this.findTask(taskId);

        if (!task) {

            return null;

        }

        task.progress = Math.max(0, Math.min(100, progress));

        task.status = task.progress === 100
            ? "COMPLETED"
            : "IN_PROGRESS";

        task.updatedAt = new Date();

        if (task.progress === 100) {

            this.statistics.tasksCompleted++;
            this.statistics.activeTasks--;

        }

        return task;

    }

    /**
     * Cancel Task
     */
    cancelTask(taskId, reason = "") {

        const task = this.findTask(taskId);

        if (!task) {

            return null;

        }

        task.status = "CANCELLED";
        task.cancelReason = reason;
        task.updatedAt = new Date();

        this.statistics.tasksCancelled++;
        this.statistics.activeTasks--;

        return task;

    }

    /**
     * Register Template
     */
    registerTemplate(template = {}) {

        const item = {

            id: this.generateID(),

            name:
                template.name || "Task Template",

            priority:
                template.priority || "MEDIUM",

            description:
                template.description || "",

            createdAt: new Date()

        };

        this.taskTemplates.push(item);

        return item;

    }

    /**
     * Find Task
     */
    findTask(taskId) {

        return this.tasks.find(

            task => task.id === taskId

        );

    }

    /**
     * Get Active Tasks
     */
    getActiveTasks() {

        return this.tasks.filter(task =>

            task.status !== "COMPLETED" &&
            task.status !== "CANCELLED"

        );

    }

    /**
     * Generate Unique ID
     */
    generateID() {

        return (

            "task-" +

            Date.now() +

            "-" +

            Math.floor(Math.random() * 100000)

        );

    }

    /**
     * Health Check
     */
    healthCheck() {

        return {

            manager: this.name,

            version: this.version,

            initialized: this.initialized,

            running: this.running,

            tasks: this.tasks.length,

            templates: this.taskTemplates.length,

            assignments: this.assignments.length,

            statistics: this.statistics

        };

    }

    /**
     * Reset
     */
    reset() {

        this.tasks = [];
        this.taskTemplates = [];
        this.assignments = [];

        this.statistics = {

            tasksCreated: 0,
            tasksAssigned: 0,
            tasksCompleted: 0,
            tasksCancelled: 0,
            activeTasks: 0

        };

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = TaskManager;

}

if (typeof window !== "undefined") {

    window.TaskManager = TaskManager;

}
