/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module  : File Type Classifier
 * Build   : BUILD-000179
 * Version : 1.0.0
 * ==========================================================
 */

import { FileCategory } from "./file-metadata";

export class FileTypeClassifier {

    /**
     * Detect file category by extension.
     */
    public classify(
        extension: string
    ): FileCategory {

        switch (extension.toLowerCase()) {

            case "pdf":
            case "doc":
            case "docx":
            case "txt":
            case "rtf":
            case "odt":
                return FileCategory.Document;

            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
            case "webp":
                return FileCategory.Image;

            case "mp3":
            case "wav":
            case "aac":
            case "flac":
                return FileCategory.Audio;

            case "mp4":
            case "mkv":
            case "avi":
            case "mov":
                return FileCategory.Video;

            case "zip":
            case "rar":
            case "7z":
            case "tar":
                return FileCategory.Archive;

            case "ts":
            case "js":
            case "java":
            case "cpp":
            case "c":
            case "cs":
            case "py":
            case "go":
            case "rs":
                return FileCategory.SourceCode;

            case "db":
            case "sqlite":
            case "sqlite3":
                return FileCategory.Database;

            case "exe":
            case "apk":
                return FileCategory.Executable;

            default:
                return FileCategory.Unknown;
        }

    }

}
