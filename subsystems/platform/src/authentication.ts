/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Platform
 * Module    : Authentication
 *
 * Build     : BUILD-000092
 * Sprint    : Sprint 12
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface AuthenticationRequest {

    username: string;

    token: string;

}

export interface AuthenticationResult {

    authenticated: boolean;

    userId?: string;

    message: string;

}

export class AuthenticationService {

    /**
     * Authenticate incoming request.
     */
    public authenticate(

        request: AuthenticationRequest

    ): AuthenticationResult {

        if (!request.token || request.token.trim().length === 0) {

            return {

                authenticated: false,

                message: "Authentication failed."

            };

        }

        return {

            authenticated: true,

            userId: request.username,

            message: "Authentication successful."

        };

    }

}
