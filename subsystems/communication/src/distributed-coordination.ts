/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Communication
 * Module    : Distributed Coordination
 *
 * Build     : BUILD-000124
 * Sprint    : Sprint 18
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface CoordinationLock {

    resourceId: string;

    ownerAgent: string;

}

export class DistributedCoordinator {

    private readonly locks =
        new Map<string, CoordinationLock>();

    /**
     * Acquire lock.
     */
    public acquire(

        resourceId: string,

        agentId: string

    ): boolean {

        if (this.locks.has(resourceId)) {

            return false;

        }

        this.locks.set(

            resourceId,

            {

                resourceId,

                ownerAgent: agentId

            }

        );

        return true;

    }

    /**
     * Release lock.
     */
    public release(

        resourceId: string,

        agentId: string

    ): boolean {

        const lock =

            this.locks.get(resourceId);

        if (!lock) {

            return false;

        }

        if (lock.ownerAgent !== agentId) {

            return false;

        }

        this.locks.delete(resourceId);

        return true;

    }

    /**
     * Check ownership.
     */
    public isLocked(

        resourceId: string

    ): boolean {

        return this.locks.has(resourceId);

    }

}
