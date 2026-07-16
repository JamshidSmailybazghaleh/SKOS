package com.smaily.skos.knowledge

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * KnowledgeService
 *
 * High-level service for manipulating the Knowledge Graph.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class KnowledgeService(

    private val graph: KnowledgeGraph

) {

    /**
     * Adds a knowledge node.
     */
    fun addNode(
        node: KnowledgeNode
    ) {
        graph.addNode(node)
    }

    /**
     * Adds multiple knowledge nodes.
     */
    fun addNodes(
        nodes: Collection<KnowledgeNode>
    ) {
        graph.addNodes(nodes)
    }

    /**
     * Adds a knowledge relation.
     */
    fun addRelation(
        relation: KnowledgeRelation
    ) {
        graph.addRelation(relation)
    }

    /**
     * Finds a node by id.
     */
    fun findNode(
        id: String
    ): KnowledgeNode? =
        graph.findNode(id)

    /**
     * Returns all nodes.
     */
    fun allNodes(): List<KnowledgeNode> =
        graph.allNodes()

    /**
     * Returns all relations.
     */
    fun allRelations(): List<KnowledgeRelation> =
        graph.allRelations()

    /**
     * Clears the graph.
     */
    fun clear() {
        graph.clear()
    }
}
