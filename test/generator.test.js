const { generatePassword, getStrength, CHARSETS } = require("../src/generator.js");

test("generates password of requested length", () => {
  const pw = generatePassword(16, { lowercase: true, uppercase: true, digits: true, symbols: true });
  expect(pw).toHaveLength(16);
});

test("includes characters from each selected set", () => {
  const pw = generatePassword(64, { lowercase: true, uppercase: true, digits: true, symbols: true });
  const hasLower = [...CHARSETS.lowercase].some((c) => pw.includes(c));
  const hasUpper = [...CHARSETS.uppercase].some((c) => pw.includes(c));
  const hasDigit = [...CHARSETS.digits].some((c) => pw.includes(c));
  const hasSymbol = [...CHARSETS.symbols].some((c) => pw.includes(c));
  expect(hasLower).toBe(true);
  expect(hasUpper).toBe(true);
  expect(hasDigit).toBe(true);
  expect(hasSymbol).toBe(true);
});

test("throws when no charset is selected", () => {
  expect(() => generatePassword(12, {})).toThrow("at least one character set");
});

test("throws on invalid length", () => {
  expect(() => generatePassword(0, { lowercase: true })).toThrow("between 1 and 128");
});

test("produces unique passwords", () => {
  const seen = new Set();
  for (let i = 0; i < 100; i += 1) {
    seen.add(generatePassword(20, { lowercase: true, digits: true }));
  }
  expect(seen.size).toBe(100);
});

test("strength grows with length and pool", () => {
  const low = getStrength(8, { lowercase: true });
  const high = getStrength(16, { lowercase: true, uppercase: true, digits: true, symbols: true });
  expect(high).toBeGreaterThan(low);
});
