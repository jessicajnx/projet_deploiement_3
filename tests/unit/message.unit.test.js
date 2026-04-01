const { formatGreeting } = require("../../src/message");

describe("formatGreeting", () => {
  test("returns greeting with provided name", () => {
    expect(formatGreeting("Jess")).toBe("Bonjour Jess");
  });

  test("trims surrounding spaces", () => {
    expect(formatGreeting("  Azure  ")).toBe("Bonjour Azure");
  });

  test("fallbacks when name is missing", () => {
    expect(formatGreeting("")).toBe("Bonjour inconnu");
  });
});
