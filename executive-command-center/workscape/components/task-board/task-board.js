/*
==========================================================
SKOS Executive Command Center
Task Board Component
Version : 1.0.0
Component : Task Board
==========================================================
*/


class TaskBoard {


    constructor(){

        this.summary = {};

        this.columns = {};

        this.tasks = [];

    }



    initialize(){


        this.summary = {

            todo:
                document.getElementById(
                    "todo-summary"
                ),

            progress:
                document.getElementById(
                    "progress-summary"
                ),

            completed:
                document.getElementById(
                    "completed-summary"
                ),

            priority:
                document.getElementById(
                    "priority-summary"
                )

        };



        this.columns = {

            todo:
                document.getElementById(
                    "todo-column"
                ),

            progress:
                document.getElementById(
                    "progress-column"
                ),

            completed:
                document.getElementById(
                    "completed-column"
                )

        };



        this.render();


        this.registerEvents();



        console.info(
            "[Task Board] Initialized"
        );


    }




    registerEvents(){


        /*
        Future:

        Drag & Drop
        Task Selection
        Task Editing
        Status Change
        */


    }





    render(){


        this.renderSummary();


        this.renderColumns();


    }





    renderSummary(){


        this.summary.todo.innerHTML = `

            <h3>To Do</h3>

            <p>0 Tasks</p>

        `;



        this.summary.progress.innerHTML = `

            <h3>In Progress</h3>

            <p>0 Tasks</p>

        `;



        this.summary.completed.innerHTML = `

            <h3>Completed</h3>

            <p>0 Tasks</p>

        `;



        this.summary.priority.innerHTML = `

            <h3>Priority</h3>

            <p>No Priority Task</p>

        `;


    }





    renderColumns(){


        this.columns.todo.innerHTML = `

            <h3>To Do</h3>

            <div class="task-item todo">

                <span class="task-title">

                    No Task Loaded

                </span>

                <span class="task-meta">

                    Waiting for task data...

                </span>

            </div>

        `;



        this.columns.progress.innerHTML = `

            <h3>In Progress</h3>

            <div class="task-item in-progress">

                <span class="task-title">

                    No Active Task

                </span>

                <span class="task-meta">

                    Waiting for execution...

                </span>

            </div>

        `;



        this.columns.completed.innerHTML = `

            <h3>Completed</h3>

            <div class="task-item completed">

                <span class="task-title">

                    No Completed Task

                </span>

                <span class="task-meta">

                    History is empty...

                </span>

            </div>

        `;


    }





    load(tasks){


        this.tasks = tasks;


        this.refresh();


    }





    refresh(){


        console.info(

            "[Task Board] Refresh"

        );


        this.render();


    }





    shutdown(){


        console.info(

            "[Task Board] Shutdown"

        );


    }


}



/* ==========================================
   Bootstrap
========================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        const taskBoard =
            new TaskBoard();


        taskBoard.initialize();


    }

);
