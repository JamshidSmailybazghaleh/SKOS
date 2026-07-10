/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module : Native Storage Discovery
 * Build  : BUILD-000178
 * ==========================================================
 */

import {
    StorageInfo
} from "./storage-provider";

import {
    AndroidPlatformAdapter
} from "./android-platform-adapter";

export class StorageDiscovery {

    constructor(
        private readonly adapter: AndroidPlatformAdapter
    ) {}

    /**
     * Discover available storage sources.
     */
    public async discover(): Promise<StorageInfo[]> {

        const roots =
            await this.adapter.getStorageRoots();

        const result: StorageInfo[] = [];

        for (const root of roots) {

            result.push({

                id: root,

                name: root,

                type: root.includes("emulated")
                    ? "internal" as any
                    : "sdcard" as any,

                rootPath: root,

                state: "ready" as any,

                readable: true,

                writable: true

            });

        }

        return result;

    }

}
