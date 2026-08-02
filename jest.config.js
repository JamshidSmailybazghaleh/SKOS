/**
 * SKOS Jest Configuration
 *
 * BUILD-000002
 * TEST-INFRA-001
 */

module.exports = {

    testEnvironment: "node",

    roots: [
        "<rootDir>/tests"
    ],

    testMatch: [
        "**/*.test.js",
        "**/*.test.ts"
    ],

    moduleDirectories: [
        "node_modules",
        "src"
    ],

    verbose: true

};
