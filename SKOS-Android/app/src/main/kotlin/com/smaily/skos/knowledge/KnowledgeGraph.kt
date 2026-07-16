package com.smaily.skos.knowledge

import java.util.concurrent.ConcurrentHashMap

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * KnowledgeGraph
 *
 * Central in-memory knowledge graph.
 *
 * Responsibilities:
 * - Store knowledge nodes
 * - Store knowledge relations
 * - Query graph contents
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class KnowledgeGraph {

    /**
     * All knowledge nodes.
     */
    private val nodes =
        ConcurrentHashMap<String, KnowledgeNode>()

    /**
     * All knowledge relations.
     */
    private val relations =
        mutableListOf<KnowledgeRelation>()

    /**
     * Adds a node.
     */
    fun addNode(
        node: KnowledgeNode
    ) {
        nodes[node.id] = node
    }

    /**
     * Adds multiple nodes.
     */
    fun addNodes(
        newNodes: Collection<KnowledgeNode>
    ) {
        newNodes.forEach(::addNode)
    }

    /**
     * Adds a relation.
     */
    fun addRelation(
        relation: KnowledgeRelation
    ) {
        relations.add(relation)
    }

    /**
     * Returns a node by identifier.
     */
    fun findNode(
        id: String
    ): KnowledgeNode? =
        nodes[id]

    /**
     * Returns all nodes.
     */
    fun allNodes(): List<KnowledgeNode> =
        nodes.values.toList()

    /**
     * Returns all relations.
     */
    fun allRelations(): List<KnowledgeRelation> =
        relations.toList()

    /**
     * Removes all graph contents.
     */
    fun clear() {
        nodes.clear()
        relations.clear()
    }

    /**
     * Number of nodes.
     */
    fun nodeCount(): Int =
        nodes.size

    /**
     * Number of relations.
     */
    fun relationCount(): Int =
        relations.size
}
