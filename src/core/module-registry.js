"use strict";

/**
 * ==========================================================
 * SKOS Module Registry
 * ==========================================================
 *
 * BUILD      : BUILD-000909.3
 * VERSION    : 1.0.0
 *
 * Responsibility:
 *
 * - Module Registration
 * - Dependency Management
 * - Capability Discovery
 * - Lifecycle Coordination
 * - Runtime Integration
 *
 * ==========================================================
 */


class ModuleRegistry {


    constructor(options = {}) {


        this.name =

            "SKOS Module Registry";


        this.version =

            "1.0.0";


        this.modules =

            new Map();


        this.dependencies =

            new Map();


        this.capabilityIndex =

            new Map();


        this.status =

            "CREATED";


        this.runtimeContext =

            null;


        this.metadata = {


            createdAt:

                new Date(),


            registeredCount:

                0,


            removedCount:

                0



        };


    }

/**
 * ==========================================================
 * Runtime Context
 * ==========================================================
 */


setRuntimeContext(

    context

){


    this.runtimeContext =

        context;


    return true;


}

initialize(){


    this.status =

        "INITIALIZED";


    return true;


}

/**
 * ==========================================================
 * Register Module
 * ==========================================================
 */


register(

    module

){


    if(!module){

        throw new Error(

            "Invalid module."

        );

    }



    if(!module.name){

        throw new Error(

            "Module name required."

        );

    }



    if(

        this.modules.has(

            module.name

        )

    ){

        throw new Error(

            "Module already exists."

        );

    }



    this.modules.set(

        module.name,

        module

    );



    this.metadata.registeredCount++;



    this.indexCapabilities(

        module

    );



    return module;


}

/**
 * Get Module
 * ==========================================================
 */


get(

    name

){


    return (

        this.modules.get(

            name

        )

        ||

        null

    );


}

/**
 * Remove Module
 * ==========================================================
 */


remove(

    name

){


    const result =

        this.modules.delete(

            name

        );



    if(result){


        this.metadata.removedCount++;


    }



    return result;


}

/**
 * List Modules
 * ==========================================================
 */


list(){


    return Array.from(

        this.modules.values()

    );


}
    
list(){


    return Array.from(

        this.modules.values()

    );


}

    /**
     * ==========================================================
     * Capability Index
     * ==========================================================
     *
     * Creates searchable index of module capabilities.
     *
     * Example:
     *
     * "knowledge.graph"
     *
     *        ↓
     *
     * KnowledgeGraphEngine
     *
     * ==========================================================
     */


    indexCapabilities(

        module

    ){


        if(

            !module ||

            !module.capabilities

        ){

            return false;

        }



        for(

            const capability

            of

            module.capabilities

        ){



            if(

                !this.capabilityIndex.has(

                    capability

                )

            ){


                this.capabilityIndex.set(

                    capability,

                    []

                );


            }



            this.capabilityIndex

                .get(capability)

                .push(

                    module.name

                );



        }



        return true;


    }

    /**
     * Find Modules By Capability
     * ==========================================================
     */


    findByCapability(

        capability

    ){



        return (

            this.capabilityIndex.get(

                capability

            )

            ||

            []

        );


    }

      /**
     * ==========================================================
     * Dependency Graph
     * ==========================================================
     */


    addDependency(

        moduleName,

        dependency

    ){



        if(

            !this.dependencies.has(

                moduleName

            )

        ){


            this.dependencies.set(

                moduleName,

                []

            );


        }



        const list =

            this.dependencies.get(

                moduleName

            );



        if(

            !list.includes(

                dependency

            )

        ){


            list.push(

                dependency

            );


        }



        return true;


    }  

    /**
     * Get Module Dependencies
     * ==========================================================
     */


    getDependencies(

        moduleName

    ){



        return (

            this.dependencies.get(

                moduleName

            )

            ||

            []

        );


    }

    /**
     * Dependency Validation
     * ==========================================================
     */


    validateDependencies(

        moduleName

    ){



        const required =

            this.getDependencies(

                moduleName

            );



        const missing =

            required.filter(

                dependency =>

                    !this.modules.has(

                        dependency

                    )

            );



        return {


            valid:

                missing.length === 0,


            missing



        };


    }
    
    /**
     * ==========================================================
     * Module Lifecycle Controller
     * ==========================================================
     *
     * Controls:
     *
     * - Start
     * - Stop
     * - Restart
     * - Initialize Order
     *
     * ==========================================================
     */


