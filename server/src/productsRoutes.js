const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const axios = require('axios');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://uriann:Evergreen@allrgcluster-xc2dx.mongodb.net/allrgDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true
}, {
  useUnifiedTopology: true
});

// altering existing product data
// client.connect(err => {
//   const collection = client.db("allrgDB").collection("test_branded_food");
//   collection.find().forEach(async function(document){
//     let currentUPC = document.gtin_upc;
//     // console.log('currentUPC',currentUPC);
//     let newData = await getProductByUPC(currentUPC);
//     // console.log('newData',newData);
//     await collection.updateOne(
//       {gtin_upc: currentUPC},
//       {$set: {
//         "product_name": newData.product_name,
//         "description": newData.description,
//         "images": newData.images,
//         "stores": newData.stores
//       }}
//     );
//   });
//   client.close();
// });

const productSchema = new mongoose.Schema({
  "_id": Number,
  "fdc_id": Number,
  "brand_owner": String,
  "gtin_upc": Number,
  "ingredients": String,
  "serving_size": Number,
  "serving_size_unit": String,
  "household_serving_fulltext": String,
  "branded_food_category": String,
  "data_source": String,
  "modified_date": String,
  "available_date": String,
  "market_country": String,
  "discontinued_date": String
});

const testProductSchema = new mongoose.Schema({
  "_id": Number,
  "fdc_id": Number,
  "brand_owner": String,
  "gtin_upc": Number,
  "ingredients": String,
  "serving_size": Number,
  "serving_size_unit": String,
  "household_serving_fulltext": String,
  "branded_food_category": String,
  "data_source": String,
  "modified_date": String,
  "available_date": String,
  "market_country": String,
  "discontinued_date": String
})
const Product = mongoose.model('Product', productSchema, 'branded_food');
const testProduct = mongoose.model('testProduct', testProductSchema, 'test_branded_food')

