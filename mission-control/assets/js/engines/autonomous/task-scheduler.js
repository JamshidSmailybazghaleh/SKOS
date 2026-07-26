/*
====================================================
SKOS Mission Control

Task Scheduler

File:
task-scheduler.js

Operation:
OP-008

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const TaskScheduler = {

    initialized: false,

    queue: [],

    async initialize() {

        Logger.info(
            "Task Scheduler Initializing..."
        );

        this.queue = [];

        this.initialized = true;

        Logger.info(
            "Task Scheduler Ready."
        );

        return true;

    },

    add(task) {

        if (!task) {

            Logger.error(
                "Invalid Task."
            );

            return false;

        }

        this.queue.push(task);

        this.sort();

        Logger.info(
            "Task Added : " +
            task.actionId
        );

        return true;

    },

    sort() {

        const priority = {

            HIGH: 1,

            NORMAL: 2,

            LOW: 3

        };

        this.queue.sort((a, b) => {

            return (
                priority[a.priority] -
                priority[b.priority]
            );

        });

    },

    next() {

        if (this.queue.length === 0) {

            return null;

        }

        return this.queue.shift();

    },

    size() {

        return this.queue.length;

    },

    clear() {

        this.queue = [];

        Logger.info(
            "Task Queue Cleared."
        );

    },

    getAll() {

        return this.queue;

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(TaskScheduler);
