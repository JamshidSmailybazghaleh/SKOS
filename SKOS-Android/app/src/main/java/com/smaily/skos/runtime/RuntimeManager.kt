package com.smaily.skos.runtime

import android.content.Context

class RuntimeManager(

    private val context: Context

) {

    private var initialized = false

    fun initialize() {

        if (initialized) {

            return

        }

        /*
         * BUILD-195 Runtime
         */

        initializeKernel()

        initializeServiceRegistry()

        initializeEventBus()

        initializeTaskScheduler()

        initializeRuntimeMonitor()

        initialized = true

    }

    private fun initializeKernel() {

    }

    private fun initializeServiceRegistry() {

    }

    private fun initializeEventBus() {

    }

    private fun initializeTaskScheduler() {

    }

    private fun initializeRuntimeMonitor() {

    }

    fun shutdown() {

        initialized = false

    }

    fun isRunning(): Boolean {

        return initialized

    }

}
