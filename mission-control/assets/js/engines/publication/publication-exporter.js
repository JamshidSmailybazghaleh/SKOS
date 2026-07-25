/*
====================================================
SKOS Mission Control

Publication Exporter

File:
publication-exporter.js

Engine:
OP-001

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const PublicationExporter = {

    async export(asset, format) {

        Logger.info(
            "Export Started : " + format
        );

        if (!asset) {

            Logger.error(
                "No Asset Supplied."
            );

            return false;

        }

        switch (format.toLowerCase()) {

            case "pdf":

                return await this.exportPDF(asset);

            case "epub":

                return await this.exportEPUB(asset);

            case "html":

                return await this.exportHTML(asset);

            case "markdown":

                return await this.exportMarkdown(asset);

            case "docx":

                return await this.exportDOCX(asset);

            default:

                Logger.error(
                    "Unknown Export Format."
                );

                return false;

        }

    },

    async exportPDF(asset) {

        Logger.info(
            "Generating PDF..."
        );

        return true;

    },

    async exportEPUB(asset) {

        Logger.info(
            "Generating EPUB..."
        );

        return true;

    },

    async exportHTML(asset) {

        Logger.info(
            "Generating HTML..."
        );

        return true;

    },

    async exportMarkdown(asset) {

        Logger.info(
            "Generating Markdown..."
        );

        return true;

    },

    async exportDOCX(asset) {

        Logger.info(
            "Generating DOCX..."
        );

        return true;

    }

};

Object.freeze(PublicationExporter);
