# grocery_store
### Deployment

# clone the repo
git clone repo

# update brew
brew update

# install mysql
brew install mysql

# start mysql
mysql.server start

# create database
mysql -u root -e ‘create database grocery_store_database’

# create database tables
knex migrate:latest

# install app dependencies
cd dir
npm install

# start app
node server.js


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
