/*
====================================================
SKOS Mission Control

Asset Search

File:
asset-search.js

Operation:
OP-002

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AssetSearch = {

    searchById(assetId) {

        Logger.info(
            "Search By ID : " + assetId
        );

        return AssetRegistry.get(assetId);

    },

    searchByTitle(title) {

        Logger.info(
            "Search By Title : " + title
        );

        return AssetRegistry.getAll().filter(

            asset =>

                asset.title &&
                asset.title
                    .toLowerCase()
                    .includes(title.toLowerCase())

        );

    },

    searchByCategory(category) {

        Logger.info(
            "Search By Category : " + category
        );

        return AssetRegistry.getAll().filter(

            asset =>

                asset.category === category

        );

    },

    searchByAuthor(author) {

        Logger.info(
            "Search By Author : " + author
        );

        return AssetRegistry.getAll().filter(

            asset =>

                asset.author &&
                asset.author
                    .toLowerCase()
                    .includes(author.toLowerCase())

        );

    },

    searchByLanguage(language) {

        Logger.info(
            "Search By Language : " + language
        );

        return AssetRegistry.getAll().filter(

            asset =>

                asset.language === language

        );

    },

    searchByStatus(status) {

        Logger.info(
            "Search By Status : " + status
        );

        return AssetRegistry.getAll().filter(

            asset =>

                asset.status === status

        );

    },

    searchAll(keyword) {

        Logger.info(
            "Global Search : " + keyword
        );

        return AssetRegistry.getAll().filter(

            asset =>

                (asset.title &&
                 asset.title.toLowerCase().includes(keyword.toLowerCase()))

                ||

                (asset.author &&
                 asset.author.toLowerCase().includes(keyword.toLowerCase()))

                ||

                (asset.category &&
                 asset.category.toLowerCase().includes(keyword.toLowerCase()))

        );

    }

};

Object.freeze(AssetSearch);
