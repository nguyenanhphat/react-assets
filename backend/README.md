### Application Setup (Development)

```sh
$ npm install -g sequelize-cli  # CLI for Sequelize
```

## CLI Tools

- `yarn start` - start the Node-DDD API Boilerplate for production
- `yarn start:dev` - start the Node-DDD API Boilerplate locally/development
- `yarn start:cc` - start `codecrumbs` will give you quick overview the structure of the project
- `yarn test` - run Unit tests
- `yarn db:reset` - run all migrations and seeds.
- `yarn db:refresh` - run all migrations.
- `yarn lint` - lint codebase using JavaScript Standard Style
- `yarn lint:fix` - fix code according to JS Standard Style
- `yarn migrate` - apply db changes using migration script
- `yarn add <package-name>` - add a new package to package.json
- `yarn remove <package-name>` - remove package from package.json
- `npx sequelize model:create --name newmodel` --attributes "id:integer, title:string - create a new model

## Using Sequelize

Sequelize is used to define mappings between models and database tables. It will automatically add the attributes `created_at` and `updated_at` to the tables created. However for consistency for our naming we change this to `createdAt` and `updatedAt`. This will cause issue when using model so we have to add this on config:

```js
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users', {
    ...
  }, {
    timestamps: false, // Add this
  })
}
```

Basic commands

```sh
$ yarn sequelize migration:generate --name create-sample-data     Generate a migration.
$ sequelize  db:migrate             Run pending migrations.
$ sequelize  db:migrate:old_schema  Update legacy migration table
$ sequelize  db:migrate:undo        Revert the last migration run.
$ sequelize  db:migrate:undo:all    Revert all migrations ran.
$ sequelize  db:seed                Run seeders.
$ sequelize  db:seed:undo           Deletes data from the database.
$ sequelize  db:seed:undo:all       Deletes data from the database.
$ sequelize model:create --name modelname --attributes "text:text, url:string"  # create model
$ sequelize seed:create --name seedname    # create seeder
```
