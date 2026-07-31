/*
==========================================================
SKOS Executive Command Center
Base Renderer
Version : 1.0.0
BUILD : BUILD-000013
==========================================================
*/

class BaseRenderer {

    constructor(containerId = null) {

        this.containerId = containerId;

        this.container = null;

        this.initialized = false;

    }


    initialize() {

        if (this.containerId) {

            this.container =

                document.getElementById(

                    this.containerId

                );

        }

        this.initialized = true;

    }


    render(data = null) {

        console.warn(

            "[BaseRenderer] render() should be overridden.",

            data

        );

    }


    refresh(data = null) {

        this.clear();

        this.render(data);

    }


    clear() {

        if (

            this.container

        ) {

            this.container.innerHTML = "";

        }

    }


    show() {

        if (

            this.container

        ) {

            this.container.style.display = "";

        }

    }


    hide() {

        if (

            this.container

        ) {

            this.container.style.display =

                "none";

        }

    }


    destroy() {

        this.clear();

        this.container = null;

        this.initialized = false;

    }


    isReady() {

        return this.initialized;

    }

}

export default BaseRenderer;
