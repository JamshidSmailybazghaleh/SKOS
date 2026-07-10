/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime Core
 * Module    : Logger
 *
 * Build     : BUILD-000187
 * Version   : 1.0.0
 * ==========================================================
 */

export enum LogLevel {

    DEBUG = "DEBUG",

    INFO = "INFO",

    WARNING = "WARNING",

    ERROR = "ERROR",

    FATAL = "FATAL"

}

export interface LogEntry {

    timestamp: Date;

    level: LogLevel;

    subsystem: string;

    message: string;

    details?: unknown;

}

export class Logger {

    private readonly entries: LogEntry[] = [];

    /**
     * Write a log entry.
     */
    public log(
        level: LogLevel,
        subsystem: string,
        message: string,
        details?: unknown
    ): void {

        const entry: LogEntry = {

            timestamp: new Date(),

            level,

            subsystem,

            message,

            details

        };

        this.entries.push(entry);

        console.log(
            `[${entry.timestamp.toISOString()}] ` +
            `[${entry.level}] ` +
            `[${entry.subsystem}] ` +
            `${entry.message}`
        );

    }

    public debug(
        subsystem: string,
        message: string,
        details?: unknown
    ): void {

        this.log(
            LogLevel.DEBUG,
            subsystem,
            message,
            details
        );

    }

    public info(
        subsystem: string,
        message: string,
        details?: unknown
    ): void {

        this.log(
            LogLevel.INFO,
            subsystem,
            message,
            details
        );

    }

    public warning(
        subsystem: string,
        message: string,
        details?: unknown
    ): void {

        this.log(
            LogLevel.WARNING,
            subsystem,
            message,
            details
        );

    }

    public error(
        subsystem: string,
        message: string,
        details?: unknown
    ): void {

        this.log(
            LogLevel.ERROR,
            subsystem,
            message,
            details
        );

    }

    public fatal(
        subsystem: string,
        message: string,
        details?: unknown
    ): void {

        this.log(
            LogLevel.FATAL,
            subsystem,
            message,
            details
        );

    }

    /**
     * Return all log entries.
     */
    public getEntries(): readonly LogEntry[] {

        return this.entries;

    }

    /**
     * Remove all log entries.
     */
    public clear(): void {

        this.entries.length = 0;

    }

}
