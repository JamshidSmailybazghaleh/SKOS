/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Inference Engine
 * Module    : Inference Rule
 *
 * Build     : BUILD-000188
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Rule execution priority.
 */
export enum RulePriority {

    Low = 10,

    Normal = 50,

    High = 100,

    Critical = 1000

}

/**
 * Rule execution status.
 */
export enum RuleStatus {

    Enabled = "enabled",

    Disabled = "disabled"

}

/**
 * One condition inside a rule.
 */
export interface RuleCondition {

    /**
     * Fact type.
     */
    factType: string;

    /**
     * Optional attribute.
     */
    attribute?: string;

    /**
     * Comparison operator.
     */
    operator:
        | "=="
        | "!="
        | ">"
        | "<"
        | ">="
        | "<="
        | "contains"
        | "startsWith"
        | "endsWith";

    /**
     * Expected value.
     */
    value: unknown;

}

/**
 * Rule action.
 */
export interface RuleAction {

    /**
     * Produced fact type.
     */
    factType: string;

    /**
     * Produced value.
     */
    value: unknown;

    /**
     * Confidence (0.0–1.0)
     */
    confidence: number;

}

/**
 * Inference rule.
 */
export interface InferenceRule {

    /**
     * Rule identifier.
     */
    id: string;

    /**
     * Rule name.
     */
    name: string;

    /**
     * Description.
     */
    description?: string;

    /**
     * Rule priority.
     */
    priority: RulePriority;

    /**
     * Rule status.
     */
    status: RuleStatus;

    /**
     * Conditions.
     */
    conditions: RuleCondition[];

    /**
     * Actions.
     */
    actions: RuleAction[];

}
