/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Priority Manager
 * ------------------------------------------------------------
 * File      : priority-manager.js
 * Operation : OP-016
 * Build     : BUILD-000384
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Evaluates, ranks and manages strategic priorities
 * across the SKOS ecosystem.
 *
 * Responsibilities:
 * - Evaluate strategic priorities
 * - Calculate priority scores
 * - Rank initiatives
 * - Allocate strategic levels
 * - Support roadmap planning
 *
 * Principle:
 * Priority Manager determines importance.
 *
 * It does not:
 * - execute strategies
 * - approve investments
 * - replace human governance
 *
 * ============================================================
 */

class PriorityManager {

    constructor(config = {}) {

        this.name = "PriorityManager";
        this.version = "1.0.0";

        this.config = config;

        this.initialized = false;
        this.running = false;

        this.priorities = [];
        this.priorityMatrix = [];
        this.history = [];

        this.statistics = {

            prioritiesCreated: 0,
            prioritiesUpdated: 0,
            evaluationsPerformed: 0,
            criticalPriorityCount: 0,
            highPriorityCount: 0,
            mediumPriorityCount: 0,
            lowPriorityCount: 0

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
     * Evaluate Priority
     */
    evaluate(item = {}) {

        const score = this.calculateScore(item);
        const level = this.determineLevel(score);

        const priority = {

            id: this.generateID(),

            title:
                item.title || "Unnamed Priority",

            category:
                item.category || "GENERAL",

            score,

            level,

            impact:
                item.impact || 0,

            urgency:
                item.urgency || 0,

            confidence:
                item.confidence || 0,

            createdAt: new Date()

        };

        this.priorities.push(priority);
        this.history.push(priority);

        this.statistics.prioritiesCreated++;
        this.statistics.evaluationsPerformed++;

        this.updateStatistics(level);

        return priority;

    }

    /**
     * Calculate Priority Score
     */
    calculateScore(item = {}) {

        const impact = item.impact || 0;
        const urgency = item.urgency || 0;
        const confidence = item.confidence || 0;
        const strategicValue = item.strategicValue || 0;
        const businessValue = item.businessValue || 0;

        const score =
            (impact * 0.30) +
            (urgency * 0.20) +
            (confidence * 0.15) +
            (strategicValue * 0.20) +
            (businessValue * 0.15);

        return Math.round(Math.min(score, 100));

    }

    /**
     * Determine Priority Level
     */
    determineLevel(score) {

        if (score >= 90) {

            return "CRITICAL";

        }

        if (score >= 75) {

            return "HIGH";

        }

        if (score >= 50) {

            return "MEDIUM";

        }

        return "LOW";

    }

    /**
     * Build Priority Matrix
     */
    buildMatrix() {

        this.priorityMatrix = [...this.priorities].sort(

            (a, b) => b.score - a.score

        );

        return this.priorityMatrix;

    }

    /**
     * Get Priorities
     */
    getPriorities() {

        return this.priorities;

    }

    /**
     * Get By Level
     */
    getByLevel(level) {

        return this.priorities.filter(

            item => item.level === level

        );

    }

    /**
     * Update Statistics
     */
    updateStatistics(level) {

        switch (level) {

            case "CRITICAL":
                this.statistics.criticalPriorityCount++;
                break;

            case "HIGH":
                this.statistics.highPriorityCount++;
                break;

            case "MEDIUM":
                this.statistics.mediumPriorityCount++;
                break;

            default:
                this.statistics.lowPriorityCount++;

        }

    }

    /**
     * Generate ID
     */
    generateID() {

        return (

            "priority-" +

            Date.now() +

            "-" +

            Math.floor(

                Math.random() * 100000

            )

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

            priorities: this.priorities.length,

            matrixSize: this.priorityMatrix.length,

            statistics: this.statistics

        };

    }

    /**
     * Reset
     */
    reset() {

        this.priorities = [];
        this.priorityMatrix = [];
        this.history = [];

        this.statistics = {

            prioritiesCreated: 0,
            prioritiesUpdated: 0,
            evaluationsPerformed: 0,
            criticalPriorityCount: 0,
            highPriorityCount: 0,
            mediumPriorityCount: 0,
            lowPriorityCount: 0

        };

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = PriorityManager;

}

if (typeof window !== "undefined") {

    window.PriorityManager = PriorityManager;

}
