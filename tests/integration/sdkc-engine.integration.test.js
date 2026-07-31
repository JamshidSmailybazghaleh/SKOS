/**
 * SKOS SDKC Integration Test
 *
 * File ID:
 * TEST-SDKC-INT-001
 *
 * Build:
 * BUILD-000001
 */

const SDKCEngine =
require("../../src/engines/sdkc-engine/sdkc-engine");

const RepositoryManager =
require("../../src/engines/sdkc-engine/repository-manager");

const ObjectStorage =
require("../../src/engines/sdkc-engine/object-storage");

const ManifestManager =
require("../../src/engines/sdkc-engine/manifest-manager");

const HistoryManager =
require("../../src/engines/sdkc-engine/history-manager");


describe(
"SKOS SDKC Integration Test",
()=>{


let repository;

let storage;

let manifest;

let history;

let sdkc;


beforeAll(()=>{

    repository =
    new RepositoryManager();

    repository.initialize();

    storage =
    new ObjectStorage(repository);

    manifest =
    new ManifestManager(repository);

    history =
    new HistoryManager(repository);

    sdkc =
    new SDKCEngine();

    sdkc.initialize();

});


test(
"Complete SDKC pipeline",
()=>{


const object = {

id:
"SKOS-KO-000001",

title:
"Hekmat Noor",

author:
"Jamshid Smaily",

language:
"Persian",

format:
"PDF"

};


sdkc.store(object);


storage.storeMetadata(

object.id,

object

);


manifest.createManifest(

object.id,

{

build:
"BUILD-000001"

}

);


history.addEvent(

object.id,

"OBJECT_CREATED",

{

version:
"1.0.0"

}

);


expect(

sdkc.exists(
object.id)

).toBe(true);


expect(

repository.exists(
object.id)

).toBe(true);


expect(

storage.loadMetadata(
object.id
).title

).toBe(
"Hekmat Noor"
);


expect(

manifest.loadManifest(
object.id
).status

).toBe(
"ACTIVE"
);


expect(

history.getHistory(
object.id
).length

).toBeGreaterThan(0);


});


afterAll(()=>{

sdkc.shutdown();

});


});
