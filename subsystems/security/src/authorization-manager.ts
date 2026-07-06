/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Security
 * Module    : Authorization Manager
 *
 * Build     : BUILD-000133
 * Sprint    : Sprint 20
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface Permission {

    resource: string;

    action: string;

}

export interface Role {

    name: string;

    permissions: Permission[];

}

export class AuthorizationManager {

    private readonly roles =
        new Map<string, Role>();

    /**
     * Register role.
     */
    public registerRole(

        role: Role

    ): void {

        this.roles.set(

            role.name,

            role

        );

    }

    /**
     * Check permission.
     */
    public isAuthorized(

        roleName: string,

        resource: string,

        action: string

    ): boolean {

        const role =

            this.roles.get(roleName);

        if (!role) {

            return false;

        }

        return role.permissions.some(

            permission =>

                permission.resource === resource &&

                permission.action === action

        );

    }

    /**
     * Retrieve role.
     */
    public getRole(

        roleName: string

    ): Role | undefined {

        return this.roles.get(roleName);

    }

}
