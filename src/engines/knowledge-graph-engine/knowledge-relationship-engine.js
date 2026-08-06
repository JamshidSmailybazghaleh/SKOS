/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Relationship Engine
 * File        : knowledge-relationship-engine.js
 *
 * Build       : BUILD-000420
 * Version     : 1.0.0
 *
 * Mission:
 * Manage semantic relationships between
 * knowledge objects inside the SKOS graph.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

class KnowledgeRelationshipEngine {

    constructor(options = {}) {

        this.engineId =
            "KNOWLEDGE-RELATIONSHIP-ENGINE";

        this.name =
            "Knowledge Relationship Engine";

        this.version =
            "1.0.0";

        this.build =
            "BUILD-000420";

        this.status =
            "CREATED";

        this.monitoring =
            options.monitoring || null;

        this.relationships =
            new Map();

        this.relationshipHistory =
            [];

    }



    initialize() {

        this.status =
            "INITIALIZED";

        this.recordEvent(
            "KNOWLEDGE_RELATIONSHIP_ENGINE_INITIALIZED"
        );

        return true;

    }



    start() {

        this.status =
            "RUNNING";

        this.recordEvent(
            "KNOWLEDGE_RELATIONSHIP_ENGINE_STARTED"
        );

        return true;

    }



    /**
     * Create relationship
     */

    createRelationship(
        sourceId,
        targetId,
        type,
        metadata = {}
    ) {

        if (!sourceId || !targetId) {

            throw new Error(
                "Source and target required."
            );

        }

        const relationshipId =
            this.generateRelationshipId();

        const relationship = {

            id:
                relationshipId,

            source:
                sourceId,

            target:
                targetId,

            type:
                type || "RELATED_TO",

            metadata,

            active:
                true,

            createdAt:
                new Date()

        };

        this.relationships.set(
            relationshipId,
            relationship
        );

        this.relationshipHistory.push({

            action:
                "CREATE",

            relationshipId,

            timestamp:
                new Date()

        });

        this.recordEvent(
            "KNOWLEDGE_RELATIONSHIP_CREATED",
            relationship
        );

        this.updateMetric(
            "relationships"
        );

        return relationship;

    }



    /**
     * Get relationship
     */

    getRelationship(
        relationshipId
    ) {

        return (
            this.relationships.get(
                relationshipId
            ) || null
        );

    }



    /**
     * Get outgoing relationships
     */

    getOutgoing(
        sourceId
    ) {

        return Array.from(
            this.relationships.values()
        ).filter(

            relationship =>

                relationship.source === sourceId &&
                relationship.active

        );

    }



    /**
     * Get incoming relationships
     */

    getIncoming(
        targetId
    ) {

        return Array.from(
            this.relationships.values()
        ).filter(

            relationship =>

                relationship.target === targetId &&
                relationship.active

        );

    }



    /**
     * Find relationships by type
     */

    getByType(
        relationshipType
    ) {

        return Array.from(
            this.relationships.values()
        ).filter(

            relationship =>

                relationship.type === relationshipType &&
                relationship.active

        );

    }



    /**
     * Update metadata
     */

    updateRelationship(
        relationshipId,
        metadata = {}
    ) {

        const relationship =
            this.getRelationship(
                relationshipId
            );

        if (!relationship) {

            return null;

        }

        relationship.metadata = {

            ...relationship.metadata,

            ...metadata

        };

        relationship.updatedAt =
            new Date();

        this.relationshipHistory.push({

            action:
                "UPDATE",

            relationshipId,

            timestamp:
                new Date()

        });

        this.recordEvent(
            "KNOWLEDGE_RELATIONSHIP_UPDATED",
            {
                relationshipId
            }
        );

        return relationship;

    }



    /**
     * Disable relationship
     */

    disableRelationship(
        relationshipId
    ) {

        const relationship =
            this.getRelationship(
                relationshipId
            );

        if (!relationship) {

            return null;

        }

        relationship.active = false;

        relationship.updatedAt =
            new Date();

        this.relationshipHistory.push({

            action:
                "DISABLE",

            relationshipId,

            timestamp:
                new Date()

        });

        return relationship;

    }



    /**
     * Enable relationship
     */

    enableRelationship(
        relationshipId
    ) {

        const relationship =
            this.getRelationship(
                relationshipId
            );

        if (!relationship) {

            return null;

        }

        relationship.active = true;

        relationship.updatedAt =
            new Date();

        return relationship;

    }



    /**
     * Remove relationship
     */

    removeRelationship(
        relationshipId
    ) {

        const removed =
            this.relationships.delete(
                relationshipId
            );

        this.relationshipHistory.push({

            action:
                "REMOVE",

            relationshipId,

            timestamp:
                new Date()

        });

        return removed;

    }



    getRelationshipHistory() {

        return this.relationshipHistory;

    }



    clearHistory() {

        this.relationshipHistory = [];

        return true;

    }



    generateRelationshipId() {

        return (
            "REL-" +
            Date.now() +
            "-" +
            Math.floor(
                Math.random() * 100000
            )
        );

    }



    getStatistics() {

        const values =
            Array.from(
                this.relationships.values()
            );

        return {

            totalRelationships:
                values.length,

            activeRelationships:
                values.filter(

                    relationship =>

                        relationship.active

                ).length,

            relationshipTypes:
                new Set(

                    values.map(

                        relationship =>

                            relationship.type

                    )

                ).size,

            history:
                this.relationshipHistory.length

        };

    }



    getStatus() {

        return {

            engineId:
                this.engineId,

            name:
                this.name,

            version:
                this.version,

            build:
                this.build,

            status:
                this.status,

            statistics:
                this.getStatistics()

        };

    }



    stop() {

        this.status =
            "STOPPED";

        this.recordEvent(
            "KNOWLEDGE_RELATIONSHIP_ENGINE_STOPPED"
        );

        return true;

    }



    shutdown() {

        this.status =
            "SHUTDOWN";

        this.recordEvent(
            "KNOWLEDGE_RELATIONSHIP_ENGINE_SHUTDOWN"
        );

        return true;

    }



    recordEvent(
        event,
        metadata = {}
    ) {

        if (this.monitoring) {

            this.monitoring.recordEvent(
                event,
                metadata
            );

        }

    }



    updateMetric(
        metric
    ) {

        if (this.monitoring) {

            this.monitoring.updateMetric(
                metric
            );

        }

    }

}

module.exports =
    KnowledgeRelationshipEngine;
