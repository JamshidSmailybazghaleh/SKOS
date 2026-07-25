/*
====================================================
SKOS Mission Control

Product Exporter

File:
product-exporter.js

Operation:
OP-003

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const ProductExporter = {

    async export(product, format) {

        Logger.info(
            "Export Started : " + format
        );

        if (!product) {

            Logger.error(
                "Invalid Product."
            );

            return false;

        }

        switch (format.toLowerCase()) {

            case "pdf":
                return await this.exportPDF(product);

            case "epub":
                return await this.exportEPUB(product);

            case "html":
                return await this.exportHTML(product);

            case "markdown":
                return await this.exportMarkdown(product);

            case "docx":
                return await this.exportDOCX(product);

            default:

                Logger.error(
                    "Unsupported Format : " + format
                );

                return false;

        }

    },

    async exportPDF(product) {

        Logger.info(
            "Generating PDF..."
        );

        return true;

    },

    async exportEPUB(product) {

        Logger.info(
            "Generating EPUB..."
        );

        return true;

    },

    async exportHTML(product) {

        Logger.info(
            "Generating HTML..."
        );

        return true;

    },

    async exportMarkdown(product) {

        Logger.info(
            "Generating Markdown..."
        );

        return true;

    },

    async exportDOCX(product) {

        Logger.info(
            "Generating DOCX..."
        );

        return true;

    }

};

Object.freeze(ProductExporter);
