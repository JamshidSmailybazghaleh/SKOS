package com.smaily.skos.scanner

import com.smaily.skos.engine.MissionResult
import java.util.concurrent.atomic.AtomicBoolean

/**
 * پیاده‌سازی اصلی ScannerEngine
 */
class ScannerService(

    private val pipeline: ScanPipeline

) : ScannerEngine {

    private val running = AtomicBoolean(false)

    private val paused = AtomicBoolean(false)

    override fun scanFolder(

        path: String

    ): MissionResult {

        if (running.get()) {

            return MissionResult(

                success = false,

                message = "Scanner is already running."

            )

        }

        running.set(true)

        try {

            val context = ScanContext(

                rootPath = path

            )

            return pipeline.execute(context)

        } finally {

            running.set(false)

            paused.set(false)

        }

    }

    override fun stop() {

        running.set(false)

    }

    override fun pause() {

        if (running.get()) {

            paused.set(true)

        }

    }

    override fun resume() {

        if (running.get()) {

            paused.set(false)

        }

    }

    override fun isRunning(): Boolean {

        return running.get()

    }

    fun isPaused(): Boolean {

        return paused.get()

    }

}
