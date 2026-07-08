/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Connector
 * Module    : MediaStore
 *
 * Build     : BUILD-000168
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    ContentType
} from "../../content-intelligence/src/content-type";

/**
 * MediaStore item.
 */
export interface MediaStoreItem {

    /**
     * Android media identifier.
     */
    id: string;

    /**
     * Display name.
     */
    name: string;

    /**
     * Content URI.
     */
    uri: string;

    /**
     * File size in bytes.
     */
    size: number;

    /**
     * MIME type.
     */
    mimeType: string;

    /**
     * Last modification time.
     */
    modifiedAt: number;

    /**
     * Classified content type.
     */
    contentType: ContentType;

}

/**
 * MediaStore connector.
 */
export class MediaStoreConnector {

    private readonly items: MediaStoreItem[] = [];

    /**
     * Register one media item.
     */
    public add(
        item: MediaStoreItem
    ): void {

        this.items.push(item);

    }

    /**
     * Return all indexed items.
     */
    public list(): MediaStoreItem[] {

        return [...this.items];

    }

    /**
     * Find by identifier.
     */
    public find(
        id: string
    ): MediaStoreItem | undefined {

        return this.items.find(

            item => item.id === id

        );

    }

    /**
     * Remove one item.
     */
    public remove(
        id: string
    ): boolean {

        const index =

            this.items.findIndex(

                item => item.id === id

            );

        if (index < 0) {

            return false;

        }

        this.items.splice(index, 1);

        return true;

    }

    /**
     * Clear MediaStore cache.
     */
    public clear(): void {

        this.items.length = 0;

    }

}
