/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module  : Metadata Extractor
 * Build   : BUILD-000179
 * Version : 1.0.0
 * ==========================================================
 */

import {
    FileMetadata,
    FileCategory
} from "./file-metadata";

export class MetadataExtractor {

    /**
     * Extract metadata from a file.
     */
    public extract(filePath: string): FileMetadata {

        const fileName = this.getFileName(filePath);

        const extension = this.getExtension(fileName);

        return {

            id: filePath,

            name: fileName,

            path: filePath,

            extension,

            category: this.detectCategory(extension),

            size: 0,

            readable: true,

            writable: false,

            hidden: fileName.startsWith("."),

            createdAt: undefined,

            modifiedAt: undefined

        };

    }

    private getFileName(path: string): string {

        const parts = path.split("/");

        return parts[parts.length - 1];

    }

    private getExtension(name: string): string {

        const index = name.lastIndexOf(".");

        if (index < 0) {

            return "";

        }

        return name.substring(index + 1).toLowerCase();

    }

    private detectCategory(
        extension: string
    ): FileCategory {

        switch (extension) {

            case "pdf":

            case "doc":

            case "docx":

            case "txt":

                return FileCategory.Document;

            case "jpg":

            case "jpeg":

            case "png":

            case "gif":

                return FileCategory.Image;

            case "mp3":

            case "wav":

                return FileCategory.Audio;

            case "mp4":

            case "mkv":

                return FileCategory.Video;

            case "zip":

            case "rar":

            case "7z":

                return FileCategory.Archive;

            case "ts":

            case "js":

            case "java":

            case "cpp":

            case "py":

                return FileCategory.SourceCode;

            default:

                return FileCategory.Unknown;

        }

    }

}
