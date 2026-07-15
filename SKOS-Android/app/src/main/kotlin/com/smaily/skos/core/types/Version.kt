package com.smaily.skos.core.types

/**
 * ------------------------------------------------------------------
 * SKOS (Smaily Knowledge Operating System)
 * ------------------------------------------------------------------
 * Version
 *
 * Immutable semantic version representation.
 *
 * Format:
 * Major.Minor.Patch
 *
 * Example:
 * 1.0.0
 *
 * Version : 1.0.0
 * ------------------------------------------------------------------
 */
data class Version(

    val major: Int,

    val minor: Int,

    val patch: Int

) : Comparable<Version> {

    init {
        require(major >= 0) { "Major version cannot be negative." }
        require(minor >= 0) { "Minor version cannot be negative." }
        require(patch >= 0) { "Patch version cannot be negative." }
    }

    override fun compareTo(other: Version): Int {

        if (major != other.major)
            return major.compareTo(other.major)

        if (minor != other.minor)
            return minor.compareTo(other.minor)

        return patch.compareTo(other.patch)
    }

    override fun toString(): String =
        "$major.$minor.$patch"

    companion object {

        /**
         * Parses a semantic version string.
         *
         * Example:
         * 1.2.3
         */
        fun parse(version: String): Version {

            val parts = version.split(".")

            require(parts.size == 3) {
                "Invalid semantic version: $version"
            }

            return Version(
                parts[0].toInt(),
                parts[1].toInt(),
                parts[2].toInt()
            )
        }
    }
}
