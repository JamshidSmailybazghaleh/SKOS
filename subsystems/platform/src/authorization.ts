/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Platform
 * Module    : Authorization
 *
 * Build     : BUILD-000093
 * Sprint    : Sprint 12
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export type UserRole =
    | "ADMIN"
    | "SYSTEM"
    | "USER"
    | "GUEST";

export interface AuthorizationRequest {

    userId: string;

    role: UserRole;

    permission: string;

}

export interface AuthorizationResult {

    authorized: boolean;

    message: string;

}

export class AuthorizationService {

    private readonly permissions =
        new Map<UserRole, string[]>([
            [
                "ADMIN",
                ["*"]
            ],
            [
                "SYSTEM",
                [
                    "knowledge.read",
                    "knowledge.write",
                    "workflow.execute",
                    "agent.execute"
                ]
            ],
            [
                "USER",
                [
                    "knowledge.read"
                ]
            ],
            [
                "GUEST",
                []
            ]
        ]);

    /**
     * Check permission.
     */
    public authorize(

        request: AuthorizationRequest

    ): AuthorizationResult {

        const allowed =

            this.permissions.get(

                request.role

            ) ?? [];

        const authorized =

            allowed.includes("*") ||

            allowed.includes(

                request.permission

            );

        return {

            authorized,

            message:

                authorized

                    ? "Authorization granted."

                    : "Authorization denied."

        };

    }

}
