- [Coding guidelines](#coding-guidelines)
  - [Git](#git)
  - [Services](#services)
  - [Repositories](#repositories)
  - [DTO](#dto)
  - [Folder structure](#folder-structure)
  - [Exception handling](#exception-handling)
  - [Handle response](#handle-response)
  - [Validations](#validations)
  - [ORM](#orm)
  - [Naming convention](#naming-convention)
  - [Package manager](#package-manager)

## Coding guidelines

### Git

- Prefix branches with task number. E.g: SE-123-create-billing
- Prefix commit messages with task number. E.g: SE-123: Update css

### Services

- Services are used to handle business logic only, not interact with database.
- A service can call other services or repositories

### Repositories

- Add repositories to handle database operations.

```js
class PostRespository {
  listPost() {
    return Post.findAll({
      where: {
        authorId: 12
        status: 'active'
      }
    });
  }
}
```

### DTO

- Only need to add DTOs when neccessary, there is an option to select properties query using sequelize.
- Optionally create creation dto. E.g: AssetCreationDTO

```js
Model.findAll({
  attributes: ["foo", ["bar", "baz"], "qux"],
});
```

### Folder structure

- Seperate to modules. For example, in asset module.

```
  +-- models <== This contains models for sequelize
    +-- asset.js
    +-- user.js
    +-- ...
  +-- assets
    +-- AssetController.js
    +-- AssetService.js
    +-- AssetResitory.js
    +-- AssetDTO.js (optional)
    +-- AssetCreationDTO.js (optional).
```

- We can optionally omit services if there is no complicated business logic. E.g: CRUD only

### Exception handling

- Handle exception (try catch) in controllers, not in services or repositories.

```js

// in UserRepository.js
class UserRepository {
  async getById(id, options) {
    // don't use try catch or return status code here
    const user = await User.getById(id, options);
    return user;
  }
}

// in infra/exceptions/NotFound.js
class NotFound extends Error { 
  constructor(message) {
    this.code = 404;
    this.message = message;
  }
}

userRouter.get("/:id", (req, res, next) => {
  const repo = new UserRepository();
  try {
    const user = repo.getById(req.params.id);
    if (!user) {
      throw new NotFound("User not found");
    }

    success(user, res);
  } catch (err) {
    // this will pass err to be handled by error middleware
    next(err);
  }
});

// the middleware to handle exceptions
app.use((err, req, res, next) => {
  res
    .status(err.code || 500)
    .json({ data: null, code: error.code, message: error.message });
});
```

### Handle response
Use helper functions to return result
| function | description|
|----------|:----------------:|
| ok | success get |
| created | created successfully  |
| notFound | resource not found |
| unauthorized | user not authorized |
| forbidden | not authorized to perform action |

```js
// in infra/repsonses/ok.js
export const ok = (res, data, message) => { 
  res.status(200).json({
    data, 
    message,
    error: null
  })
}


router.get('/', (req, res, next) => { 
  try {
    const service = new MyService();
    const data = service.getById(req.params.id);
    return ok(res, data);
  } catch (e) {
    next(e)
  }
})

router.post('/', (req, res, next) => { 
  try {
    const service = new MyService();
    const data = service.create(req.body);
    return created(res, data);
  } catch (e) {
    next(e)
  }
})
```

### Validations

- Use sequelize validations and constraints

### ORM

- Always user an association pair. E.g: hasMany - belongsTo. Don't use belongsTo or hasMany alone.

### Naming convention
- PascalCase for classes. E.g: AttachmentRepository.js

### Package manager
- For consistency, only use npm for installing packages. Don't use yarn. Use npm version 6.14.9. `npm i -g npm@6.14.9`