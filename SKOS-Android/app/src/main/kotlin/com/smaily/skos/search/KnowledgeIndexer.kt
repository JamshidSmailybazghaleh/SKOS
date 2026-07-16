package com.smaily.skos.search

import com.smaily.skos.knowledge.KnowledgeNode
import java.util.concurrent.ConcurrentHashMap

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * KnowledgeIndexer
 *
 * In-memory search index.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
class KnowledgeIndexer {

    /**
     * Token -> Node Ids
     */
    private val index =
        ConcurrentHashMap<String, MutableSet<String>>()

    /**
     * Builds index for a node.
     */
    fun index(node: KnowledgeNode) {

        tokenize(node.title)
            .forEach { add(it, node.id) }

        tokenize(node.content)
            .forEach { add(it, node.id) }

        node.tags
            .forEach { tag ->
                add(tag.lowercase(), node.id)
            }
    }

    /**
     * Removes a node from index.
     */
    fun remove(node: KnowledgeNode) {

        index.values.forEach {
            it.remove(node.id)
        }
    }

    /**
     * Searches node identifiers.
     */
    fun search(
        query: SearchQuery
    ): Set<String> {

        val key =
            if (query.caseSensitive)
                query.text
            else
                query.text.lowercase()

        return index[key] ?: emptySet()
    }

    /**
     * Clears index.
     */
    fun clear() {
        index.clear()
    }

    private fun add(
        token: String,
        nodeId: String
    ) {
        index
            .computeIfAbsent(token) {
                mutableSetOf()
            }
            .add(nodeId)
    }

    private fun tokenize(
        text: String
    ): List<String> {

        return text
            .lowercase()
            .split(Regex("\\W+"))
            .filter { it.isNotBlank() }
    }
}
