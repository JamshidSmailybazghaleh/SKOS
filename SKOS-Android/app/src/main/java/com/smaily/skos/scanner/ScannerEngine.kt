package com.smaily.skos.scanner

import com.smaily.skos.model.asset.KnowledgeAsset
import java.io.File

/**
 * ---------------------------------------------------------
 * SKOS
 * Scanner Engine
 * ---------------------------------------------------------
 *
 * Main coordinator of the scanning process.
 *
 * Responsibilities:
 * - Walk directories
 * - Execute Scan Pipeline
 * - Collect Knowledge Assets
 * - Build Scan Report
 *
 * ---------------------------------------------------------
 */
class ScannerEngine(

    private val walker: DirectoryWalker = DirectoryWalker(),

    private val pipeline: ScanPipeline = ScanPipeline()

) {

    /**
     * Executes a scan.
     */
    fun execute(
        context: ScanContext
    ): List<KnowledgeAsset> {

        val assets = mutableListOf<KnowledgeAsset>()

        context.rootPaths.forEach { root ->

            val rootFile = File(root)

            walker.walk(
                rootFile,
                context.configuration
            ).forEach { file ->

                try {

                    val asset =
                        pipeline.process(file)

                    assets.add(asset)

                } catch (_: Exception) {

                    // در نسخه Alpha خطا ثبت شده و
                    // اسکن ادامه پیدا می‌کند.
                }

            }

        }

        return assets
    }
}
