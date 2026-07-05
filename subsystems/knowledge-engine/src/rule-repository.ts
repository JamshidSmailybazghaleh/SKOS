/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Reasoning Engine
 * Module    : Rule Repository
 *
 * Build     : BUILD-000053
 * Sprint    : Sprint 04
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { Rule } from "./rule-engine";

export interface RuleRepository {

    add(rule: Rule): void;

    findById(id: string): Rule | undefined;

    findAll(): Rule[];

    remove(id: string): boolean;

}

export class InMemoryRuleRepository implements RuleRepository {

    private readonly rules = new Map<string, Rule>();

    public add(rule: Rule): void {

        this.rules.set(rule.id, rule);

    }

    public findById(id: string): Rule | undefined {

        return this.rules.get(id);

    }

    public findAll(): Rule[] {

        return Array.from(this.rules.values());

    }

    public remove(id: string): boolean {

        return this.rules.delete(id);

    }

}
