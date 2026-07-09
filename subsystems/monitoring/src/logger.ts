/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Notification & Monitoring
 * Module    : Logger
 *
 * Build     : BUILD-000174
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Log severity.
 */
export enum LogLevel {

    Debug = "debug",

    Info = "info",

    Warning = "warning",

    Error = "error",

    Critical = "critical"

}

/**
 * Log entry.
 */
export interface LogEntry {

    /**
     * Stable log identifier.
     */
    id: string;

    /**
     * Severity.
     */
    level: LogLevel;

    /**
     * Source subsystem.
     */
    source: string;

    /**
     * Log message.
     */
    message: string;

    /**
     * Optional metadata.
     */
    metadata?: Record<string, unknown>;

    /**
     * Timestamp.
     */
    createdAt: number;

}

/**
 * Logger.
 */
export class Logger {

    private readonly entries: LogEntry[] = [];

    /**
     * Write log entry.
     */
    public log(
        entry: LogEntry
    ): void {

        this.entries.push(entry);

    }

    /**
     * Return all logs.
     */
    public list(): LogEntry[] {

        return [...this.entries];

    }

    /**
     * Return logs by level.
     */
    public byLevel(
        level: LogLevel
    ): LogEntry[] {

        return this.entries.filter(

            entry => entry.level === level

        );

    }

    /**
     * Return logs by source.
     */
    public bySource(
        source: string
    ): LogEntry[] {

        return this.entries.filter(

            entry => entry.source === source

        );

    }

    /**
     * Clear all logs.
     */
    public clear(): void {

        this.entries.length = 0;

    }

}
