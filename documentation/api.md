# Routes:

- categories: 
    - GET `categories/` - get all categories;
- login:
    - GET `login/` - get current active user;
    - POST `login/` - login-auth;
    - PUT `login/` - update current user;
    - GET `login/logout/` - sign out, session destroy;
- product:
    - POST `product/` - add new product;
    - PUT `product/` - update product;
    - GET `product/:ID/` - get product by id;
    - DELETE `product/:ID/` - remove product by id;
- user:
    - GET `user/` - get current user;
    - GET `user/products/` - get user products;
    
<hr/>

# Routes req body:

- **login**.POST:<br>
`{`<br>
     `name: String,`<br>
     `phone: String`<br>
 `}`
 
- **product**.PUT:<br>
`{`<br>
   `categoryId: Number,`<br>
   `title: String,`<br>
   `address: String,`<br>
   `description: String,`<br>
   `email: String,`<br>
   `images: Array`<br>
`}`
<hr/>