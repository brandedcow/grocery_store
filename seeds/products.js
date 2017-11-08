
let createRecord = (knex, id, name, price, description, weight, quantity, category_id) => {
  return knex('products').insert({
    id,
    name,
    price,
    description,
    weight,
    quantity, // quantity: Math.floor(Math.random() * 90 + 1)
    category_id
  })
}

exports.seed = function(knex, Promise) {
  return knex('products').del()
    .then(() => {
      let records = []
      var storage = [
                    {
                      "name": "Strawberries",
                      "price": 5.74,
                      "description": "Strawberries grown from Berry Licious in Gillroy, CA by Berry Licious farms.",
                      "weight": 1.5,
                      "quantity": 2780,
                      "category_id": 1
                    },
                    {
                      "name": "Raspberries",
                      "price": 6.29,
                      "description": "Raspberries grown from Berry Licious in Gillroy, CA by Berry Licious farms.",
                      "weight": 1.02,
                      "quantity": 1907,
                      "category_id": 1
                    },
                    {
                      "name": "Blackberries",
                      "price": 6.75,
                      "description": "Blackberries grown from Berry Licious in Gillroy, CA by Berry Licious farms.",
                      "weight": 1.22,
                      "quantity": 1035,
                      "category_id": 1
                    },
                    {
                      "name": "Blueberries",
                      "price": 6.04,
                      "description": "Blueberries grown from Berry Licious in Gillroy, CA by Berry Licious farms.",
                      "weight": 1.18,
                      "quantity": 1800,
                      "category_id": 1
                    },
                    {
                      "name": "Apple",
                      "price": 1.02,
                      "description": "Apples grown from Allard Farms in Westley, CA.",
                      "weight": 0.38,
                      "quantity": 7841,
                      "category_id": 1
                    },
                    {
                      "name": "Orange",
                      "price": 0.89,
                      "description": "Oranges grown from Allard Farms in Westley, CA.",
                      "weight": 0.38,
                      "quantity": 5337,
                      "category_id": 1
                    },
                    {
                      "name": "Peach",
                      "price": 0.94,
                      "description": "Peaches grown from Allard Farms in Westley, CA.",
                      "weight": 0.33,
                      "quantity": 7800,
                      "category_id": 1
                    },
                    {
                      "name": "Pear",
                      "price": 1.01,
                      "description": "Pears grown from Alhambra Valley Pears & Beef in Martinez, CA.",
                      "weight": 0.38,
                      "quantity": 5337,
                      "category_id": 1
                    },
                    {
                      "name": "Grapes",
                      "price": 6.23,
                      "description": "Grapes grown from Devoto Gardens in Sebastopol, CA.",
                      "weight": 1.85,
                      "quantity": 6772,
                      "category_id": 1
                    },
                    {
                      "name": "Honey",
                      "price": 9.88,
                      "description": "Honey from Diablo Creek Apiary in Clayton, CA.",
                      "weight": 1.00,
                      "quantity": 12789,
                      "category_id": 5
                    },
                    {
                      "name": "Eggs",
                      "price": 3.12,
                      "description": "Eggs from Clara's Egg Farm in Royal Oaks, CA.",
                      "weight": 1.32,
                      "quantity": 11227,
                      "category_id": 5
                    },
                    {
                      "name": "Pistachios",
                      "price": 10.11,
                      "description": "Pistachios grown from Allard Farms in Westley, CA.",
                      "weight": 1.00,
                      "quantity": 8864,
                      "category_id": 5
                    }
                  ]
      for (let i=0; i<12; i+=1) {
        records.push(createRecord(knex, i+1, storage[i].name, storage[i].price, storage[i].description, storage[i].weight, storage[i].quantity, storage[i].category_id))
      }
      return Promise.all(records);
    })
};
