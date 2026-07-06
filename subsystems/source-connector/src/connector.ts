/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Connector
 * Module    : Connector Interface
 *
 * Build     : BUILD-000141
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { SourceInfo } from "./source-info";
import { ScanResult } from "./scan-result";

export interface SourceConnector {

    connect(): Promise<boolean>;

    disconnect(): Promise<void>;

    scan(): Promise<ScanResult>;

    getSourceInfo(): SourceInfo;

}
