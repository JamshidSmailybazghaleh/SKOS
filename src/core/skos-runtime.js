const EventBus =

require("./event-bus");


const LifecycleManager =

require("./lifecycle-manager");


const Diagnostics =

require("./diagnostics");





class SKOSRuntime {



constructor(){



this.name =

"SKOS Runtime";



this.version =

"1.0.0";



this.events =

new EventBus();



this.lifecycle =

new LifecycleManager();



this.diagnostics =

new Diagnostics();



}






initialize(){


this.lifecycle.initialize();


this.events.emit(

"SKOS_INITIALIZED"

);


return true;


}






getStatus(){


return {


name:

this.name,


version:

this.version,


state:

this.lifecycle.getState()



};


}



}



module.exports = SKOSRuntime;
