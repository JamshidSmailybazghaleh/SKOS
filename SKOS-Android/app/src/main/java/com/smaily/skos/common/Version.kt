package com.smaily.skos.common

import java.io.Serializable

/**
 * ---------------------------------------------------------
 * SKOS Professional
 * Version
 * ---------------------------------------------------------
 * Represents semantic version information for SKOS
 * and its components.
 * ---------------------------------------------------------
 */
data class Version(

    /**
     * Major version.
     */
    val major: Int,

    /**
     * Minor version.
     */
    val minor: Int,

    /**
     * Patch version.
     */
    val patch: Int,

    /**
     * Optional release label.
     * Examples:
     * Alpha, Beta, RC, Stable
     */
    val label: String = "",

    /**
     * Build number.
     */
    val build: String = ""

) : Comparable<Version>, Serializable {

    override fun compareTo(other: Version): Int {

        if (major != other.major)
            return major.compareTo(other.major)

        if (minor != other.minor)
            return minor.compareTo(other.minor)

        if (patch != other.patch)
            return patch.compareTo(other.patch)

        return 0
    }

    /**
     * Returns semantic version.
     */
    fun semantic(): String =
        "$major.$minor.$patch"

    /**
     * Returns full version string.
     */
    fun full(): String {

        val version = StringBuilder()

        version.append(semantic())

        if (label.isNotBlank()) {
            version.append("-")
            version.append(label)
        }

        if (build.isNotBlank()) {
            version.append(" (")
            version.append(build)
            version.append(")")
        }

        return version.toString()
    }

    override fun toString(): String = full()

    companion object {

        /**
         * Current SKOS Version.
         */
        val CURRENT = Version(
            major = 0,
            minor = 2,
            patch = 0,
            label = "Alpha",
            build = "BUILD-000002"
        )
    }
}
