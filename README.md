# eslint-stylistic-semi

A ESLint plugin that adds onto `@stylistic/eslint-plugin`, covering a specific rule with semicolons.
This plugin wraps the `semi` rule, so you get all its options as usual, just with this adjustment.

`@stylistic/eslint-plugin` with the `semi` rule either forces semicolons everywhere or forces no semicolons at all. This plugin lets omission of semicolons on all function declarations (i.e. arrow functions assigned to variable, anonymous function assigned to variable, returning a function).


**Example of allowed usage (when set to always):**
```js
// As seen, functions defined like this don't require semicolons
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
      "custom-semi/semi": ["error", "always"]
    }
  }
];
```
Because this uses `@stylistic/eslint-plugin`'s `semi`, all options for semi can be passed.
