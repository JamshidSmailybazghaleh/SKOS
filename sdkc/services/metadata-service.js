/*
====================================================
SKOS Mission Control

Metadata Service

File:
metadata-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const MetadataService = {


    async initialize() {

        Logger.info(
            "Metadata Service Initializing..."
        );

        return true;

    },


    create(object, data = {}) {


        if (!object) {

            return false;

        }


        object.metadata = {


            title:

                data.title ||

                object.title,


            description:

                data.description ||

                "",


            author:

                data.author ||

                "",


            language:

                data.language ||

                "",


            category:

                data.category ||

                "",


            tags:

                data.tags ||

                [],


            keywords:

                data.keywords ||

                [],


            created:

                new Date()
                .toISOString(),


            modified:

                new Date()
                .toISOString(),


            checksum:

                ""

        };


        return object.metadata;

    },


    update(object, changes) {


        if (

            !object ||

            !object.metadata

        ) {

            return false;

        }


        Object.assign(

            object.metadata,

            changes

        );


        object.metadata.modified =

            new Date()
            .toISOString();


        return true;

    },


    validate(metadata) {


        if (!metadata) {

            return false;

        }


        const required = [

            "title",

            "language",

            "category"

        ];


        return required.every(

            field =>

            metadata[field]

        );

    },


    normalize(metadata) {


        if (!metadata) {

            return null;

        }


        if (metadata.tags) {

            metadata.tags =

                metadata.tags.map(

                    tag =>

                    tag
                    .toLowerCase()
                    .trim()

                );

        }


        if (metadata.keywords) {

            metadata.keywords =

                metadata.keywords.map(

                    word =>

                    word
                    .toLowerCase()
                    .trim()

                );

        }


        return metadata;

    },


    search(objects, keyword) {


        if (!objects) {

            return [];

        }


        keyword =

            keyword
            .toLowerCase();



        return objects.filter(

            object =>


            JSON.stringify(

                object.metadata

            )

            .toLowerCase()

            .includes(keyword)


        );

    },


    export(object) {


        if (!object) {

            return null;

        }


        return {

            id:

                object.id,


            metadata:

                object.metadata

        };

    },


    status() {

        return "READY";

    }


};


window.MetadataService =

    MetadataService;


Object.freeze(
    MetadataService
);
