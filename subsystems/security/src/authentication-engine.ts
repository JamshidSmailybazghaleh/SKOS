/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Security
 * Module    : Authentication Engine
 *
 * Build     : BUILD-000132
 * Sprint    : Sprint 20
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { IdentityManager } from "./identity-manager";

export class AuthenticationEngine {

    constructor(

        private readonly identityManager: IdentityManager

    ) {}

    /**
     * Authenticate identity.
     */
    public authenticate(

        identityId: string

    ): boolean {

        const identity =

            this.identityManager.get(identityId);

        if (!identity) {

            return false;

        }

        return identity.active;

    }

}
