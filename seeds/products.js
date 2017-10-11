var faker = require('faker')

let createRecord = (knex, id) => {
  return knex('products').insert({
    id,
    product_name:faker.commerce.productName(),
    product_price:faker.commerce.price(),
    product_description:faker.commerce.productMaterial(),
    product_weight: (Math.random() * 90 + 1),
    product_quantity: Math.floor(Math.random() * 90 + 1)
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
