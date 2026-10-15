# eslint-stylistic-semi

A ESLint plugin built on `@stylistic/eslint-plugin`, covering a specific rule with semicolons.

`@stylistic/eslint-plugin` with the `semi` rule either forces semicolons everywhere or forces no semicolons at all. This plugin enforces semicolons everywhere except on function declarations (i.e. arrow functions assigned to variable, anonymous function assigned to variable, returning a function), where semicolons must be omitted (or are optional, see [Options](#options)).


**Example of allowed usage (under `"strict"`):**
```js
// As seen, functions defined like this must not have semicolons
const greet = function(name) {
  return `Hello, ${name}!`;
}

const greet = (name) => {
  return `Hello, ${name}!`;
}

useEffect(() => {
  const exampleTimeout = setTimeout(() => {
    console.log("Hi!");
  }, 1000);

  return () => {
    clearTimeout(exampleTimeout);
  }
}, []);

const x = "a string";
const y = [1, 2, 3];
doSomething();
```

### Options
The only option controls what happens on those function declarations:
- `"strict"` (default): semicolons must be omitted there; a semicolon is reported as an extra semicolon (and autofixed).
- `"any"`: semicolons are allowed or omitted there.

```js
"custom-semi/semi": ["error"]
"custom-semi/semi": ["error", "strict"]
"custom-semi/semi": ["error", "any"]
```

### Install
```bash
npm install --save-dev @stylistic/eslint-plugin @ditpowuh/eslint-stylistic-semi
```

### Usage
```js
import stylistic from "@stylistic/eslint-plugin";
import customSemi from "@ditpowuh/eslint-stylistic-semi";

export default [
  {
    plugins: {
      "stylistic": stylistic,
      "custom-semi": customSemi
    },
    rules: {
      "stylistic/semi": "off",
      "custom-semi/semi": ["error", "strict"]
    }
  }
];
```
