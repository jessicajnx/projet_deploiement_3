module.exports = {
  projects: [
    {
      displayName: "unit",
      testMatch: ["<rootDir>/tests/unit/**/*.test.js"],
      testEnvironment: "node"
    },
    {
      displayName: "e2e",
      testMatch: ["<rootDir>/tests/e2e/**/*.test.js"],
      testEnvironment: "node"
    }
  ]
};
