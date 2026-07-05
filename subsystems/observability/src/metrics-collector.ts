/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Observability
 * Module    : Metrics Collector
 *
 * Build     : BUILD-000089
 * Sprint    : Sprint 11
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface Metric {

    name: string;

    value: number;

    updatedAt: Date;

}

export class MetricsCollector {

    private readonly metrics =
        new Map<string, Metric>();

    /**
     * Set metric value.
     */
    public setMetric(

        name: string,

        value: number

    ): void {

        this.metrics.set(

            name,

            {

                name,

                value,

                updatedAt: new Date()

            }

        );

    }

    /**
     * Increment metric.
     */
    public increment(

        name: string,

        amount = 1

    ): void {

        const current =

            this.metrics.get(name);

        this.setMetric(

            name,

            (current?.value ?? 0) + amount

        );

    }

    /**
     * Read one metric.
     */
    public getMetric(

        name: string

    ): Metric | undefined {

        return this.metrics.get(name);

    }

    /**
     * Return all metrics.
     */
    public getAllMetrics(): Metric[] {

        return Array.from(

            this.metrics.values()

        );

    }

}