    startModule(

        moduleName

    ){


        const module =

            this.get(

                moduleName

            );



        if(!module){


            throw new Error(

                `Module ${moduleName} not found.`

            );


        }



        const dependencyCheck =

            this.validateDependencies(

                moduleName

            );



        if(

            !dependencyCheck.valid

        ){


            throw new Error(

                `Missing dependencies: ${dependencyCheck.missing.join(", ")}`

            );


        }



        if(

            !module.initialized

        ){


            module.initialize(

                this.runtimeContext

            );


        }



        module.enable();



        return {


            module:

                moduleName,


            status:

                module.status,


            started:

                true



        };


    }

    /**
     * Stop Module
     */


    stopModule(

        moduleName

    ){


        const module =

            this.get(

                moduleName

            );



        if(!module){


            return false;


        }



        module.shutdown();



        return {


            module:

                moduleName,


            status:

                module.status,


            stopped:

                true



        };


    }

    /**
     * Restart Module
     */


    restartModule(

        moduleName

    ){



        this.stopModule(

            moduleName

        );



        return this.startModule(

            moduleName

        );


    }
    
    /**
     * Start All Registered Modules
     */


    startAll(){


        const results = [];



        for(

            const moduleName

            of

            this.modules.keys()

        ){



            results.push(

                this.startModule(

                    moduleName

                )

            );


        }



        return results;


    }

    /**
     * Shutdown All Modules
     */


    stopAll(){


        const results = [];



        const modules =

            Array.from(

                this.modules.keys()

            )

            .reverse();



        for(

            const moduleName

            of

            modules

        ){


            results.push(

                this.stopModule(

                    moduleName

                )

            );


        }



        return results;


    }

     /**
     * Restart Registry Environment
     */


    restartAll(){


        this.stopAll();



        return this.startAll();


    }

    /**
     * Lifecycle Report
     */


    getLifecycleStatus(){


        const report = [];



        for(

            const module

            of

            this.modules.values()

        ){


            report.push({


                name:

                    module.name,


                status:

                    module.status,


                initialized:

                    module.initialized,


                enabled:

                    module.enabled



            });


        }



        return report;


    }
    
      /**
     * ==========================================================
     * Dependency Resolution Engine
     * ==========================================================
     *
     * Creates execution order based on dependencies.
     *
     * Uses Topological Sorting concept.
     *
     * ==========================================================
     */


    resolveStartupOrder(){


        const visited = new Set();


        const visiting = new Set();


        const order = [];



        const visit = (

            moduleName

        ) => {



            if(

                visiting.has(

                    moduleName

                )

            ){


                throw new Error(

                    `Circular dependency detected: ${moduleName}`

                );


            }



            if(

                visited.has(

                    moduleName

                )

            ){

                return;

            }



            visiting.add(

                moduleName

            );



            const dependencies =

                this.getDependencies(

                    moduleName

                );



            for(

                const dependency

                of

                dependencies

            ){



                if(

                    this.modules.has(

                        dependency

                    )

                ){

                    visit(

                        dependency

                    );

                }


            }



            visiting.delete(

                moduleName

            );


            visited.add(

                moduleName

            );


            order.push(

                moduleName

            );


        };



        for(

            const moduleName

            of

            this.modules.keys()

        ){


            visit(

                moduleName

            );


        }



        return order;


    }

    /**
     * Dependency Tree
     */


    getDependencyTree(){



        const tree = {};



        for(

            const moduleName

            of

            this.modules.keys()

        ){



            tree[moduleName] =

                this.getDependencies(

                    moduleName

                );


        }



        return tree;


    }

       /**
     * Circular Dependency Check
     */


    checkCircularDependencies(){



        try {


            this.resolveStartupOrder();



            return {


                circular:

                    false,


                valid:

                    true



            };


        }

        catch(error){



            return {


                circular:

                    true,


                valid:

                    false,


                error:

                    error.message



            };


        }


    }

    /**
     * Start In Dependency Order
     */


   startResolved(){



        const order =

            this.resolveStartupOrder();



        const results = [];



        for(

            const moduleName

            of

            order

        ){


            results.push(

                this.startModule(

                    moduleName

                )

            );


        }



        return results;


    }

    /**
     * Export Dependency Graph
     */


    exportDependencyGraph(){



        return {


            nodes:

                Array.from(

                    this.modules.keys()

                ),



            edges:

                this.getDependencyTree()



        };


    }
    
    /**
     * ==========================================================
     * Registry Diagnostics
     * ==========================================================
     */


