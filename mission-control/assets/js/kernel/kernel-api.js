/*
====================================================
SKOS Mission Control

Kernel API

File:
kernel-api.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const KernelAPI = {

    Registry: {

        async Load() {

            return await Registry.load();

        }

    }

};

window.KernelAPI = KernelAPI;

Object.freeze(KernelAPI);
