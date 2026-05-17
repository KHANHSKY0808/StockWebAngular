import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from './http-service';
import { Stock } from '../model/stock';
@Injectable({
  providedIn: 'root',
})
export class StockService extends HttpService {
  private endpoint = 'stocks';

  // GET ALL
  getStocks(): Observable<Stock[]> {
    return this.get<Stock[]>(this.endpoint);
  }

  // GET BY CODE
  getStocksByCode(code: string): Observable<Stock[]> {
  return this.get<Stock[]>(`${this.endpoint}?code=${code}`);
  }
  // CREATE
  createStock(stock: Stock): Observable<Stock> {
    const body = {
      name: stock.name,
      code: stock.code,
      price: stock.price,
      previousPrice: stock.previousPrice,
      exchange: stock.exchange,
      favorite: stock.favorite
    };
    return this.post<Stock>(this.endpoint, body);
  }

  // UPDATE
  updateStock(id: number, stock: Stock): Observable<Stock> {
    return this.put<Stock>(`${this.endpoint}/${id}`, stock);
  }

  // DELETE
  deleteStock(id: number): Observable<any> {
    return this.delete(`${this.endpoint}/${id}`);
  }

  // SEARCH
  searchStocks(keyword: string): Observable<Stock[]> {
    return this.get<Stock[]>(
      `${this.endpoint}?name_like=${keyword}&code_like=${keyword}`
    );
  }
}
