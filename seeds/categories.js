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
      records.push(createRecord(knex,1,'Fruit'))
      records.push(createRecord(knex,2,'Vegetables'))
      records.push(createRecord(knex,3,'Dairy & Eggs'))
      records.push(createRecord(knex,4,'Meat & Seafood'))
      records.push(createRecord(knex,5,'Nuts & Seeds'))
      records.push(createRecord(knex,6,'Mushrooms'))
      records.push(createRecord(knex,7,'Grains & Pastas'))
      records.push(createRecord(knex,8,'Canned Goods'))




      return Promise.all(records);
    })
};
