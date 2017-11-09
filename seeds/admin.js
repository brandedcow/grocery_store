var User = require('../models/User')

exports.seed = function(knex, Promise) {
  return knex('customers').del()
    .then(() => {
      new User({
        name: 'admin',
        email: 'admin@admin.admin',
        password: 'admin',
        admin: true
      }).save()
    })
};
