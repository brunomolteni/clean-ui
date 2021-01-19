module.exports = function(plop) {
  plop.setGenerator("component", {
    description: "this creates a new component with its story",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
        validate: function(value) {
          if (/.+/.test(value)) {
            return true;
          }
          return "name is required";
        }
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{properCase name}}/{{properCase name}}.js",
        templateFile: ".plop/component.js"
      },
      {
        type: "add",
        path:
          "src/components/{{properCase name}}/{{properCase name}}.stories.js",
        templateFile: ".plop/stories.js"
      },
      {
        type: "add",
        path: "src/components/{{properCase name}}/index.js",
        templateFile: ".plop/index.js"
      },
      {
        type: "add",
        path: "src/components/{{properCase name}}/{{properCase name}}.scss",
        templateFile: ".plop/styles.scss"
      }
    ]
  });
};
