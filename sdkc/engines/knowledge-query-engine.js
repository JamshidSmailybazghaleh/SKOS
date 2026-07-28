/*
====================================================
SKOS Mission Control

Knowledge Query Engine

BUILD-000361

Version:
1.0

Status:
ACTIVE
====================================================
*/

const KnowledgeQueryEngine = {

    async initialize() {

        Logger.info(
            "Knowledge Query Engine Initializing..."
        );

        return true;

    },

    async query(searchText) {

        if (!searchText) {

            return [];

        }

        searchText =
            searchText
            .toLowerCase()
            .trim();

        const index =

            await RepositoryEngine.getIndex();

        if (!index) {

            return [];

        }

        const matches =

            index.objects.filter(

                object =>

                this.match(

                    object,

                    searchText

                )

            );

        const results = [];

        for (const item of matches) {

            const object =

                await RepositoryService.load(

                    item.id

                );

            if (object) {

                results.push(object);

            }

        }

        return this.rank(results);

    },

    match(object, query) {

        const searchable = [

            object.title,

            object.id,

            object.metadata.author,

            object.metadata.category,

            ...(object.metadata.tags || []),

            ...(object.metadata.keywords || [])

        ]

        .join(" ")

        .toLowerCase();

        return searchable.includes(query);

    },

    rank(results) {

        return results.sort(

            (a, b) =>

            a.title.localeCompare(b.title)

        );

    },

    async byId(id) {

        return await RepositoryService.load(id);

    },

    async byAuthor(author) {

        return this.query(author);

    },

    async byCategory(category) {

        return this.query(category);

    },

    async byTag(tag) {

        return this.query(tag);

    },

    status() {

        return "READY";

    }

};

window.KnowledgeQueryEngine =
    KnowledgeQueryEngine;

Object.freeze(
    KnowledgeQueryEngine);
