/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Permission & Security
 * Module    : Access Controller
 *
 * Build     : BUILD-000166
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    PermissionManager
} from "./permission-manager";

import {
    PermissionType
} from "./permission-type";

import {
    DefaultSecurityPolicies,
    SecurityPolicy
} from "./security-policy";

/**
 * Access request result.
 */
export interface AccessResult {

    granted: boolean;

    reason?: string;

}

/**
 * Access Controller.
 */
export class AccessController {

    /**
     * Permission manager.
     */
    private readonly permissionManager =
        new PermissionManager();

    /**
     * Active security policies.
     */
    private readonly policies:
        SecurityPolicy[] =
            DefaultSecurityPolicies;

    /**
     * Request access.
     */
    public request(

        permission: PermissionType

    ): AccessResult {

        if (

            !this.permissionManager
                .isGranted(permission)

        ) {

            return {

                granted: false,

                reason:
                    "Permission not granted."

            };

        }

        return {

            granted: true

        };

    }

    /**
     * Check policy state.
     */
    public isPolicyEnabled(

        policy: SecurityPolicy

    ): boolean {

        return (

            policy.enabled

        );

    }

    /**
     * Retrieve all policies.
     */
    public policiesList():
        SecurityPolicy[] {

        return [

            ...this.policies

        ];

    }

    /**
     * Verify mandatory policies.
     */
    public verifyPolicies():
        boolean {

        return this.policies.every(

            policy =>

                !policy.mandatory ||

                policy.enabled

        );

    }

}
