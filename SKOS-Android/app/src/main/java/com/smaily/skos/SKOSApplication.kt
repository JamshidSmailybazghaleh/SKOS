/*
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build   : BUILD-000196
 * File    : SKOSApplication.kt
 * Version : 1.0.0
 * ==========================================================
 */

package com.smaily.skos

import android.app.Application

class SKOSApplication : Application() {

    lateinit var runtimeManager: RuntimeManager
        private set

    override fun onCreate() {

        super.onCreate()

        initializeRuntime()

    }

    private fun initializeRuntime() {

        runtimeManager = RuntimeManager(this)

        runtimeManager.initialize()

    }

    override fun onTerminate() {

        runtimeManager.shutdown()

        super.onTerminate()

    }

}
