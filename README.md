# Password Generator

A fast, dependency-free password generator web app with a live strength meter. Uses the Web Crypto API for cryptographically secure randomness.

## Features

- Crypto-random password generation (Web Crypto API)
- Length slider (6–64 characters)
- Toggle lowercase, uppercase, digits, and symbols
- Live strength meter (weak / medium / strong / very strong) based on entropy bits
- Copy to clipboard button
- Zero dependencies — just open `index.html`

## Usage

No build step needed:

```bash
# open directly
start index.html

# or serve locally
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## How strength is calculated

Strength is measured in entropy bits: `length × log₂(pool_size)`. The meter colors the bar by how many bits the generated password carries.

## Development

```bash
npm install        # installs jest for tests
npm test           # run the unit test suite
```

## Project structure

```
password-generator/
├── index.html      # UI markup
├── style.css       # UI styling
├── app.js          # browser logic (wires UI to generator)
├── src/
│   └── generator.js # core generator + strength logic (Node/browser)
└── test/
    └── generator.test.js
```

## Built with the GitHub workflow

This project was developed using Issues → feature branches → PRs → merge:
- [#1](https://github.com/mrcrysta1/password-generator/issues/1) Core generator logic
- [#2](https://github.com/mrcrysta1/password-generator/issues/2) Web UI
- [#3](https://github.com/mrcrysta1/password-generator/issues/3) Strength meter
- [#4](https://github.com/mrcrysta1/password-generator/issues/4) Tests + CI

## License

[MIT](LICENSE)
