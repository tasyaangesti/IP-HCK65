[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13208385&assignment_repo_type=AssignmentRepo)

# Individual Project Phase 2 (Server Side)

> Tuliskan API Docs kamu di sini

# Spooncular

My Assets App is an application to manage your assets. This app has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

### POST /register

> Create a new user

_Request Header_

```
{
  "accessToken": "Bearer <your access token>"
}
```

_Request Body_

```
{
  "email": string,
  "password": string,
}
```

_Response (200 - Success Login)_

```
{
    "id": integer,
    "email": string
}
```

### POST /login

> login an existing user

_Request Header_

```
{
  "accessToken": "Bearer <your access token>"
}
```

_Request Body_

```
{
  "email": string,
  "password": string,
}
```

_Response (200 - Success Login)_

```
{
     "access_token": "<your access token>"
}
```
### GET /recipe

> Get all recipe data from database

_Request Header_

```

{
"access_token": string
}

```

_Request Body_

```

not needed

```

_Response (200 - OK)_

```
[
    {
        "id": 2,
        "title": "Fall Classic: Carrot Cake",
        "image": "https://spoonacular.com/recipeImages/642551-556x370.jpg",
        "ingredients": "cooking oil, baking powder, baking soda, cinnamon, all purpose flour, carrot, salt, egg, cream cheese, butter, cream, icing, powdered sugar, vanilla, milk, spread",
        "instruction": "Preheat oven to 350F (180C) and grease two 9 (23cm) cake pans. Beat oil and sugars together in a large bowl until combined. Add eggs, one at a time, beating well after each addition. Next, combine flour, cinnamon, baking soda, baking powder and salt.",
        "CategoryId": 1,
        "status": "unavailable",
        "createdAt": "2023-12-20T15:23:02.829Z",
        "updatedAt": "2023-12-20T15:23:02.829Z"
    },
    {
        "id": 3,
        "title": "Green Beans with Pearl Onions and Salmon",
        "image": "https://spoonacular.com/recipeImages/645418-556x370.jpg",
        "ingredients": "pearl onion, beans, water, olive oil, butter, pearl onion, green beans, chicken stock, stock, salmon, cream, crust, powdered sugar, vanilla, milk, spread",
        "instruction": "In a large pot add some water the frozen beans and frozen pearl onions. Cover and cook over medium heat until they are tender. Drain and set aside.In a large skillet over medium high heat melt 1 tablespoon of butter and the olive oil.",
        "CategoryId": 2,
        "status": "unavailable",
        "createdAt": "2023-12-20T15:23:02.829Z",
        "updatedAt": "2023-12-20T15:23:02.829Z"
    },
    {
        "id": 4,
        "title": "Caldo Verde - Portuguese Kale Soup",
        "image": "https://spoonacular.com/recipeImages/636787-556x370.jpg",
        "ingredients": "carrot, garlic, onion, potato, chorizo, sausage, kale, roll, kale, olive oil, red pepper flakes, vegetable, potato, broth",
        "instruction": "Chop your onions, slice your carrots and smash your garlic. Set aside. Peel and chop the potatoes. Set aside in a bowl of cold water. Remove the casing from your chorizo. This is an important step. Chorizo casing is tough and unforgiving .",
        "CategoryId": 2,
        "status": "unavailable",
        "createdAt": "2023-12-20T15:23:02.829Z",
        "updatedAt": "2023-12-20T15:23:02.829Z"
    },
    {
        "id": 5,
        "title": "Tropical Ice Pops",
        "image": "https://spoonacular.com/recipeImages/663858-556x370.jpg",
        "ingredients": "mapple syrup, pineapple, water, coonut, mango, coconut milk, ice",
        "instruction": "Pure the mango, pineapple, 3/4 cup coconut beverage and 1 1/2 tablespoon maple syrup in a blender. Pour equal amounts of the mixture into each mould. In a small bowl, mix the coconut milk, 1/4 cup of coconut beverage, and 2-3 TBS of maple syrup.",
        "CategoryId": 2,
        "status": "unavailable",
        "createdAt": "2023-12-20T15:23:02.829Z",
        "updatedAt": "2023-12-20T15:23:02.829Z"
    },
    {
        "id": 6,
        "title": "Brownie Cheesecake",
        "image": "https://spoonacular.com/recipeImages/636325-556x370.jpg",
        "ingredients": "butter, sugar, crust, flour, cream cheese, vanilla, salt, cream cheese, egg, water",
        "instruction": "Mix the crumbs, sugar & butter together in a large mixing bowl, until the crumbs clump together when gathered in your fist Pat the crumbs in an even layer in the bottom of an 8x3 inch springform pan Place the pan in a 325 degree oven & bake for 10 minutes",
        "CategoryId": 1,
        "status": "unavailable",
        "createdAt": "2023-12-20T15:23:02.829Z",
        "updatedAt": "2023-12-20T15:23:02.829Z"
    },
    {
        "id": 7,
        "title": "Glazed pork chops",
        "image": "https://spoonacular.com/recipeImages/644761-556x370.jpg",
        "ingredients": "black pepper, balsamic vinegar, corn starch, pork chops, soy sauce, pepper, honey, cracked pepper, fresh chives, green onions, butter, garlic",
        "instruction": "Press one side of each chop into the black pepper. Heat nonstick grill skillet until hot. Add pork chops, pepper side down, and cook about 4 minutes or until browned. Reduce heat to medium, turn pork chops and cook 6-8 minutes longer. ",
        "CategoryId": 2,
        "status": "unavailable",
        "createdAt": "2023-12-20T15:23:02.829Z",
        "updatedAt": "2023-12-20T15:23:02.829Z"
    },
    {
        "id": 8,
        "title": "Arame Edamame Cucumber Salad",
        "image": "https://spoonacular.com/recipeImages/632693-556x370.jpg",
        "ingredients": "cucumber, edamame, shake, water",
        "instruction": "Add 2 cups of water to arame, leave it soaking for 5 min and after that time drain.Boil edamame in salted water for roughly 5 min.Slice cucumber finely, the best way is to use mandolin.In a small jar combine all the dressing ingredients, cover and shake.",
        "CategoryId": 2,
        "status": "unavailable",
        "createdAt": "2023-12-20T15:23:02.829Z",
        "updatedAt": "2023-12-20T15:23:02.829Z"
    },
    {
        "id": 1,
        "title": "Banana Bread",
        "image": "https://spoonacular.com/recipeImages/634006-556x370.jpg",
        "ingredients": "baking soda, vanilla, banana, butter, all purpose flour, sugar, salt, egg",
        "instruction": "InstructionsClean the pork and pat dry. Add the pork rub to the shoulder and season all over. Place the pork shoulder into the crock pot and set the temperature to low. Add in the vegetable broth and cook on low for 8-10 hours. ",
        "CategoryId": 1,
        "status": "available",
        "createdAt": "2023-12-20T15:23:02.829Z",
        "updatedAt": "2023-12-20T15:36:18.619Z"
    }
]
```

_Response (500 - Bad Request)_

```
{
"message": "Internal server error"
}

```
### GET /recipe/:id

> Get recipe data by id

_Request Header_

```

{
"access_token": string
}

```

_Request Body_

```

not needed

```

_Response (200 - OK)_

```
{
    "id": 5,
    "title": "Tropical Ice Pops",
    "image": "https://spoonacular.com/recipeImages/663858-556x370.jpg",
    "ingredients": "mapple syrup, pineapple, water, coonut, mango, coconut milk, ice",
    "instruction": "Pure the mango, pineapple, 3/4 cup coconut beverage and 1 1/2 tablespoon maple syrup in a blender. Pour equal amounts of the mixture into each mould. In a small bowl, mix the coconut milk, 1/4 cup of coconut beverage, and 2-3 TBS of maple syrup.",
    "CategoryId": 2,
    "status": "unavailable",
    "createdAt": "2023-12-20T15:23:02.829Z",
    "updatedAt": "2023-12-20T15:23:02.829Z"
}
```

_Response (404 - Not Found)_

```

{
    "message": "Not Found"
}

```

_Response (500 - Unauthorized)_

```
{
  "message": " Internal server error"
}

```
