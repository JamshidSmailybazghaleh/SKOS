/*
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build : BUILD-000196
 * File  : settings.gradle.kts
 * Version : 1.0.0
 *
 * Description:
 * Root Gradle Settings
 * ==========================================================
 */

pluginManagement {

    repositories {

        google()

        mavenCentral()

        gradlePluginPortal()

    }

}

dependencyResolutionManagement {

    repositoriesMode.set(

        RepositoriesMode.FAIL_ON_PROJECT_REPOS

    )

    repositories {

        google()

        mavenCentral()

    }

}

rootProject.name = "SKOS-Android"

include(":app")