router.get("/", async (req, res) => {
  try {
    let products = await Product.find().limit(30);
    console.log(products);
    return res.send(products);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
router.get('/:_id', async (req, res) => {
  try {
    let product = await Product.findOne({
      _id: req.params._id
    });

    console.log(product);
    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
router.get('/DPFilter/:_id', async (req, res) => {
  try {
    let query = {};
    let filteredProducts = await Product.find(query).limit(30);
    console.log(filteredProducts);
    return res.send(filteredProducts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/RFilter/:_id', async (req, res) => {
  try {
    let query = {};
    let filteredProducts = await Product.find(query).limit(30);
    console.log(filteredProducts);
    return res.send(filteredProducts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

async function R_PRODUCTS(cli) {
  try {
    console.log('R_PRODUCTS function');
    client.connect(err => {
      const collection = client.db("allrgDB").collection("test_branded_food");
      collection.find().forEach(async function (document) {
        let ingredients = await document.ingredients;
        // Milk Free:
        let milk_regex = /(\b(?:Milk|Butter|butter fat|butter oil|butter acid|Buttermilk|Casein|Casein hydrolysate|Caseinates|Cheese|Cottage cheese|Cream|Curd|Custard|Diacetyl|Ghee|Half-and-half|Lactalbumin|lactalbumin phosphate|Lactoferrin|Lactose|Lactulose|milkfat|Milk protein hydrolysate|Pudding|Recaldent|Rennet casein|Sour cream|sour cream solids|Sour milk solids|Tagatose|Whey|Whey protein hydrolysate|Yogurt|Margarine||)\b)/gis;
        let contains_milk = milk_regex.test(ingredients);
        if (contains_milk) {
          // add contains_milk field to document
        }
        // https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens
        // Egg Free:
        let egg_regex = /(\b(?:Albumin|albumen|Egg|yolk|Eggnog|Lysozyme|Mayonnaise|Meringue|meringue powder|Ovalbumin|Surimi|Nougat|Marzipan)\b)/gis;
        let contains_egg = egg_regex.test(ingredients);
        if (contains_egg) {

        }

        // Tree Nut Free:
        let treenut_regex = /(\b(?:treenut|tree nut|Almond|Artificial nuts|Beechnut|Black walnut hull extract|Brazil nut|Cashew|Chestnut|Chinquapin nut|Filbert|hazelnut|Gianduja|Ginkgo|butternut|beechnuts|chinquapins|gingko|lychee nut|lichee nut|Litchi nut|Macadamia nut|almond paste|Marzipan|Nangai nut|Nut butter|Nut meat|Nut meal|Nut milk|Nut oils|walnut oil|almond oil|almond paste|Nut paste|Nut pieces|Pecan|Pili nut|pignoli|pigñolia|pignon|pignon|pinyon|Pistachio|Praline|Shea nut|Walnut|Argan oil|Marzipan|)\b)/gis;
        let contains_treenut = treenut_regex.test(ingredients);
        if (contains_egg) {

        }
        // Peanut Free:
        let peanut_regex = /(\b(?:Arachis oil|peanut oil|Artificial nuts|Beer nuts|Goobers|Ground nuts|Lupin|lupine|Mandelonas|Mixed nuts|Monkey nuts|Nut meat|Nut pieces|Peanut butter|Peanut flour|Peanut protein hydrolysate|Peanut|Nut)\b)/gis;
        let contains_peanut = peanut_regex.test(ingredients);
        if (contains_peanut) {

        }

        // Shellfish:
        let shellfish_regex = /(\b(?:Barnacle|Crab|Crawfish|crawdad|crayfish|ecrevisse|Krill|Lobster|langouste|langoustine|Moreton bay bugs|scampi|tomalley|Prawn|Shrimp|crevette|scampi|mollusks|Abalone|Clam|cherrystone|geoduck|littleneck|quahog|Cockle|Cuttlefish|Limpet|lapas|opihi|Mussels|Octopus|Oysters|Periwinkle|Sea cucumber|Sea urchin|Scallops|Snails|escargot|Squid|calamari|Whelk|Turban shell|clam extract|Surimi|Fish stock|Glucosamine|Cuttlefish|Bouillabaisse|)\b)/gis;
        let contains_shellfish = shellfish_regex.test(ingredients);
        if (contains_shellfish) {

        }

        // Wheat:
        let wheat_regex = /(\b(?:wheat|Bread crumbs|Bulgur|Cereal extract|Club wheat|Couscous|Cracker meal|Durum|Einkorn|Emmer|Farina|Farro|Flour|Freekeh|Hydrolyzed wheat protein|Kamut|Matzoh|matzo|matzah|matza|Seitan|Semolina|Spelt|Sprouted wheat|Triticale|Vital wheat gluten|Wheat bran hydrolysate|Wheat germ oil|Wheat grass|Wheat protein isolate|Whole wheat berries)\b)/gis;
        let contains_wheat = wheat_regex.test(ingredients);
        if (contains_wheat) {

        }

        // Soy:
        let soy_regex = /(\b(?:soy|soy oil|Edamame|Miso|Natto|Shoyu|Soya|Soybean|Soy protein|Soy sauce|Tamari|Tempeh|TVP|Textured vegetable protein|Tofu)\b)/gis;
        let contains_soy = soy_regex.test(ingredients);
        if (contains_soy) {

        }

        // Fish:
        let fish_regex = /(\b(?:Anchovie|Anchovies|Bass|Catfish|Cod|Flounder|Grouper|Haddock|Hake|Halibut|Herring|Mahi mahi|Perch|Pike|Pollock|Salmon|Scrod|Sole|Snapper|Swordfish|Tilapia|Trout|Tuna|Fish gelatin|Fish oil|Fish sticks|Worcestershire|Bouillabaisse|Caesar)\b)/gis;
        let contains_fish = fish_regex.test(ingredients);
        if (contains_fish) {

        }

      });
      client.close();
    });

  } catch (error) {
    console.log(error);
  }
}
// R_PRODUCTS(client);

function regexTest() {
  try {
    let expression = /(\b(?:plain|mode)\b)/gis;
    let string =  'PASTEURIZED MILK, CHEESE CULTURE, SALT, ENZYMES, ANNATTO (COLOR).';
    console.log(expression.test(string)); // false
  } catch (error) {
    console.log(error);
  }
}
regexTest();
async function DP_PRODUCTS() {
  try {
    // attribute to vegan

    // attribute to vegetarian


  } catch (error) {
    console.log(error);
  }
}
async function testUpdateOne() {
  try {
    await Product.find({
        _id: ObjectId
      })
      .forEach(function (document) {
        // get upc from document
        let currentUPC = document.project({
          _id: 0,
          fdc_id: 1
        });
        console.log('currentUPC', currentUPC);
        let newData = getProductByUPC(currentUPC);
        console.log('new data from getPRodUPC', newData);
        document.update({
          $set: newData
        });
        console.log(document);

      });
  } catch (error) {
    console.log(error);
  }
}
async function checkRateLimitUPC() {
  try {
    let response = await axios.get('https://api.barcodelookup.com/v2/rate-limits?key=m84lgzijx9jmie4ve8ycega3cqnx1a');
    console.log(response.data);
  } catch (error) {
    console.log('error', error);
  }
}

async function getProductByUPC(upc) {
  try {
    let response = await axios.get('https://api.barcodelookup.com/v2/products?barcode=' + upc + '&formatted=y&key=m84lgzijx9jmie4ve8ycega3cqnx1a');
    console.log('response data', response.data);
    let product_name = await response.data.products[0].product_name,
      description = await response.data.products[0].description,
      images = await response.data.products[0].images,
      stores = await response.data.products[0].stores;
    console.log('product_name: ', product_name);
    let newData = {
      "product_name": product_name,
      "description": description,
      "images": images,
      "stores": stores,
    };
    console.log('newData Obj', newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
}

async function testing(testDoc, collection) {
  try {
    let currentUPC = testDoc.gtin_upc;
    console.log(currentUPC);
    let newData = await getProductByUPC(currentUPC);
    await collection.updateOne({
      gtin_upc: currentUPC
    }, {
      '$set': {
        'new': 0
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  model: Product,
  routes: router
}