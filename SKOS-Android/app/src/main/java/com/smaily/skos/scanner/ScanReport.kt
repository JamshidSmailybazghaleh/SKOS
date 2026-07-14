package com.smaily.skos.scanner

/**
 * ---------------------------------------------------------
 * SKOS - Smaily Knowledge Operating System
 * Scan Report
 * ---------------------------------------------------------
 *
 * Final report produced after a scan operation.
 *
 * Author : Jamshid Smaily Bazghaleh
 * Architecture : SKOS Professional Alpha
 * Version : 1.0.0
 * ---------------------------------------------------------
 */
data class ScanReport(

    /**
     * Scan context.
     */
    val context: ScanContext,

    /**
     * Final scan statistics.
     */
    val statistics: ScanStatistics,

    /**
     * Final scan progress.
     */
    val progress: ScanProgress,

    /**
     * Report creation timestamp.
     */
    val generatedAt: Long = System.currentTimeMillis(),

    /**
     * Optional warnings.
     */
    val warnings: List<String> = emptyList(),

    /**
     * Optional errors.
     */
    val errors: List<String> = emptyList()

) {

    /**
     * Returns true if report contains errors.
     */
    fun hasErrors(): Boolean =
        errors.isNotEmpty()

    /**
     * Returns true if report contains warnings.
     */
    fun hasWarnings(): Boolean =
        warnings.isNotEmpty()

    /**
     * Returns true if scan finished successfully.
     */
    fun isSuccessful(): Boolean =
        progress.isFinished() &&
        !hasErrors()

    /**
     * Total number of issues.
     */
    fun issueCount(): Int =
        warnings.size + errors.size
}
