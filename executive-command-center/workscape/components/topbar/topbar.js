/*
==========================================================
SKOS Executive Command Center
WorkScape Topbar Component
Version : 1.0.0
Component : Topbar
==========================================================
*/

class Topbar {

    constructor() {

        this.menuButton = null;

        this.refreshButton = null;

        this.notificationButton = null;

        this.searchInput = null;

    }

    initialize() {

        this.menuButton =
            document.getElementById(
                "menu-toggle"
            );

        this.refreshButton =
            document.getElementById(
                "refresh-button"
            );

        this.notificationButton =
            document.getElementById(
                "notification-button"
            );

        this.searchInput =
            document.getElementById(
                "workspace-search"
            );

        this.registerEvents();

        console.info(
            "[Topbar] Initialized"
        );

    }

    registerEvents() {

        if(this.menuButton){

            this.menuButton.addEventListener(

                "click",

                () => {

                    this.toggleSidebar();

                }

            );

        }

        if(this.refreshButton){

            this.refreshButton.addEventListener(

                "click",

                () => {

                    this.refreshWorkspace();

                }

            );

        }

        if(this.notificationButton){

            this.notificationButton.addEventListener(

                "click",

                () => {

                    this.openNotifications();

                }

            );

        }

        if(this.searchInput){

            this.searchInput.addEventListener(

                "input",

                (event)=>{

                    this.search(
                        event.target.value
                    );

                }

            );

        }

    }

    toggleSidebar(){

        console.info(
            "[Topbar] Toggle Sidebar"
        );

        /*
        Future

        Sidebar Controller
        */

    }

    refreshWorkspace(){

        console.info(
            "[Topbar] Refresh Workspace"
        );

        /*
        Future

        Dashboard Renderer
        Workspace Controller
        */

    }

    openNotifications(){

        console.info(
            "[Topbar] Notifications"
        );

        /*
        Future

        Notification Panel
        */

    }

    search(query){

        console.info(

            "[Topbar] Search:",

            query

        );

        /*
        Future

        Search Engine
        Data Loader
        */

    }

    shutdown(){

        console.info(

            "[Topbar] Shutdown"

        );

    }

}

/* ==========================================
   Bootstrap
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        const topbar =
            new Topbar();

        topbar.initialize();

    }

);
