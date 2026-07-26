/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Job Manager
 * ------------------------------------------------------------
 * File      : job-manager.js
 * Operation : OP-019
 * Build     : BUILD-000407
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Manages pipeline jobs throughout their lifecycle.
 *
 * Responsibilities:
 * - Create jobs
 * - Queue jobs
 * - Start jobs
 * - Complete jobs
 * - Cancel jobs
 * - Retry failed jobs
 * - Monitor job status
 *
 * ============================================================
 */

class JobManager {

    constructor(config = {}) {

        this.name = "JobManager";
        this.version = "1.0.0";

        this.config = config;

        this.initialized = false;
        this.running = false;

        this.jobs = [];
        this.queue = [];
        this.completed = [];
        this.failed = [];

        this.statistics = {

            jobsCreated: 0,
            jobsStarted: 0,
            jobsCompleted: 0,
            jobsCancelled: 0,
            jobsRetried: 0,
            jobsFailed: 0

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
     * Create Job
     */
    createJob(data = {}) {

        const job = {

            id: this.generateID(),

            name:
                data.name || "Knowledge Job",

            type:
                data.type || "DEFAULT",

            priority:
                data.priority || "MEDIUM",

            payload:
                data.payload || {},

            status: "QUEUED",

            retryCount: 0,

            createdAt: new Date()

        };

        this.jobs.push(job);
        this.queue.push(job);

        this.statistics.jobsCreated++;

        return job;

    }

    /**
     * Start Job
     */
    startJob(id) {

        const job = this.findJob(id);

        if (!job) {

            return null;

        }

        job.status = "RUNNING";
        job.startedAt = new Date();

        this.statistics.jobsStarted++;

        return job;

    }

    /**
     * Complete Job
     */
    completeJob(id) {

        const job = this.findJob(id);

        if (!job) {

            return null;

        }

        job.status = "COMPLETED";
        job.completedAt = new Date();

        this.completed.push(job);

        this.queue = this.queue.filter(

            item => item.id !== id

        );

        this.statistics.jobsCompleted++;

        return job;

    }

    /**
     * Cancel Job
     */
    cancelJob(id) {

        const job = this.findJob(id);

        if (!job) {

            return null;

        }

        job.status = "CANCELLED";
        job.cancelledAt = new Date();

        this.queue = this.queue.filter(

            item => item.id !== id

        );

        this.statistics.jobsCancelled++;

        return job;

    }

    /**
     * Retry Job
     */
    retryJob(id) {

        const job = this.findJob(id);

        if (!job) {

            return null;

        }

        job.retryCount++;

        job.status = "QUEUED";

        this.queue.push(job);

        this.statistics.jobsRetried++;

        return job;

    }

    /**
     * Fail Job
     */
    failJob(id, reason = "") {

        const job = this.findJob(id);

        if (!job) {

            return null;

        }

        job.status = "FAILED";
        job.reason = reason;
        job.failedAt = new Date();

        this.failed.push(job);

        this.queue = this.queue.filter(

            item => item.id !== id

        );

        this.statistics.jobsFailed++;

        return job;

    }

    /**
     * Find Job
     */
    findJob(id) {

        return this.jobs.find(

            job => job.id === id

        );

    }

    /**
     * Next Job
     */
    getNextJob() {

        return this.queue.length
            ? this.queue[0]
            : null;

    }

    /**
     * Dashboard
     */
    getDashboard() {

        return {

            queued: this.queue.length,

            completed: this.completed.length,

            failed: this.failed.length,

            totalJobs: this.jobs.length,

            statistics: this.statistics

        };

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

            dashboard: this.getDashboard()

        };

    }

    /**
     * Generate ID
     */
    generateID() {

        return (

            "job-" +

            Date.now() +

            "-" +

            Math.floor(

                Math.random() * 100000

            )

        );

    }

    /**
     * Reset
     */
    reset() {

        this.jobs = [];
        this.queue = [];
        this.completed = [];
        this.failed = [];

        this.statistics = {

            jobsCreated: 0,
            jobsStarted: 0,
            jobsCompleted: 0,
            jobsCancelled: 0,
            jobsRetried: 0,
            jobsFailed: 0

        };

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = JobManager;

}

if (typeof window !== "undefined") {

    window.JobManager = JobManager;

}
