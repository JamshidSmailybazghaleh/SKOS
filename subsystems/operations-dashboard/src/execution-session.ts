/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Dashboard
 * Module    : Execution Session
 *
 * Build     : BUILD-000175
 * Sprint    : Runtime Readiness
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Execution session status.
 */
export enum ExecutionSessionStatus {

    Created = "created",

    Running = "running",

    Paused = "paused",

    Completed = "completed",

    Failed = "failed",

    Cancelled = "cancelled"

}

/**
 * Execution session.
 */
export interface ExecutionSession {

    /**
     * Stable session identifier.
     */
    id: string;

    /**
     * Session name.
     */
    name: string;

    /**
     * Current status.
     */
    status: ExecutionSessionStatus;

    /**
     * Session start time.
     */
    startedAt: number;

    /**
     * Session end time.
     */
    finishedAt?: number;

    /**
     * Progress (0–100).
     */
    progress: number;

    /**
     * Optional summary.
     */
    summary?: string;

}

/**
 * Execution Session Manager.
 */
export class ExecutionSessionManager {

    private readonly sessions: Map<string, ExecutionSession> =
        new Map();

    /**
     * Register a new session.
     */
    public create(
        session: ExecutionSession
    ): void {

        this.sessions.set(
            session.id,
            session
        );

    }

    /**
     * Return all sessions.
     */
    public list(): ExecutionSession[] {

        return Array.from(
            this.sessions.values()
        );

    }

    /**
     * Find session.
     */
    public find(
        id: string
    ): ExecutionSession | undefined {

        return this.sessions.get(id);

    }

    /**
     * Update session.
     */
    public update(
        id: string,
        changes: Partial<ExecutionSession>
    ): boolean {

        const session = this.sessions.get(id);

        if (!session) {

            return false;

        }

        this.sessions.set(id, {

            ...session,

            ...changes

        });

        return true;

    }

    /**
     * Remove session.
     */
    public remove(
        id: string
    ): boolean {

        return this.sessions.delete(id);

    }

}
