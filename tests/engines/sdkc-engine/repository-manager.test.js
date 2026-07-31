const RepositoryManager =
require(
"../../src/engines/sdkc-engine/repository-manager"
);

test(
"Repository should initialize",
()=>{

const repo =
new RepositoryManager();

repo.initialize();

expect(
repo.getRepositoryPath()
).toBeDefined();

});
