# grocery_store
### Deployment

### Mac Instructions
1. clone the repo
`git clone https://github.com/brandedcow/grocery_store.git`

2. install app dependencies
``cd grocery_store
npm install``

3. start app
`node server.js`

Backend Setup:

4. install mysql
`brew update && brew install mysql`

5. start mysql
`mysql.server start`

6. create database
`mysql -u root -e 'create database grocery_store_database'`

7. migrate tables
`knex migrate:latest`

### Windows instructions

1. clone repo
`git clone https://github.com/brandedcow/grocery_store.git`

2. install node
`https://nodejs.org/en/`

3. go to directory grocery_store and install dependencies
`npm install`

4. start server
`npm start`

Backend Setup:

5. install mysql via Windows installer
`use Developer Settings`

6. take care of any dependencies required by mysql
`Could include microsoft visual c++ distributables or .net frameworks`

7. Using MySQL Notifier, start instance

8. Using MySQL WorkBench, create new SCHEMA called grocery_store_database

9. migrate tables
`knex migrate:latest`


### Configuration
- **Platform:** node
- **Framework**: express
- **Template Engine**:
- **CSS Framework**: bootstrap
- **CSS Preprocessor**: css
- **JavaScript Framework**: angularjs
- **Build Tool**: none
- **Unit Testing**: mocha
- **Database**: mysql
- **Authentication**: email
- **Deployment**: heroku

### License
The MIT License (MIT)

Copyright (c) 2016 Sahat Yalkabov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
