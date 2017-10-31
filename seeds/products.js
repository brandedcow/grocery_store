var faker = require('faker')

let createRecord = (knex, id) => {
  return knex('products').insert({
    id,
    name:faker.commerce.productName(),
    price:faker.commerce.price(),
    description:faker.commerce.productMaterial(),
    weight: (Math.random() * 90 + 1),
    quantity: Math.floor(Math.random() * 90 + 1)
  })
}

exports.seed = function(knex, Promise) {
  return knex('products').del()
    .then(() => {
      let records = []

      for (let i=1; i<50; i++) {
        records.push(createRecord(knex,i))
      }
      return Promise.all(records);
    })
};
