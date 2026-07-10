/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime Core
 * Module    : Error Manager
 *
 * Build     : BUILD-000187
 * Version   : 1.0.0
 * ==========================================================
 */

import { Logger, LogLevel } from "./logger";

export enum ErrorSeverity {

    Low = "low",

    Medium = "medium",

    High = "high",

    Critical = "critical"

}

export interface RuntimeError {

    timestamp: Date;

    subsystem: string;

    message: string;

    severity: ErrorSeverity;

    exception?: unknown;

}

export class ErrorManager {

    private readonly errors: RuntimeError[] = [];

    constructor(
        private readonly logger: Logger
    ) {}

    /**
     * Report a runtime error.
     */
    public report(
        subsystem: string,
        message: string,
        severity: ErrorSeverity,
        exception?: unknown
    ): void {

        const error: RuntimeError = {

            timestamp: new Date(),

            subsystem,

            message,

            severity,

            exception

        };

        this.errors.push(error);

        this.logger.log(
            LogLevel.ERROR,
            subsystem,
            message,
            exception
        );

    }

    /**
     * Get all runtime errors.
     */
    public getErrors(): readonly RuntimeError[] {

        return this.errors;

    }

    /**
     * Check whether critical errors exist.
     */
    public hasCriticalErrors(): boolean {

        return this.errors.some(
            error =>
                error.severity ===
                ErrorSeverity.Critical
        );

    }

    /**
     * Clear all recorded errors.
     */
    public clear(): void {

        this.errors.length = 0;

    }

}
