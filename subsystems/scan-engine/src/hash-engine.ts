/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Scan Engine
 * Module    : Hash Engine
 *
 * Build     : BUILD-000169
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Supported hash algorithms.
 */
export enum HashAlgorithm {

    SHA256 = "SHA-256",

    SHA512 = "SHA-512"

}

/**
 * Hash result.
 */
export interface HashResult {

    /**
     * File identifier.
     */
    fileId: string;

    /**
     * Algorithm.
     */
    algorithm: HashAlgorithm;

    /**
     * Calculated hash.
     */
    value: string;

    /**
     * File size.
     */
    size: number;

    /**
     * Creation timestamp.
     */
    createdAt: number;

}

/**
 * Hash Engine.
 */
export class HashEngine {

    /**
     * Calculate file hash.
     *
     * Foundation version.
     */
    public async calculate(

        fileId: string,

        fileSize: number

    ): Promise<HashResult> {

        /**
         * Real SHA-256 implementation
         * will be connected here.
         */

        return {

            fileId,

            algorithm: HashAlgorithm.SHA256,

            value: "",

            size: fileSize,

            createdAt: Date.now()

        };

    }

    /**
     * Compare two hashes.
     */
    public equals(

        first: HashResult,

        second: HashResult

    ): boolean {

        return (

            first.algorithm === second.algorithm &&

            first.value === second.value

        );

    }

}
