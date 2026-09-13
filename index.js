import stylistic from "@stylistic/eslint-plugin";

const semiRule = stylistic.rules.semi;

export default {
  rules: {
    semi: {
      meta: {
        ...semiRule.meta,
        docs: {
          description: "Enforce semicolons except for arrow functions and other related exceptions.",
        }
      },
      create(context) {
        const customContext = Object.create(context, {
          report: {
            value(descriptor) {
              let current = descriptor.node;
              while (current) {
                if (current.type === "VariableDeclarator") {
                  if (current.init && (current.init.type === "ArrowFunctionExpression" || current.init.type === "FunctionExpression")) {
                    return;
                  }
                  break;
                }
                if (current.type === "VariableDeclaration") {
                  const hasFunctionInit = current.declarations.some((declaration) => declaration.init && (declaration.init.type === "ArrowFunctionExpression" || declaration.init.type === "FunctionExpression"));
                  if (hasFunctionInit) {
                    return;
                  }
                  break;
                }
                if (current.type === "ReturnStatement") {
                  if (current.argument && (current.argument.type === "ArrowFunctionExpression" || current.argument.type === "FunctionExpression")) {
                    return;
                  }
                  break;
                }
                current = current.parent;
              }
              return context.report(descriptor);
            },
            writable: true,
            configurable: true
          }
        });
        return semiRule.create(customContext);
      }
    }
  }
};
