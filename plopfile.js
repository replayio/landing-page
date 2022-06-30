/*
  How to use this utility?

  Execute the plop command on the terminal followed by one of the available generators:
    - component

  Example: "yarn plop component"

  All the template files are under ~/plop-templates. Plops templates use Handlebars.

  Plop Documentation: https://plopjs.com/documentation/
  Handlebars Documentation: https://handlebarsjs.com/guide/
*/
const package = require('./package.json')

const COMPONENTS_DIR_BASEPATH = './src/components'
const HAS_SASS = !!package.dependencies.sass || !!package.devDependencies.sass

module.exports = function (plop) {
  /* Register plugin */
  plop.setPrompt('directory', require('inquirer-directory'))

  /* Register helpers */
  plop.setHelper('pascalcase', (text) =>
    text.replace(/(^\w|-\w)/g, (text) => text.replace(/-/, '').toUpperCase())
  )
  plop.setHelper('dashedcase', (text) =>
    text.replace(/(?<!^)([A-Z])/g, '-$1').toLowerCase()
  )

  const componentGenerator = {
    description: 'Component ',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What's the component's name?",
        basePath: COMPONENTS_DIR_BASEPATH
      },
      {
        type: 'directory',
        name: 'dir',
        message: 'Where you like to put this component?',
        basePath: COMPONENTS_DIR_BASEPATH
      }
    ],
    actions: [
      {
        type: 'add',
        path: `${COMPONENTS_DIR_BASEPATH}/{{dir}}/{{dashedcase name}}/index.tsx`,
        templateFile: 'plop-templates/component.hbs',
        data: {
          hasSass: HAS_SASS
        }
      },
      {
        type: 'add',
        path: `${COMPONENTS_DIR_BASEPATH}/{{dir}}/{{dashedcase name}}/{{dashedcase name}}.module.${
          HAS_SASS ? 'scss' : 'css'
        }`
      }
    ]
  }

  /* Generators */
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('comp', componentGenerator)
}
