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
    let products = await testProduct.find();
    return res.send(products);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
router.get('/vegan', async (req, res) => {
  try {
    let product = await Product.find( {isVegan: true} );
    console.log(product);
    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get(('/vegetarian'), async (req,res) => {
  try {
    let product = await Product.find( {isVegetarian: true} );
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

async function R_PRODUCTS_DOCS(cli) { // restrictions preference
  try {
    console.log('R_PRODUCTS function');
    client.connect(err => {
      const collection = client.db("allrgDB").collection("test_branded_food");
      collection.find().forEach(async function (document) {
        let ingredients = await document.ingredients;
        let currentUPC = await document.gtin_upc;

        // https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens
        // https://www.dummies.com/food-drink/recipes/vegetarian-vegan/hidden-animal-ingredients-in-foods/
        // Milk Free:
        let milk_regex = /(\b(?:Milk|Butter|butter fat|butter oil|butter acid|Buttermilk|Casein|Casein hydrolysate|Caseinates|Cheese|Cottage cheese|Cream|Curd|Custard|Diacetyl|Ghee|Half-and-half|Lactalbumin|lactalbumin phosphate|Lactoferrin|Lactose|Lactulose|milkfat|Milk protein hydrolysate|Pudding|Recaldent|Rennet casein|Sour cream|sour cream solids|Sour milk solids|Tagatose|Whey|Whey protein hydrolysate|Yogurt)\b)/gis;
        let contains_milk = milk_regex.test(ingredients);
        // add contains_milk field to document
        await collection.updateOne({
          gtin_upc: currentUPC
        }, {
          $set: {
            'contains_milk': contains_milk
          }
        });

        // Egg Free:
        let egg_regex = /(\b(?:Albumin|albumen|Egg|eggs|yolk|Eggnog|Lysozyme|Mayonnaise|Meringue|meringue powder|Ovalbumin|Surimi|Nougat|Marzipan)\b)/gis;
        let contains_egg = egg_regex.test(ingredients);
        await collection.updateOne({
          gtin_upc: currentUPC
        }, {
          $set: {
            'contains_egg': contains_egg
          }
        });

        // // Tree Nut Free:
        let treenut_regex = /(\b(?:treenut|tree nuts|treenuts|tree nut|Almond|almonds|Artificial nuts|Beechnut|Black walnut hull extract|Brazil nut|brazil nuts|Cashew|cashews|chestnuts|Chestnut|Chinquapin nut|Filbert|hazelnut|hazelnuts|Gianduja|Ginkgo|butternut|beechnuts|chinquapins|gingko|lychee nut|lichee nut|Litchi nut|Macadamia nut|almond paste|Marzipan|Nangai nut|Nut butter|Nut meat|Nut meal|Nut milk|Nut oils|walnut oil|almond oil|almond paste|Nut paste|Nut pieces|Pecan|Pili nut|pignoli|pigñolia|pignon|pignon|pinyon|Pistachio|Pistachios|Praline|Shea nut|Walnut|Argan oil|Marzipan)\b)/gis;
        let contains_treenut = treenut_regex.test(ingredients);
        await collection.updateOne({
          gtin_upc: currentUPC
        }, {
          $set: {
            'contains_treenut': contains_treenut
          }
        });

        // Peanut Free:
        let peanut_regex = /(\b(?:Arachis oil|peanut|peanuts|peanut oil|Artificial nuts|Beer nuts|Goobers|Ground nuts|Lupin|lupine|Mandelonas|Mixed nuts|Monkey nuts|Nut meat|Nut pieces|Peanut butter|Peanut flour|Peanut protein hydrolysate|Peanut|Nut)\b)/gis;
        let contains_peanut = peanut_regex.test(ingredients);
        await collection.updateOne({
          gtin_upc: currentUPC
        }, {
          $set: {
            'contains_peanut': contains_peanut
          }
        });

        let sesame_regex = /(\b(?:Sesame|Benne|benne seed|benniseed|Gingelly|gingelly oil|Gomasio|Halvah|Sesame flour|Sesame oil|Sesame paste|Sesame salt|Sesame seed|sesame seeds|Sesamol|Sesamum indicum|Sesemolina|Simsim|Sim sim|Tahini|Tahina|Tehina|Til)\b)/gis;
        let contains_sesame = sesame_regex.test(ingredients);
        await collection.updateOne({
          gtin_upc: currentUPC
        }, {
          $set: {
            'contains_sesame': contains_sesame
          }
        });

        // Wheat:
        let wheat_regex = /(\b(?:wheat|Bread crumbs|Bulgur|Cereal extract|Club wheat|Couscous|Cracker meal|Durum|Einkorn|Emmer|Farina|Farro|Freekeh|Hydrolyzed wheat protein|Kamut|Matzoh|matzo|matzah|matza|Seitan|Semolina|Spelt|Sprouted wheat|Triticale|Vital wheat gluten|Wheat bran hydrolysate|Wheat germ oil|Wheat grass|Wheat protein isolate|Whole wheat berries)\b)/gis;
        let contains_wheat = wheat_regex.test(ingredients);
        await collection.updateOne({
          gtin_upc: currentUPC
        }, {
          $set: {
            'contains_wheat': contains_wheat
          }
        });

        // Soy:
        let soy_regex = /(\b(?:soy|soy oil|Edamame|Miso|Natto|Shoyu|Soya|Soybean|Soy protein|Soy sauce|Tamari|Tempeh|TVP|Textured vegetable protein|Tofu)\b)/gis;
        let contains_soy = soy_regex.test(ingredients);
        await collection.updateOne({
          gtin_upc: currentUPC
        }, {
          $set: {
            'contains_soy': contains_soy
          }
        });

        // Shellfish:
        let shellfish_regex = /(\b(?:Barnacle|Crab|crabmeat|conch|Crawfish|crawdad|crayfish|ecrevisse|Krill|Lobster|langouste|langoustine|Moreton bay bugs|scampi|tomalley|Prawn|Shrimp|crevette|scampi|mollusks|Abalone|Clam|CRUSTACEAN|clams|cherrystone|geoduck|littleneck|lobster|quahog|Cockle|cockles|Cuttlefish|Limpet|lapas|opihi|Mussels|Octopus|Oysters|Oyster|Periwinkle|Sea cucumber|Sea urchin|Scallops|Snails|snail|escargot|Squid|calamari|Whelk|Turban shell|clam extract|Surimi|Fish stock|Glucosamine|Cuttlefish)\b)/gis;
        let contains_shellfish = shellfish_regex.test(ingredients);
        await collection.updateOne({
          gtin_upc: currentUPC
        }, {
          $set: {
            'contains_shellfish': contains_shellfish
          }
        });

        // Fish:
        let fish_regex = /(\b(?:anchovy|Anchovie|Anchovies|Bass|bonito|lumpfish|carp|fish|Catfish|whitefish|Cod|codfish|Flounder|Grouper|Haddock|Hake|Halibut|Herring|Mahi mahi|Perch|Pike|Pollock|Salmon|sardines|mullet|kipper|sardine|Scrod|swai|Sole|Snapper|Swordfish|Tilapia|Trout|MAQUEREAU|Mackerel|Tuna|Fish gelatin|Fish oil|Fish sticks|cephalopods|eel|saury|sprat|heraing|sprats)\b)/gis;
        let contains_fish = fish_regex.test(ingredients);
        await collection.updateOne({
          gtin_upc: currentUPC
        }, {
          $set: {
            'contains_fish': contains_fish
          }
        });

        // Meat:
        let meat_regex = /(\b(?:beef|Turkey|Chicken|Pork|bacon|animal shortening|breast|breasts|ribs|duck|lamb|ham|hams|bison|shoulders|poultry|loins|tenderloins|cured with|cured)\b)/gis;

        let contains_meat = meat_regex.test(ingredients);
        await collection.updateOne({
          gtin_upc: currentUPC
        }, {
          $set: {
            'contains_meat': contains_meat
          }
        });

        // Alt Meat:
        let animalDerived_regex = /(\b(?:honey|beeswax|gelatin|carmine|caraminic acid|caramine cochineal|Glycerides|Glyceride|Isinglass|Lard|Oleic acid|oleinic acid|Pepsin|Stearic acid|octadecanoic acid|Suet|Tallow)\b)/gis;
        let contains_altMeat = animalDerived_regex.test(ingredients);
        await collection.updateOne({
          gtin_upc: currentUPC
        }, {
          $set: {
            'contains_altMeat': contains_altMeat
          }
        });
      });
      // client.close();
    });

  } catch (error) {
    console.log(error);
  }
}

async function DP_PRODUCTS(cli) { // dietary preferences
  try {
    console.log('DP_PRODUCTS');
    client.connect(err => {
      const collection = client.db("allrgDB").collection("test_branded_food");
      collection.find().forEach(async function (document) {
        let currentUPC = await document.gtin_upc;
        let contains_egg = await document.contains_egg;
        let contains_milk = await document.contains_milk;
        let contains_meat = await document.contains_meat;
        let contains_fish = await document.contains_fish;
        let contains_shellfish = await document.contains_shellfish;
        let contains_altMeat = await document.contains_altMeat;

        // attribute to vegan
        if (contains_egg || contains_milk || contains_meat || contains_fish || contains_shellfish || contains_altMeat) {
          // add vegan field true
          await collection.updateOne({
            gtin_upc: currentUPC
          }, {
            $set: {
              'isVegan': false
            }
          });
        } else {
          // add vegan field false
          await collection.updateOne({
            gtin_upc: currentUPC
          }, {
            $set: {
              'isVegan': true
            }
          });
        }

        // attribute to vegetarian
        if (contains_meat || contains_fish || contains_shellfish) {
          // add vegetarian field false
          await collection.updateOne({
            gtin_upc: currentUPC
          }, {
            $set: {
              'isVegetarian': false
            }
          });
        } else {
          // add vegetarian field false
          await collection.updateOne({
            gtin_upc: currentUPC
          }, {
            $set: {
              'isVegetarian': true
            }
          });
        }
      });
      // client.close()
    })

  } catch (error) {
    console.log(error);
  }
}

function regexTest() {
  try {
    let expression = /(\b(?:milk)\b)/gis;
    let string = 'PASTEURIZED MILK, CHEESE CULTURE, SALT, ENZYMES, ANNATTO (COLOR).';
    console.log(expression.test(string)); // false
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