let createRecord = (knex, id, name) => {
  return knex('order_status_types').insert({
    id,
    name
  })
}

exports.seed = function(knex, Promise) {
  return knex('order_status_types').del()
    .then(() => {
      let records = []
      records.push(createRecord(knex,1,'Pending'))
      records.push(createRecord(knex,2,'Ordered'))
      records.push(createRecord(knex,3,'Processing'))
      records.push(createRecord(knex,4,'Delivered'))
      records.push(createRecord(knex,5,'Cancelled'))
      records.push(createRecord(knex,6,'Declined'))
      records.push(createRecord(knex,7,'Incomplete'))

      return Promise.all(records);
    })
};
