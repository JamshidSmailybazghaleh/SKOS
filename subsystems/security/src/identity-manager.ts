/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Security
 * Module    : Identity Manager
 *
 * Build     : BUILD-000131
 * Sprint    : Sprint 20
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface Identity {

    id: string;

    name: string;

    type: "AGENT" | "USER" | "SERVICE";

    active: boolean;

}

export class IdentityManager {

    private readonly identities =
        new Map<string, Identity>();

    /**
     * Register identity.
     */
    public register(

        identity: Identity

    ): void {

        this.identities.set(

            identity.id,

            identity

        );

    }

    /**
     * Retrieve identity.
     */
    public get(

        id: string

    ): Identity | undefined {

        return this.identities.get(id);

    }

    /**
     * Disable identity.
     */
    public disable(

        id: string

    ): boolean {

        const identity = this.identities.get(id);

        if (!identity) {

            return false;

        }

        identity.active = false;

        return true;

    }

    /**
     * List all identities.
     */
    public getAll(): Identity[] {

        return Array.from(this.identities.values());

    }

}
