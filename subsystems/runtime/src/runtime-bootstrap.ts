/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime Foundation
 * Module    : Runtime Bootstrap
 *
 * Build     : BUILD-000195
 * Version   : 1.0.0
 * ==========================================================
 */

import { RuntimeKernel } from "./runtime-kernel";
import { ServiceRegistry } from "./service-registry";
import { TaskScheduler } from "./task-scheduler";
import { EventBus } from "./event-bus";
import { RuntimeMonitor } from "./runtime-monitor";

export class RuntimeBootstrap {

    public readonly kernel =
        new RuntimeKernel();

    public readonly services =
        new ServiceRegistry();

    public readonly scheduler =
        new TaskScheduler();

    public readonly eventBus =
        new EventBus();

    public readonly monitor =
        new RuntimeMonitor();

    /**
     * Bootstrap runtime.
     */
    public initialize(): void {

        this.kernel.initialize();

        /*
         * Future builds:
         *
         * Register runtime services
         * Configure scheduler
         * Configure event bus
         * Load configuration
         * Initialize logging
         */

        this.kernel.start();

    }

    /**
     * Shutdown runtime.
     */
    public shutdown(): void {

        this.kernel.stop();

    }

}
