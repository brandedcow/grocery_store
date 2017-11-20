let createRecord = (knex, id, name, price, description, weight, quantity, category_id, image) => {
  return knex('products').insert({
    id,
    name,
    price,
    description,
    weight,
    quantity, // quantity: Math.floor(Math.random() * 90 + 1)
    category_id,
    image
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
                      "category_id": 1,
                      "image": "/pics/products/strawberry.png"
                    },
                    {
                      "name": "Raspberries",
                      "price": 6.29,
                      "description": "Raspberries grown from Berry Licious in Gillroy, CA by Berry Licious farms.",
                      "weight": 1.02,
                      "quantity": 1907,
                      "category_id": 1,
                      "image": "/pics/products/raspberry.jpg"
                    },
                    {
                      "name": "Blackberries",
                      "price": 6.75,
                      "description": "Blackberries grown from Berry Licious in Gillroy, CA by Berry Licious farms.",
                      "weight": 1.22,
                      "quantity": 1035,
                      "category_id": 1,
                      "image": "/pics/products/blackberry.png"
                    },
                    {
                      "name": "Blueberries",
                      "price": 6.04,
                      "description": "Blueberries grown from Berry Licious in Gillroy, CA by Berry Licious farms.",
                      "weight": 1.18,
                      "quantity": 1800,
                      "category_id": 1,
                      "image": "/pics/products/blueberry.jpg"
                    },
                    {
                      "name": "Apple",
                      "price": 1.02,
                      "description": "Apples grown from Allard Farms in Westley, CA.",
                      "weight": 0.38,
                      "quantity": 7841,
                      "category_id": 1,
                      "image": "/pics/products/apple.png"
                    },
                    {
                      "name": "Orange",
                      "price": 0.89,
                      "description": "Oranges grown from Allard Farms in Westley, CA.",
                      "weight": 0.38,
                      "quantity": 5337,
                      "category_id": 1,
                      "image": "/pics/products/orange.jpg"
                    },
                    {
                      "name": "Peach",
                      "price": 0.94,
                      "description": "Peaches grown from Allard Farms in Westley, CA.",
                      "weight": 0.33,
                      "quantity": 7800,
                      "category_id": 1,
                      "image": "/pics/products/peach.png"
                    },
                    {
                      "name": "Pear",
                      "price": 1.01,
                      "description": "Pears grown from Alhambra Valley Pears & Beef in Martinez, CA.",
                      "weight": 0.38,
                      "quantity": 5337,
                      "category_id": 1,
                      "image": "/pics/products/pear.jpg"
                    },
                    {
                      "name": "Grapes",
                      "price": 6.23,
                      "description": "Grapes grown from Devoto Gardens in Sebastopol, CA.",
                      "weight": 1.85,
                      "quantity": 6772,
                      "category_id": 1,
                      "image": "/pics/products/grapes.jpg"
                    },
                    {
                      "name": "Honey",
                      "price": 9.88,
                      "description": "Honey from Diablo Creek Apiary in Clayton, CA.",
                      "weight": 1.00,
                      "quantity": 12789,
                      "category_id": 5,
                      "image": "/pics/products/honey.jpg"
                    },
                    {
                      "name": "Eggs",
                      "price": 3.12,
                      "description": "Eggs from Clara's Egg Farm in Royal Oaks, CA.",
                      "weight": 1.32,
                      "quantity": 11227,
                      "category_id": 5,
                      "image": "/pics/products/eggs.jpg"
                    },
                    {
                      "name": "Pistachios",
                      "price": 10.11,
                      "description": "Pistachios grown from Allard Farms in Westley, CA.",
                      "weight": 1.00,
                      "quantity": 8864,
                      "category_id": 5,
                      "image": "/pics/products/pistachio.png"
                    },
                    {
                      "name": "Organicgirl Baby Spinach",
                      "price": 3.11,
                      "description": "Rich in antioxidants beta carotene, vitamins A and C",
                      "weight": 1.00,
                      "quantity": 8364,
                      "category_id": 1,
                      "image": "/pics/products/baby_spinach.jpg."
                    },
                    {
                      "name": "Organicgirl Romaine Heart Leaves",
                      "price": 4.11,
                      "description": "The sweetest crunchiest inner heart leaves.",
                      "weight": 1.00,
                      "quantity": 1364,
                      "category_id": 1,
                      "image": "/pics/products/hearts_of_romaine.jpg"
                    },
                    {
                      "name": "Organicgirl Supergreens",
                      "price": 3.99,
                      "description": "A perfect blend of spring mix greens and baby spinach",
                      "weight": 1.00,
                      "quantity": 5334,
                      "category_id": 1,
                      "image": "/pics/products/mixed_greens.jpg"
                    },
                    {
                      "name": "Organic Celery Hearts",
                      "price": 2.99,
                      "description": "The flavorful heart of the celery bunch",
                      "weight": 1.00,
                      "quantity": 6334,
                      "category_id": 1,
                      "image": "/pics/products/celery.jpg"
                    },
                    {
                      "name": "Organic Cal-Organic Match Stick Cut Carrots",
                      "price": 2.99,
                      "description": "Stick Cut Carrots",
                      "weight": 1.00,
                      "quantity": 1134,
                      "category_id": 1,
                      "image": "/pics/products/carrots.jpg"
                    },
                    {
                      "name": "Healthworks Goji Berries Raw Organic",
                      "price": 15.99,
                      "description": "Healthworks certified organic goji berries, soft and chewy",
                      "weight": 1.00,
                      "quantity": 134,
                      "category_id": 1,
                      "image": "/pics/products/healthworks_goji.jpg"
                    },
                    {
                      "name": "Navitas Organics Goji Berries",
                      "price": 15.99,
                      "description": "Healthworks certified organic goji berries, soft and chewy",
                      "weight": 1.00,
                      "quantity": 3154,
                      "category_id": 1,
                      "image": "/pics/products/navitas_goji.png"
                    },
                    {
                      "name": "Organicgirl Sweet Pea Salad Mix",
                      "price": 3.99,
                      "description": "Garden fresh, delicious sweet pea flavor that adds a delicate and sophisticated flavor to salads",
                      "weight": 1.00,
                      "quantity": 554,
                      "category_id": 1,
                      "image": "/pics/products/sweet_pea.jpg"
                    },
                    {
                      "name": "Healthworks Maca Powder Raw Organic",
                      "price": 22.99,
                      "description": "Healthworks USDA Certified Organic Maca Root Powder",
                      "weight": 1.00,
                      "quantity": 754,
                      "category_id": 1,
                      "image": "/pics/products/maca.jpg"
                    },
                    {
                      "name": "Organic Firm Tofu",
                      "price": 1.99,
                      "description": "America's #1 tofu inspires consumers to make healthy change to their diets",
                      "weight": 1.00,
                      "quantity": 154,
                      "category_id": 5,
                      "image": "/pics/products/tofu.jpg"
                    },
                    {
                      "name": "Taylor Farms Organic Arugula",
                      "price": 4.99,
                      "description": "Organic Arugula",
                      "weight": 1.00,
                      "quantity": 5554,
                      "category_id": 5,
                      "image": "/pics/products/arugula.jpg"
                    },
                    {
                      "name": "Taylor Farms Organic Baby Kale and Spinach",
                      "price": 4.99,
                      "description": "High in Vitamins K, C, and A",
                      "weight": 1.00,
                      "quantity": 7133,
                      "category_id": 1,
                      "image": "/pics/products/baby_kale.jpg"
                    },
                    {
                      "name": "Organic Dried Apricots",
                      "price": 4.99,
                      "description": "Non-GMO project verified. Free from additives & refined sugars",
                      "weight": 1.00,
                      "quantity": 934,
                      "category_id": 1,
                      "image": "/pics/products/apricot.png"
                    },
                    {
                      "name": "Organic Chewy Banana Bites",
                      "price": 11.99,
                      "description": "Organic Original Chewy Banana Bites",
                      "weight": 1.00,
                      "quantity": 125,
                      "category_id": 1,
                      "image": "/pics/products/banana_bites.jpg"
                    },
                    {
                      "name": "Organic Cranberries",
                      "price": 3.99,
                      "description": "Locally grown certified organic cranberries",
                      "weight": 1.00,
                      "quantity": 1125,
                      "category_id": 1,
                      "image": "/pics/products/cranberries.jpg"
                    },
                    {
                      "name": "Navitas Organics Mulberries",
                      "price": 7.99,
                      "description": "Subtly sweet with a satisfying bite",
                      "weight": 1.00,
                      "quantity": 5525,
                      "category_id": 1,
                      "image": "/pics/products/mulberries.jpg"
                    },
                    {
                      "name": "Organics California Prunes",
                      "price": 31.99,
                      "description": "California grown organic prunes",
                      "weight": 1.00,
                      "quantity": 5825,
                      "category_id": 1,
                      "image": "/pics/products/prunes.jpg"
                    },
                    {
                      "name": "Organics Dried Figs",
                      "price": 13.99,
                      "description": "100% Organic Jumbo Dried Figs",
                      "weight": 1.00,
                      "quantity": 725,
                      "category_id": 1,
                      "image": "/pics/products/dried_figs.jpg"
                    },
                    {
                      "name": "Organic Premium Dried Cranberries",
                      "price": 4.99,
                      "description": "Grown with no chemicals or anything synthetic or non-organic",
                      "weight": 1.00,
                      "quantity": 995,
                      "category_id": 1,
                      "image": "/pics/products/dried_cranberries.jpg"
                    },
                    {
                      "name": "Navitas Organics Goldenberries",
                      "price": 17.99,
                      "description": "Perfectly sweet and tart",
                      "weight": 1.00,
                      "quantity": 1005,
                      "category_id": 1,
                      "image": "/pics/products/goldenberries.jpg"
                    },
                    {
                      "name": "Organic Dried Mangos",
                      "price": 4.99,
                      "description": "Perfectly sweet and tart",
                      "weight": 1.00,
                      "quantity": 1705,
                      "category_id": 1,
                      "image": "/pics/products/dried_mangos.jpg"
                    },
                    {
                      "name": "Organicgirl Mache Rosettes",
                      "price": 2.99,
                      "description": " Pinnacle of gourmet french salad greens, with a delicious sweet nutty flavor, graceful shape, vibrant green color",
                      "weight": 1.00,
                      "quantity": 1105,
                      "category_id": 1,
                      "image": "/pics/products/mache_rosettes.png"
                    },
                    {
                      "name": "Organic Farms Sunflower Seeds",
                      "price": 17.99,
                      "description": "Sunridge Farms Organic Raw Sunflower Seeds",
                      "weight": 1.00,
                      "quantity": 105,
                      "category_id": 5,
                      "image": "/pics/products/sunflower_seeds.jpg"
                    },
                    {
                      "name": "Dried Organic Shiitake Mushrooms",
                      "price": 11.99,
                      "description": "Organic Whole Shiitake Mushrooms",
                      "weight": 1.00,
                      "quantity": 2675,
                      "category_id": 1,
                      "image": "/pics/products/shiitake.jpg"
                    },
                    {
                      "name": "Navitas Organics Cashew Nuts",
                      "price": 19.99,
                      "description": "Nutritious and tasty snack",
                      "weight": 1.00,
                      "quantity": 775,
                      "category_id": 5,
                      "image": "/pics/products/cashews.png"
                    },
                    {
                      "name": "Dried Organic Portobello Mushrooms",
                      "price": 4.99,
                      "description": "Portabellas add deep, robust notes to strong flavored sauces and stews including tomato, red wine or meat based dishes",
                      "weight": 1.00,
                      "quantity": 775,
                      "category_id": 5,
                      "image": "/pics/products/dried_portobello.jpg"
                    },
                    {
                      "name": "Organic Plums",
                      "price": 13.99,
                      "description": "Sweet, tender and very juicy",
                      "weight": 1.00,
                      "quantity": 175,
                      "category_id": 1,
                      "image": "/pics/products/plum.jpg"
                    },
                    {
                      "name": "Organic Deglet Nour Dates",
                      "price": 5.99,
                      "description": "Organic Sun-Dried Deglet Noor Dates",
                      "weight": 1.00,
                      "quantity": 1773,
                      "category_id": 1,
                      "image": "/pics/products/nour_dates.jpg"
                    },
                    {
                      "name": "Organic Traditions Goji Berries",
                      "price": 23.99,
                      "description": "Nutrient dense; High antioxidants",
                      "weight": 1.00,
                      "quantity": 973,
                      "category_id": 1,
                      "image": "/pics/products/organic_traditions_goji.jpg"
                    },
                    {
                      "name": "Dried Organic Pineapple",
                      "price": 9.99,
                      "description": "No added sugar, no sulfites; no pesticides",
                      "weight": 1.00,
                      "quantity": 977,
                      "category_id": 5,
                      "image": "/pics/products/dried_pineapple.jpg"
                    },
                    {
                      "name": "Nutiva Organic Chia Seed",
                      "price": 9.99,
                      "description": "Packed with fiber, protein, minerals, omega-3, antioxidants and other health benefits",
                      "weight": 1.00,
                      "quantity": 1146,
                      "category_id": 5,
                      "image": "/pics/products/chia_seed.png"
                    },
                    {
                      "name": "Healthworks Cacao Powder Raw Organic",
                      "price": 10.99,
                      "description": "USDA certified organic raw cacao powder",
                      "weight": 1.00,
                      "quantity": 1173,
                      "category_id": 5,
                      "image": "/pics/products/cacao.jpg"
                    },
                    {
                      "name": "Organic Extra Virgin Coconut Oil",
                      "price": 10.99,
                      "description": "Pure, cold-pressed, organic, non-GMO extra virgin coconut oil",
                      "weight": 1.00,
                      "quantity": 1241,
                      "category_id": 5,
                      "image": "/pics/products/coconut_oil.jpg"
                    }

                  ]
      for (let i=0; i<storage.length; i+=1) {
        records.push(createRecord(knex, i+1, storage[i].name, storage[i].price, storage[i].description, storage[i].weight, storage[i].quantity, storage[i].category_id, storage[i].image))
      }
      return Promise.all(records);
    })
};
