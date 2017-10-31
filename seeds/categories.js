let createRecord = (knex, id, name) => {
  return knex('categories').insert({
    id,
    name
  })
}

exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(() => {
      let records = []
      records.push(createRecord(knex,1,'Fruits & Vegetables'))
      records.push(createRecord(knex,2,'Canned Goods'))
      records.push(createRecord(knex,3,'Meat & Seafood'))
      records.push(createRecord(knex,4,'Grains & Pastas'))
      records.push(createRecord(knex,5,'Dairy, Eggs & Cheese'))

      return Promise.all(records);
    })
};
