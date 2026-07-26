/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Dependency Resolver
 * ------------------------------------------------------------
 * File      : dependency-resolver.js
 * Operation : OP-021
 * Build     : BUILD-000423
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Resolves dependencies between SKOS components.
 *
 * Responsibilities:
 * - Register component dependencies
 * - Resolve dependency order
 * - Detect missing dependencies
 * - Detect circular dependencies
 * - Validate dependency graph
 *
 * ============================================================
 */

class DependencyResolver {

    constructor(config = {}) {

        this.name = "DependencyResolver";
        this.version = "1.0.0";

        this.config = config;

        this.initialized = false;
        this.running = false;

        this.dependencies = new Map();

        this.statistics = {

            componentsRegistered: 0,
            dependenciesResolved: 0,
            missingDependencies: 0,
            circularDependencies: 0,
            validations: 0

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
     * Register Component
     */
    register(name, dependencies = []) {

        this.dependencies.set(name, dependencies);

        this.statistics.componentsRegistered++;

        return true;

    }

    /**
     * Resolve Dependencies
     */
    resolve(name) {

        this.statistics.dependenciesResolved++;

        return this.dependencies.get(name) || [];

    }

    /**
     * Check Missing Dependencies
     */
    checkMissing() {

        const missing = [];

        this.dependencies.forEach((deps) => {

            deps.forEach(dep => {

                if (!this.dependencies.has(dep)) {

                    missing.push(dep);

                    this.statistics.missingDependencies++;

                }

            });

        });

        return missing;

    }

    /**
     * Detect Circular Dependencies
     */
    detectCircular() {

        const circular = [];

        this.dependencies.forEach((deps, component) => {

            deps.forEach(dep => {

                const child = this.dependencies.get(dep);

                if (
                    child &&
                    child.includes(component)
                ) {

                    circular.push({

                        from: component,
                        to: dep

                    });

                    this.statistics.circularDependencies++;

                }

            });

        });

        return circular;

    }

    /**
     * Validate Dependency Graph
     */
    validate() {

        this.statistics.validations++;

        return {

            valid:
                this.checkMissing().length === 0 &&
                this.detectCircular().length === 0,

            components:

                this.dependencies.size

        };

    }

    /**
     * Get All Components
     */
    getAll() {

        return Array.from(

            this.dependencies.keys()

        );

    }

    /**
     * Health Check
     */
    healthCheck() {

        return {

            resolver: this.name,

            version: this.version,

            initialized: this.initialized,

            running: this.running,

            components:

                this.dependencies.size,

            statistics:

                this.statistics

        };

    }

    /**
     * Reset
     */
    reset() {

        this.dependencies.clear();

        this.initialized = false;

        this.running = false;

        this.statistics = {

            componentsRegistered: 0,
            dependenciesResolved: 0,
            missingDependencies: 0,
            circularDependencies: 0,
            validations: 0

        };

    }

}

/**
 * Export
 */

if (typeof module !== "undefined") {

    module.exports = DependencyResolver;

}

if (typeof window !== "undefined") {

    window.DependencyResolver = DependencyResolver;

}
