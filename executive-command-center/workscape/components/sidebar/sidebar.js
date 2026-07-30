/*
==========================================================
SKOS Executive Command Center
WorkScape Sidebar Component
Version : 1.0.0
Component : Sidebar
==========================================================
*/

class Sidebar {

    constructor() {

        this.links = [];

        this.activeLink = null;

    }

    initialize() {

        this.links = document.querySelectorAll(
            ".sidebar-navigation a"
        );

        this.registerEvents();

        console.info(
            "[Sidebar] Initialized"
        );

    }

    registerEvents() {

        this.links.forEach(link => {

            link.addEventListener(
                "click",
                (event) => {

                    this.onNavigationClick(
                        event,
                        link
                    );

                }

            );

        });

    }

    onNavigationClick(event, link) {

        event.preventDefault();

        this.setActive(link);

        const target =
            link.getAttribute("href");

        console.info(
            "[Sidebar] Navigate:",
            target
        );

        /*
        Future Integration

        Workspace Controller
        State Manager
        Navigation Manager
        */

    }

    setActive(link) {

        this.links.forEach(item => {

            item.classList.remove(
                "active"
            );

        });

        link.classList.add(
            "active"
        );

        this.activeLink = link;

    }

    shutdown() {

        console.info(
            "[Sidebar] Shutdown"
        );

    }

}

/* ==========================================
   Bootstrap
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const sidebar =
            new Sidebar();

        sidebar.initialize();

    }

);
