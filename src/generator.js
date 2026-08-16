const CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{};:,.<>?",
};

function pickRandom(chars) {
  const random = new Uint32Array(1);
  crypto.getRandomValues(random);
  return chars[random[0] % chars.length];
}

function generatePassword(length, options) {
  const selected = Object.keys(CHARSETS).filter((key) => options[key]);
  if (selected.length === 0) {
    throw new Error("Select at least one character set");
  }
  if (length < 1 || length > 128) {
    throw new Error("Length must be between 1 and 128");
  }

  const pool = selected.map((key) => CHARSETS[key]).join("");
  const password = [];

  for (let i = 0; i < length; i += 1) {
    password.push(pickRandom(pool));
  }

  for (const key of selected) {
    const charSet = CHARSETS[key];
    const index = Math.floor(Math.random() * length);
    password[index] = charSet[Math.floor(Math.random() * charSet.length)];
  }

  return password.join("");
}

function getStrength(length, options) {
  const poolSize = Object.keys(CHARSETS)
    .filter((key) => options[key])
    .reduce((size, key) => size + CHARSETS[key].length, 0);
  if (poolSize === 0) return 0;
  return Math.floor(length * Math.log2(poolSize));
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { generatePassword, getStrength, CHARSETS };
}
