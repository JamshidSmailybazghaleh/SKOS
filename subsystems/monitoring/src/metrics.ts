/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Notification & Monitoring
 * Module    : Metrics
 *
 * Build     : BUILD-000174
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Metric type.
 */
export enum MetricType {

    Counter = "counter",

    Gauge = "gauge",

    Timer = "timer",

    Percentage = "percentage"

}

/**
 * Metric definition.
 */
export interface Metric {

    /**
     * Stable metric identifier.
     */
    id: string;

    /**
     * Metric name.
     */
    name: string;

    /**
     * Metric type.
     */
    type: MetricType;

    /**
     * Current value.
     */
    value: number;

    /**
     * Unit.
     */
    unit: string;

    /**
     * Last update time.
     */
    updatedAt: number;

}

/**
 * Metrics Registry.
 */
export class MetricsRegistry {

    private readonly metrics: Metric[] = [];

    /**
     * Register or update metric.
     */
    public upsert(
        metric: Metric
    ): void {

        const index = this.metrics.findIndex(

            item => item.id === metric.id

        );

        if (index >= 0) {

            this.metrics[index] = metric;

            return;

        }

        this.metrics.push(metric);

    }

    /**
     * Return all metrics.
     */
    public list(): Metric[] {

        return [...this.metrics];

    }

    /**
     * Find metric by id.
     */
    public find(
        id: string
    ): Metric | undefined {

        return this.metrics.find(

            item => item.id === id

        );

    }

    /**
     * Clear registry.
     */
    public clear(): void {

        this.metrics.length = 0;

    }

}
