/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Observability
 * Module    : Structured Logger
 *
 * Build     : BUILD-000088
 * Sprint    : Sprint 11
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export type LogLevel =

    | "DEBUG"
    | "INFO"
    | "WARN"
    | "ERROR";

export interface LogEntry {

    timestamp: Date;

    level: LogLevel;

    source: string;

    message: string;

    metadata?: Record<string, unknown>;

}

export class StructuredLogger {

    private readonly entries: LogEntry[] = [];

    /**
     * Write a structured log entry.
     */
    public log(

        level: LogLevel,

        source: string,

        message: string,

        metadata?: Record<string, unknown>

    ): void {

        this.entries.push({

            timestamp: new Date(),

            level,

            source,

            message,

            metadata

        });

    }

    /**
     * Return all log entries.
     */
    public getEntries(): LogEntry[] {

        return [...this.entries];

    }

    /**
     * Return log entries by level.
     */
    public getByLevel(

        level: LogLevel

    ): LogEntry[] {

        return this.entries.filter(

            entry => entry.level === level

        );

    }

}
