/*
====================================================
SKOS Mission Control

Knowledge Browser

File:
knowledge-browser.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const KnowledgeBrowser = {

    objects: [],

    async initialize() {

        Logger.info(
            "Knowledge Browser Initializing..."
        );

        await this.loadIndex();

        this.render();

        return true;

    },

    async loadIndex() {

        const statistics =

            RepositoryService.getStatistics();

        if (!statistics) {

            await RepositoryService.initialize();

        }

        const manifest =

            RepositoryService.getManifest();

        if (!manifest) {

            Logger.warning(
                "Repository Manifest Not Available."
            );

        }

        if (

            RepositoryEngine.index &&

            RepositoryEngine.index.objects

        ) {

            this.objects =

                RepositoryEngine.index.objects;

        }

        Logger.info(
            "Knowledge Browser Loaded."
        );

    },

    render() {

        const container =

            document.getElementById(

                "knowledge-browser-container"

            );

        if (!container) {

            Logger.warning(

                "Knowledge Browser Container Missing."

            );

            return;

        }

        container.innerHTML = "";

        if (this.objects.length === 0) {

            container.innerHTML =

                "<p>No Knowledge Objects Found.</p>";

            return;

        }

        this.objects.forEach(object => {

            const item =

                document.createElement("div");

            item.className =

                "knowledge-object";

            item.innerHTML =

                "<strong>" +

                object.id +

                "</strong><br>" +

                object.title +

                "<br><small>" +

                object.type +

                "</small>";

            item.onclick = () => {

                this.open(object.id);

            };

            container.appendChild(item);

        });

    },

    async open(id) {

        Logger.info(

            "Opening Knowledge Object: " +

            id

        );

        const object =

            await RepositoryService.getObject(id);

        if (!object) {

            Logger.error(

                "Knowledge Object Not Found."

            );

            return;

        }

        this.renderMetadata(object);

    },

    renderMetadata(object) {

        const panel =

            document.getElementById(

                "knowledge-metadata"

            );

        if (!panel) {

            return;

        }

        panel.innerHTML =

        `
        <h3>${object.title}</h3>

        <p><b>ID:</b> ${object.id}</p>

        <p><b>Type:</b> ${object.type}</p>

        <p><b>Version:</b> ${object.version}</p>

        <p><b>Status:</b> ${object.status}</p>

        <p><b>Author:</b> ${object.metadata.author}</p>

        <p><b>Language:</b> ${object.metadata.language}</p>

        <p><b>Category:</b> ${object.metadata.category}</p>
        `;

    },

    search(keyword) {

        keyword =

            keyword.toLowerCase();

        return this.objects.filter(object =>

            object.id

                .toLowerCase()

                .includes(keyword)

            ||

            object.title

                .toLowerCase()

                .includes(keyword)

            ||

            object.type

                .toLowerCase()

                .includes(keyword)

        );

    }

};

window.KnowledgeBrowser =

KnowledgeBrowser;

Object.freeze(KnowledgeBrowser);
