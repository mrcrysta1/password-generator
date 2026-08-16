const { generatePassword, getStrength } = require("./src/generator.js");

const output = document.getElementById("output");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const lowercase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const digits = document.getElementById("digits");
const symbols = document.getElementById("symbols");
const strengthBar = document.getElementById("strength-bar");
const strengthLabel = document.getElementById("strength-label");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");

function options() {
  return {
    lowercase: lowercase.checked,
    uppercase: uppercase.checked,
    digits: digits.checked,
    symbols: symbols.checked,
  };
}

function strengthColor(bits) {
  if (bits < 40) return "#e5484d";
  if (bits < 70) return "#f5a623";
  if (bits < 100) return "#46a758";
  return "#30a46c";
}

function strengthText(bits) {
  if (bits === 0) return "Select at least one set";
  if (bits < 40) return "Weak";
  if (bits < 70) return "Medium";
  if (bits < 100) return "Strong";
  return "Very strong";
}

function updateStrength(bits) {
  const pct = Math.min(bits / 128, 1) * 100;
  strengthBar.style.setProperty("--w", `${pct}%`);
  strengthBar.style.setProperty("--c", strengthColor(bits));
  strengthLabel.textContent = `${strengthText(bits)} (${bits} bits)`;
}

function generate() {
  const length = Number(lengthInput.value);
  try {
    const pw = generatePassword(length, options());
    output.value = pw;
    updateStrength(getStrength(length, options()));
  } catch (err) {
    output.value = "";
    strengthLabel.textContent = err.message;
    strengthBar.style.setProperty("--w", "0%");
  }
}

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

generateBtn.addEventListener("click", generate);

copyBtn.addEventListener("click", async () => {
  if (!output.value) return;
  try {
    await navigator.clipboard.writeText(output.value);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1500);
  } catch {
    output.select();
    document.execCommand("copy");
  }
});

for (const cb of [lowercase, uppercase, digits, symbols]) {
  cb.addEventListener("change", () => {
    if (output.value) generate();
  });
}

generate();