    diagnostics(){


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            modules:

                this.modules.size,


            metadata:

                this.metadata,


            timestamp:

                new Date()



        };


    }

    /**
     * ==========================================================
     * Module Health Monitoring
     * ==========================================================
     */


    healthCheck(){


        const report = [];



        for(

            const module

            of

            this.modules.values()

        ){



            if(

                typeof module.health ===

                "function"

            ){


                report.push(

                    module.health()

                );


            }

            else {


                report.push({


                    name:

                        module.name,


                    healthy:

                        false,


                    error:

                        "Health method unavailable"



                });


            }


        }



        return report;


    }

    /**
     * ==========================================================
     * Health Filtering
     * ==========================================================
     */


    getUnhealthyModules(){


        return this.healthCheck()

            .filter(

                item =>

                    item.healthy === false

            );


    }
    
      /**
     * ==========================================================
     * Operational Dashboard Data
     * ==========================================================
     */


    getOperationalStatus(){



        return {


            registry:{


                name:

                    this.name,


                version:

                    this.version,


                status:

                    this.status



            },


            modules:


                Array.from(

                    this.modules.values()

                )

                .map(

                    module => ({


                        name:

                            module.name,


                        status:

                            module.status,


                        enabled:

                            module.enabled,


                        ready:

                            module.isReady

                                ?

                                module.isReady()

                                :

                                false



                    })

                ),



            health:

                this.healthCheck(),



            timestamp:

                new Date()



        };


    }

    /**
     * ==========================================================
     * Monitoring Snapshot
     * ==========================================================
     */


    snapshot(){


        return {


            diagnostics:

                this.diagnostics(),


            health:

                this.healthCheck(),


            lifecycle:

                this.getLifecycleStatus(),


            dependencyGraph:

                this.exportDependencyGraph()



        };


    }

    /**
     * ==========================================================
     * Registry Shutdown
     * ==========================================================
     */


    shutdown(){


        this.stopAll();



        this.status =

            "SHUTDOWN";



        return true;


    }
    
this.pluginPaths = [];

this.loadedPlugins = new Map();

this.pluginMetadata = new Map();

/**
 * ==========================================================
 * Plugin Discovery
 * ==========================================================
 */


addPluginPath(

    path

){


    if(

        !path

    ){

        return false;

    }



    if(

        !this.pluginPaths.includes(

            path

        )

    ){

        this.pluginPaths.push(

            path

        );

    }



    return true;


}

getPluginPaths(){


    return [

        ...this.pluginPaths

    ];


}

/**
 * Dynamic Load Plugin
 */


loadPlugin(

    pluginPath

){


    try {


        const Plugin =

            require(

                pluginPath

            );



        const instance =

            new Plugin();



        this.register(

            instance

        );



        this.loadedPlugins.set(

            instance.name,

            instance

        );



        return instance;


    }

    catch(error){


        throw new Error(

            `Plugin loading failed: ${error.message}`

        );


    }


}

/**
 * Plugin Metadata Registry
 */


registerPluginMetadata(

    plugin

){


    if(

        !plugin

    ){

        return false;

    }



    this.pluginMetadata.set(

        plugin.name,

        {


            version:

                plugin.version,


            build:

                plugin.build,


            category:

                plugin.category,


            capabilities:

                plugin.capabilities || []



        }


    );


    return true;


}

getPluginMetadata(

    name

){


    return (

        this.pluginMetadata.get(

            name

        )

        ||

        null

    );


}

/**
 * Plugin Compatibility Check
 */


checkPluginCompatibility(

    plugin

){



    if(

        !plugin

    ){

        return false;

    }



    if(

        typeof plugin.supportsAPI !==

        "function"

    ){

        return true;

    }



    return plugin.supportsAPI(

        "1.0.0"

    );


}    
    
/**
 * Register External Plugin
 */


registerPlugin(

    plugin

){



    if(

        !this.checkPluginCompatibility(

            plugin

        )

    ){


        throw new Error(

            `Plugin ${plugin.name} is incompatible.`

        );


    }



    this.register(

        plugin

    );


    this.registerPluginMetadata(

        plugin

    );



    return plugin;


}

/**
 * Plugin Report
 */


getPluginReport(){


    return Array.from(

        this.pluginMetadata.entries()

    )

    .map(

        ([name,data]) => ({


            name,


            ...data



        })

    );


}

this.eventBus =

    null;


this.eventSubscriptions =

    new Map();

 /**
 * ==========================================================
 * Event Bus Integration
 * ==========================================================
 */


setEventBus(

    eventBus

){


    this.eventBus =

        eventBus;


    return true;


}   

/**
 * Subscribe Module To Event
 */


subscribe(

    moduleName,

    event,

    handler

){


    if(

        !this.eventBus

    ){

        throw new Error(

            "EventBus is not available."

        );

    }



    const module =

        this.get(

            moduleName

        );



    if(!module){

        throw new Error(

            `Module ${moduleName} not found.`

        );

    }



    this.eventBus.on(

        event,

        handler

    );



    if(

        !this.eventSubscriptions.has(

            moduleName

        )

    ){

        this.eventSubscriptions.set(

            moduleName,

            []

        );

    }



    this.eventSubscriptions

        .get(moduleName)

        .push(

            event

        );



    return true;


}

