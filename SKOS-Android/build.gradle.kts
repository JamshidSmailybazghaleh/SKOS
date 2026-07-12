/*
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build   : BUILD-000196
 * File    : build.gradle.kts (Root)
 * Version : 1.0.0
 *
 * Description:
 * Root Gradle Build Configuration
 * ==========================================================
 */

plugins {

    id("com.android.application") version "8.6.1" apply false

    id("org.jetbrains.kotlin.android") version "2.0.21" apply false

}

tasks.register("clean", Delete::class) {

    delete(rootProject.layout.buildDirectory)

}
