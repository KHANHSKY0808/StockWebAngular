import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock';
import { FormsModule,NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-stock',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-stock.html',
  styleUrl: './create-stock.css',
})
export class CreateStock {
  public stock!: Stock;
  public confirmed = false;
  public exchanges = ['NYSE', 'NASDAQ', 'AMEX','Other'];
  public message = ''; 

  constructor(private httpService : StockService, private router: Router) {
    this.resetStock();
  }

   
  resetStock() {
    this.stock = new Stock('', '', 0, 0, 'NYSE');
  }

  setStockPrice(price: number) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

    createStockWithEvent(stockForm: NgForm) {
    if (!stockForm.valid) {
      this.message = 'Form invalid!';
      return;
    }
    this.httpService.createStock(this.stock).subscribe({
      next: () => {
        this.message = 'Create success!';
        this.resetStock();
        stockForm.resetForm();
        this.router.navigate(['/']);
      },
      error: () => {
        this.message = 'Create failed!';
      }
    });
  }
}
