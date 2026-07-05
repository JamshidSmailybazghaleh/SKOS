/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Decision Engine
 * Module    : Decision Policy Manager
 *
 * Build     : BUILD-000072
 * Sprint    : Sprint 08
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface DecisionPolicy {

    id: string;

    name: string;

    description: string;

    weight: number;

    enabled: boolean;

}

export class DecisionPolicyManager {

    private readonly policies = new Map<string, DecisionPolicy>();

    /**
     * Register a policy.
     */
    public add(policy: DecisionPolicy): void {

        this.policies.set(policy.id, policy);

    }

    /**
     * Retrieve one policy.
     */
    public getById(id: string): DecisionPolicy | undefined {

        return this.policies.get(id);

    }

    /**
     * Retrieve all enabled policies.
     */
    public getEnabled(): DecisionPolicy[] {

        return Array
            .from(this.policies.values())
            .filter(policy => policy.enabled);

    }

    /**
     * Remove a policy.
     */
    public remove(id: string): boolean {

        return this.policies.delete(id);

    }

}
