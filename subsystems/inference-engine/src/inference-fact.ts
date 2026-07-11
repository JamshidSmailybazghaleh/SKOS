/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Inference Engine
 * Module    : Inference Fact
 *
 * Build     : BUILD-000188
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Source of a fact.
 */
export enum FactSource {

    User = "user",

    KnowledgeEngine = "knowledge-engine",

    KnowledgeGraph = "knowledge-graph",

    InferenceEngine = "inference-engine",

    External = "external"

}

/**
 * Fact confidence level.
 */
export interface FactConfidence {

    /**
     * Confidence value (0.0 - 1.0).
     */
    score: number;

    /**
     * Explanation of the confidence.
     */
    reason?: string;

}

/**
 * Inference fact.
 */
export interface InferenceFact {

    /**
     * Fact identifier.
     */
    id: string;

    /**
     * Fact type.
     */
    type: string;

    /**
     * Fact value.
     */
    value: unknown;

    /**
     * Fact source.
     */
    source: FactSource;

    /**
     * Confidence information.
     */
    confidence: FactConfidence;

    /**
     * Fact creation time.
     */
    createdAt: Date;

    /**
     * Additional metadata.
     */
    metadata?: Record<string, unknown>;

}
