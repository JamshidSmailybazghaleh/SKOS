package com.smaily.skos.knowledge

import java.util.concurrent.ConcurrentHashMap

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * InMemoryKnowledgeRepository
 *
 * Default in-memory implementation of KnowledgeRepository.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class InMemoryKnowledgeRepository : KnowledgeRepository {

    /**
     * Internal node storage.
     */
    private val nodes =
        ConcurrentHashMap<String, KnowledgeNode>()

    override fun saveNode(
        node: KnowledgeNode
    ) {
        nodes[node.id] = node
    }

    override fun saveNodes(
        nodes: Collection<KnowledgeNode>
    ) {
        nodes.forEach(::saveNode)
    }

    override fun findNode(
        id: String
    ): KnowledgeNode? =
        nodes[id]

    override fun findAllNodes(): List<KnowledgeNode> =
        nodes.values.toList()

    override fun deleteNode(
        id: String
    ) {
        nodes.remove(id)
    }

    override fun clear() {
        nodes.clear()
    }
}
