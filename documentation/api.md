# Routes:

- categories: 
    - GET `categories/` - get all categories;
- login:
    - GET `login/` - get current active user;
    - POST `login/` - login-auth;
    - GET `login/logout/` - sign out, session destroy;
- product:
    - POST `product/` - add new product;
    - POST `product/all/<page(int)>` - get all products;
    - GET `product/:ID/` - get product by id;
    - DELETE `product/:ID/` - remove product by id;
- user:
    - GET `user/` - get current user;
    - GET `user/products/` - get user products;
    
# Routes req body:

**Login**
- Login-auth.POST:<br>
`{`<br>
     `name: String,`<br>
     `phone: String`<br>
 `}`
 
**Product**
- Get all products.POST:<br>
`{`<br>
     `category: String,`<br>
 `}`
 
- Add new product.POST:<br>
`{`<br>
    `"categoryId": "all",`<br>
    `"title": "Test",`<br>
    `"description": "this is a test product",`<br>
    `"images": [{`<br>
        `"title": "yey",`<br>
        `"src": "https://memepedia.ru/wp-content/uploads/2019/03/u-suka-2-360x270.png",`<br>
        `"isMain": true`<br>
    `}]`<br>
`}`<br>
