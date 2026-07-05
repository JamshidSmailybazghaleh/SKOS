/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Observability
 *
 * Build     : BUILD-000090
 * Sprint    : Sprint 11
 * Version   : 0.0.1
 *
 * Status    : Integration Test
 * ==========================================================
 */

import {
    EventEngine
} from "./event-engine";

import {
    EventBus
} from "./event-bus";

import {
    StructuredLogger
} from "./structured-logger";

import {
    MetricsCollector
} from "./metrics-collector";

export class ObservabilityLayerTest {

    public run(): boolean {

        const events = new EventEngine();

        const bus = new EventBus();

        const logger = new StructuredLogger();

        const metrics = new MetricsCollector();

        let received = false;

        bus.subscribe(

            "TASK_COMPLETED",

            () => {

                received = true;

            }

        );

        const event = {

            id: "EVENT-001",

            type: "TASK_COMPLETED",

            source: "execution-engine",

            timestamp: new Date(),

            payload: {

                taskId: "TASK-001"

            }

        };

        events.emit(event);

        bus.publish(event);

        logger.log(

            "INFO",

            "execution-engine",

            "Task completed.",

            {

                taskId: "TASK-001"

            }

        );

        metrics.increment(

            "TasksCompleted"

        );

        const metric =

            metrics.getMetric(

                "TasksCompleted"

            );

        return (

            received &&

            events.getEvents().length === 1 &&

            logger.getEntries().length === 1 &&

            metric?.value === 1

        );

    }

}
