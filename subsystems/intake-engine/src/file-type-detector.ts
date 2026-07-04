/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : File Type Detector
 *
 * Build     : BUILD-000021
 * Sprint    : Sprint 02
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

export enum SourceType {

    PDF = "pdf",

    IMAGE = "image",

    AUDIO = "audio",

    VIDEO = "video",

    TEXT = "text",

    HTML = "html",

    UNKNOWN = "unknown"

}

export class FileTypeDetector {

    public detect(path: string): SourceType {

        const value = path.toLowerCase();

        if (value.endsWith(".pdf")) return SourceType.PDF;

        if (
            value.endsWith(".jpg") ||
            value.endsWith(".jpeg") ||
            value.endsWith(".png") ||
            value.endsWith(".webp")
        ) return SourceType.IMAGE;

        if (
            value.endsWith(".mp3") ||
            value.endsWith(".wav")
        ) return SourceType.AUDIO;

        if (
            value.endsWith(".mp4") ||
            value.endsWith(".mkv")
        ) return SourceType.VIDEO;

        if (
            value.endsWith(".txt") ||
            value.endsWith(".md")
        ) return SourceType.TEXT;

        if (
            value.endsWith(".html") ||
            value.endsWith(".htm")
        ) return SourceType.HTML;

        return SourceType.UNKNOWN;

    }

}