/**
 * Publish Event
 */


publish(

    event,

    payload = {}

){



    if(

        !this.eventBus

    ){

        return false;

    }



    this.eventBus.emit(

        event,

        {


            timestamp:

                new Date(),


            ...payload



        }

    );



    return true;


}    
    
/**
 * ==========================================================
 * Module Messaging
 * ==========================================================
 */


sendMessage(

    source,

    target,

    message

){



    const targetModule =

        this.get(

            target

        );



    if(!targetModule){

        throw new Error(

            `Target module ${target} not found.`

        );

    }



    if(

        typeof targetModule.receiveMessage !==

        "function"

    ){

        throw new Error(

            `${target} cannot receive messages.`

        );

    }



    return targetModule.receiveMessage(

        {


            source,


            message,


            timestamp:

                new Date()



        }

    );


}

/**
 * Broadcast Message
 */


broadcast(

    source,

    message

){



    const results = [];



    for(

        const module

        of

        this.modules.values()

    ){



        if(

            typeof module.receiveMessage ===

            "function"

        ){


            results.push(

                module.receiveMessage(

                    {


                        source,


                        message,


                        timestamp:

                            new Date()



                    }

                )

            );


        }


    }



    return results;


}

/**
 * Event Subscription Report
 */


getEventSubscriptions(){


    const report = {};



    for(

        const [

            module,

            events

        ]

        of

        this.eventSubscriptions

    ){


        report[module] =

            events;


    }



    return report;


}

getEventSubscriptions(){

    const report = {};

    for(
        const [
            module,
            events
        ]
        of
        this.eventSubscriptions
    ){

        report[module] =
            events;

    }

    return report;

}

this.securityContext = {

    permissions: new Map(),

    policies: new Map()

};

/**
 * ==========================================================
 * Security & Access Control
 * ==========================================================
 */


setPermission(

    moduleName,

    permission

){


    if(

        !this.securityContext.permissions.has(

            moduleName

        )

    ){

        this.securityContext.permissions.set(

            moduleName,

            []

        );

    }



    const permissions =

        this.securityContext.permissions.get(

            moduleName

        );



    if(

        !permissions.includes(

            permission

        )

    ){

        permissions.push(

            permission

        );

    }



    return true;


}

hasPermission(

    moduleName,

    permission

){


    const permissions =

        this.securityContext.permissions.get(

            moduleName

        )

        ||

        [];



    return permissions.includes(

        permission

    );


}

/**
 * Security Policy Management
 */


setPolicy(

    name,

    rule

){


    this.securityContext.policies.set(

        name,

        rule

    );


    return true;


}

checkPolicy(

    name,

    context = {}

){


    const policy =

        this.securityContext.policies.get(

            name

        );



    if(

        typeof policy !==

        "function"

    ){

        return false;

    }



    return policy(

        context

    );


}

/**
 * Secure Module Registration
 */


secureRegister(

    module,

    permissions = []

){


    const result =

        this.register(

            module

        );



    for(

        const permission

        of

        permissions

    ){

        this.setPermission(

            module.name,

            permission

        );

    }



    return result;


}    
    
/**
 * Security Report
 */


getSecurityReport(){


    const permissions = {};



    for(

        const [

            module,

            values

        ]

        of

        this.securityContext.permissions

    ){

        permissions[module] =

            values;

    }



    return {


        permissions,


        policies:

            Array.from(

                this.securityContext.policies.keys()

            )


    };


}

/**
 * ==========================================================
 * Full Registry Snapshot
 * ==========================================================
 */


snapshot(){


    return {


        registry:

            this.diagnostics(),



        modules:

            Array.from(

                this.modules.values()

            )

            .map(

                module =>

                    module.toJSON

                    ?

                    module.toJSON()

                    :

                    module

            ),



        lifecycle:

            this.getLifecycleStatus(),



        dependencies:

            this.exportDependencyGraph(),



        plugins:

            this.getPluginReport(),



        events:

            this.getEventSubscriptions(),



        security:

            this.getSecurityReport(),



        timestamp:

            new Date()



    };


}

/**
 * Final Shutdown
 */


destroy(){


    this.shutdown();



    this.modules.clear();


    this.dependencies.clear();


    this.capabilityIndex.clear();


    this.loadedPlugins.clear();



    this.status =

        "DESTROYED";



    return true;


}
module.exports = ModuleRegistry;    
