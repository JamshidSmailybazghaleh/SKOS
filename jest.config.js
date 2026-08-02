/**
 * SKOS Jest Configuration
 *
 * BUILD-000002
 * TEST-INFRA-003
 */

module.exports = {

    testEnvironment: "node",

    rootDir: ".",

    roots: [
        "<rootDir>/tests",
        "<rootDir>/src"
    ],

    testMatch: [
        "**/*.test.js",
        "**/*.test.ts"
    ],

    moduleDirectories: [
        "node_modules",
        "<rootDir>/src"
    ],

    transform: {

        "^.+\\.tsx?$": [
            "ts-jest",
            {}
        ]

    },

    verbose: true

};
