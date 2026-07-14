package com.smaily.skos.model.asset

/**
 * ---------------------------------------------------------
 * SKOS
 * Asset Type
 * ---------------------------------------------------------
 *
 * Represents the specific type of a Knowledge Asset.
 *
 * More detailed than AssetCategory.
 *
 * Technology independent.
 * ---------------------------------------------------------
 */
enum class AssetType {

    UNKNOWN,

    // Documents
    PDF,
    DOC,
    DOCX,
    TXT,
    RTF,
    ODT,
    HTML,
    XML,
    JSON,
    CSV,
    MARKDOWN,

    // Books
    EPUB,
    MOBI,

    // Images
    JPG,
    JPEG,
    PNG,
    GIF,
    BMP,
    TIFF,
    SVG,
    WEBP,

    // Audio
    MP3,
    WAV,
    AAC,
    FLAC,
    OGG,
    M4A,

    // Video
    MP4,
    MKV,
    AVI,
    MOV,
    WEBM,

    // Source Code
    KOTLIN,
    JAVA,
    PYTHON,
    CPP,
    CSHARP,
    JAVASCRIPT,
    TYPESCRIPT,
    GO,
    RUST,
    PHP,
    SWIFT,

    // Data
    SQL,
    SQLITE,

    // Archives
    ZIP,
    RAR,
    SEVEN_Z,
    TAR,
    GZIP,

    // Office
    XLS,
    XLSX,
    PPT,
    PPTX,

    // Configuration
    YAML,
    PROPERTIES,
    TOML,

    // Executable
    APK,
    JAR,
    EXE,
    DLL,

    OTHER
}
