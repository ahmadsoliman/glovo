import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { config } from './config.js';

const app = express();
const router = express.Router();

const request = require('request');
const async = require('async');


app.use(cors());
app.use(bodyParser.json());

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

// Set this array with exchanges needed for comparison
const exchanges = config.exchanges;

router.route('/products').get((req, res) => {
  
  async.map(exchanges, moneedaHttpGetProducts, function (err, allProducts){
    if (err) return console.log(err);

    // map all products to their name
    for(let i=0; i<exchanges.length; i++) {
      allProducts[i] = allProducts[i].map((product) => product.id);
    }

    // calculates the intersection of common products between all exchanges
    let products = allProducts[0] ? allProducts[0] : [];
    for(let i=1; i<exchanges.length; i++) {
      products = products.filter(product => allProducts[i].includes(product));
    }
    
    res.json(products);    
  });

});


// helper function gets all products on an exchange
function moneedaHttpGetProducts(exchange, callback) {
  const options = {
    url : config.baseUrl + exchange + '/products',
    json : true,
    auth : {
      'bearer': config.authToken
    }
  };
  request(options,
    function(err, res, body) {
      callback(err, body);
    }
  );
}
