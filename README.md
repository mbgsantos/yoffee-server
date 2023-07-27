# Yoffee Server

## Routes

### Pet Routes
| Method | Route | Description |
|--|--|--|
| GET | /api/pets | Returns all pets |
| GET | /api/pets/:id | Returns the specified pet |
| POST | /api/pets/create | Creates a new pet |
| PUT | /api/pets/:id | Edits the specified pet |
| DELETE | /api/pets/:id | Deletes the specified pet |

### Activities Routes

| Method | Route | Description |
|--|--|--|
| GET | /api/activities | Returns all activities |
| GET | /api/activities/:id | Returns the specified activity |
| POST | /api/activities/create | Creates a new activity |
| PUT | /api/activities/:id | Edits the specified activity |
| DELETE | /api/activities/:id | Deletes the specified activity |

### Services Routes

| Method | Route | Description |
|--|--|--|
| GET | /api/services | Returns all services |
| GET | /api/services/:id | Returns the specified service |
| POST | /api/services/create | Creates a new service |
| PUT | /api/services/:id | Edits the specified service |
| DELETE | /api/services/:id | Deletes the specified service |

### Auth Routes

| Method | Route | Description |
|--|--|--|
| POST | /api/signup | Creates a new user |
| POST | /api/login | Logs the user |
| GET | /api/verify | Verifies the JWT |

## Models

### User Model
```js
{
    name: String,
    email: String,
    password: String,
}
```

### Pet Model
```js
{
    breed: String,
    name: String,
    age: Number,
    microchip: String,
    veterinary: String,
    insurance_name: String,
    diet: String,
}
```

### Activity Model
```js
{
    name: String,
    description: String,
    address: {
        street: String,
        city: String,
        country: String,
    },
}
```

### Service Model
```js
{
    name: String,
    address: {
        street: String,
        city: String,
        country: String,
    },
}
```