/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Reasoning
 * Module    : Rule Engine
 *
 * Build     : BUILD-000112
 * Sprint    : Sprint 16
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface Rule {

    id: string;

    name: string;

    description: string;

    enabled: boolean;

    evaluate(facts: string[]): boolean;

}

export class RuleEngine {

    private readonly rules: Rule[] = [];

    /**
     * Register rule.
     */
    public register(

        rule: Rule

    ): void {

        this.rules.push(rule);

    }

    /**
     * Evaluate rules.
     */
    public evaluate(

        facts: string[]

    ): Rule[] {

        return this.rules.filter(

            rule =>

                rule.enabled &&

                rule.evaluate(facts)

        );

    }

    /**
     * List all rules.
     */
    public getRules(): Rule[] {

        return [...this.rules];

    }

}
