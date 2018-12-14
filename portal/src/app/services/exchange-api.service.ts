import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiUrlsConfig } from './api-urls.config';

@Injectable()
export class ExchangeApiService {

  private productsUrl = apiUrlsConfig.productsUrl;

  constructor(private http: HttpClient) { }


  public getProducts() {
    return this.http.get<string[]>(this.productsUrl);
  }

  public getProductPrices(product: string) {
    return this.http.get<number[]>(this.productsUrl + "/" + product + "/prices");
  }
}
