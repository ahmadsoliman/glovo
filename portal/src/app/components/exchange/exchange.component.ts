import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ExchangeApiService } from '../../services/exchange-api.service';

@Component({
  selector: 'exchange',
  templateUrl: './exchange.component.html',
  styles: []
})
export class ExchangeComponent implements OnInit { 

  public products = [];
  public filteredProducts = [];
  public productPrices = [];

  public highestExchange = -1;
  public lowestExchange = -1;

  public productCtrl: FormControl = new FormControl();
  public productFilterCtrl: FormControl = new FormControl();
  
  constructor(private exchangeApi: ExchangeApiService) { }

  ngOnInit() {
    this.exchangeApi.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });

    this.productFilterCtrl.valueChanges
      .subscribe(() => {
        this.filterProducts();
      });
    
    this.productCtrl.valueChanges
      .subscribe(() => {
        this.updatePrices();
      });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => product.toLowerCase().includes(this.productFilterCtrl.value.toLowerCase()));
  }

  updatePrices() {
    this.productPrices.length = 0;
    this.highestExchange = -1;
    this.lowestExchange = -1;

    this.exchangeApi.getProductPrices(this.productCtrl.value).subscribe(prices => {
      this.productPrices = prices;

      this.updateHighestAndLowest();
    });
  }

  updateHighestAndLowest() {
    for(let i=0; i<this.productPrices.length; i++) {
      if(!this.productPrices[i]) continue;
      let highest = true, lowest = true;
      for(let j=0; j<this.productPrices.length; j++) {
        if(i==j || !this.productPrices[j]) continue;
        if(this.productPrices[i] < this.productPrices[j]) highest = false;
        if(this.productPrices[i] > this.productPrices[j]) lowest = false;
      }
      if(highest) this.highestExchange = i;
      if(lowest) this.lowestExchange = i;
    }
  }
  
  isHighest(exchange) {
    return exchange == this.highestExchange;
  }
  
  isLowest(exchange) {
    return exchange == this.lowestExchange;
  }
}
