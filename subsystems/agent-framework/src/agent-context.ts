/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Agent Framework
 * Module    : Agent Context
 *
 * Build     : BUILD-000190
 * Version   : 1.0.0
 * ==========================================================
 */

import { InferenceFact } from "../../inference-engine/src/inference-fact";
import { SearchResult } from "../../semantic-search/src/search-result";

/**
 * Runtime context for an agent.
 */
export interface AgentContext {

    /**
     * Current session identifier.
     */
    sessionId: string;

    /**
     * Current user identifier.
     */
    userId?: string;

    /**
     * Available knowledge facts.
     */
    facts: readonly InferenceFact[];

    /**
     * Search results available to the agent.
     */
    searchResults: readonly SearchResult[];

    /**
     * Shared runtime variables.
     */
    variables: Record<string, unknown>;

    /**
     * Additional metadata.
     */
    metadata?: Record<string, unknown>;

}
