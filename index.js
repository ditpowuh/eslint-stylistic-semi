import stylistic from "@stylistic/eslint-plugin";

const semiRule = stylistic.rules.semi;

const FUNCTION_SEMI_VALUES = ["strict", "any"];

function isFunctionExpression(node) {
  return !!node && (node.type === "ArrowFunctionExpression" || node.type === "FunctionExpression");
}

function isFunctionStatement(node) {
  if (node.type === "VariableDeclaration") {
    return node.declarations.some((declaration) => isFunctionExpression(declaration.init));
  }
  if (node.type === "ReturnStatement") {
    return isFunctionExpression(node.argument);
  }
  return false;
}

export default {
  rules: {
    semi: {
      meta: {
        ...semiRule.meta,
        defaultOptions: [],
        schema: {
          type: "array",
          items: [{
            type: "string",
            enum: FUNCTION_SEMI_VALUES
          }],
          minItems: 0,
          maxItems: 1
        },
        docs: {
          ...semiRule.meta.docs,
          description: "Enforce semicolons except for arrow functions and other related exceptions (\"strict\" forbids semicolons there, \"any\" allows both)."
        }
      },
      create(context) {
        const functionSemi = context.options.find((option) => FUNCTION_SEMI_VALUES.includes(option)) ?? "strict";
        const withOptions = (options) => Object.create(context, {
          options: {
            value: options
          },
          report: {
            value: (descriptor) => context.report(descriptor)
          }
        });
        const normalHandlers = semiRule.create(withOptions(["always"]));
        const neverHandlers = semiRule.create(withOptions(["never"]));
        const handlers = {};
        for (const [selector, normalHandler] of Object.entries(normalHandlers)) {
          const neverHandler = neverHandlers[selector];
          handlers[selector] = function (node) {
            if (isFunctionStatement(node)) {
              if (functionSemi === "any") {
                return;
              }
              if (neverHandler) {
                neverHandler(node);
              }
              return;
            }
            normalHandler(node);
          };
        }
        return handlers;
      }
    }
  }
};
