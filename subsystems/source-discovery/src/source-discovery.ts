/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Discovery
 * Module    : Source Discovery Manager
 *
 * Build     : BUILD-000165
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    SourceDescriptor
} from "./source-descriptor";

import {
    IntakeScanner
} from "./intake-scanner";

import {
    ScanResult
} from "./scan-result";

/**
 * Source Discovery Manager.
 */
export class SourceDiscovery {

    /**
     * Registered sources.
     */
    private readonly sources =
        new Map<string, SourceDescriptor>();

    /**
     * Intake scanner.
     */
    private readonly scanner =
        new IntakeScanner();

    /**
     * Latest scan results.
     */
    private readonly history: ScanResult[] = [];

    /**
     * Register a source.
     */
    public register(
        source: SourceDescriptor
    ): void {

        this.sources.set(
            source.id,
            source
        );

    }

    /**
     * Remove a source.
     */
    public unregister(
        sourceId: string
    ): boolean {

        return this.sources.delete(sourceId);

    }

    /**
     * Retrieve one source.
     */
    public get(
        sourceId: string
    ): SourceDescriptor | undefined {

        return this.sources.get(sourceId);

    }

    /**
     * Retrieve all sources.
     */
    public getAll(): SourceDescriptor[] {

        return Array.from(
            this.sources.values()
        );

    }

    /**
     * Scan one source.
     */
    public scan(
        sourceId: string
    ): ScanResult | undefined {

        const source =
            this.sources.get(sourceId);

        if (!source) {

            return undefined;

        }

        const result =
            this.scanner.scan(source);

        source.lastScan = Date.now();

        this.history.push(result);

        return result;

    }

    /**
     * Scan every registered source.
     */
    public scanAll(): ScanResult[] {

        const results: ScanResult[] = [];

        for (const source of this.sources.values()) {

            const result =
                this.scanner.scan(source);

            source.lastScan = Date.now();

            this.history.push(result);

            results.push(result);

        }

        return results;

    }

    /**
     * Scan history.
     */
    public historyList(): ScanResult[] {

        return [

            ...this.history

        ];

    }

    /**
     * Clear history.
     */
    public clearHistory(): void {

        this.history.length = 0;

    }

}
