package com.smaily.skos.workflow

import com.smaily.skos.knowledge.KnowledgeBuilder
import com.smaily.skos.knowledge.KnowledgeRepository
import com.smaily.skos.parser.ParserManager
import com.smaily.skos.search.KnowledgeIndexer
import com.smaily.skos.workflow.steps.BuildKnowledgeStep
import com.smaily.skos.workflow.steps.IndexKnowledgeStep
import com.smaily.skos.workflow.steps.ParseStep
import com.smaily.skos.workflow.steps.StoreKnowledgeStep

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * KnowledgeWorkflow
 *
 * Factory for the standard knowledge processing workflow.
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
object KnowledgeWorkflow {

    fun create(

        parserManager: ParserManager,

        knowledgeBuilder: KnowledgeBuilder,

        repository: KnowledgeRepository,

        indexer: KnowledgeIndexer

    ): WorkflowDefinition {

        return WorkflowDefinition("Knowledge Processing")

            .addStep(
                ParseStep(parserManager)
            )

            .addStep(
                BuildKnowledgeStep(knowledgeBuilder)
            )

            .addStep(
                StoreKnowledgeStep(repository)
            )

            .addStep(
                IndexKnowledgeStep(indexer)
            )
    }
}
