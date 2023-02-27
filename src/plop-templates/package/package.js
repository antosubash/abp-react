module.exports = {
    description: 'Create a new package',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your package name?',
        },
    ],
    actions: [
        {
            type: 'add',
            path: 'packages/{{name}}/package.json',
            templateFile: 'plop-templates/package/package.json.hbs',
        },
        {
            type: 'add',
            path: 'packages/{{name}}/src/index.tsx',
        },
        {
            type: 'add',
            path: 'packages/{{name}}/src/styles.css',
        },
        {
            type: 'add',
            path: 'packages/{{name}}/postcss.config.js',
            templateFile: 'plop-templates/package/postcss.config.js.hbs',
        },
        {
            type: 'add',
            path: 'packages/{{name}}/tailwind.config.js',
            templateFile: 'plop-templates/package/tailwind.config.js.hbs',
        },
        {
            type: 'add',
            path: 'packages/{{name}}/tsconfig.json',
            templateFile: 'plop-templates/package/tsconfig.json.hbs',
        },
        {
            type: 'add',
            path: 'packages/{{name}}/tsup.config.js',
            templateFile: 'plop-templates/package/tsup.config.js.hbs',
        },
    ]
}