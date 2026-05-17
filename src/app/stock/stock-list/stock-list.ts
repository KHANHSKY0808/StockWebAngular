import { Component,OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock';
import { UserService } from '../../services/user-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockItem } from '../stock-item/stock-item';
import { CreateStock } from '../create-stock/create-stock';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stock-list',
  imports: [CreateStock, StockItem,
            FormsModule,CommonModule],
  templateUrl: './stock-list.html',
  styleUrl: './stock-list.css',
})
export class StockList  implements OnInit{
  stocks: Stock[] = [];
  page = 1;
  pageSize = 10;
  filteredStocks: Stock[] = []; 
  searchText: string = '';
  selectedStock: Stock | null = null;
  isEditDialogOpen = false;
  isDetailDialogOpen = false;
  totalPages = 0;
  visiblePages: number[] = [];

  constructor(private httpService: StockService,
              private router: Router,
              private userService: UserService) {}
    nextPage() {
      this.setPage(this.page + 1);
    }

    ngOnInit() {
      console.log('Page No. :',
        this.router.routerState.snapshot.root.queryParams['page']
      );
    this.loadStocks();
  }


   loadStocks() {
    this.httpService.getStocks().subscribe((data: any[]) => {
      this.stocks = data.map(item => {
        const stock = new Stock(
          item.name,
          item.code,
          item.price,
          item.previousPrice,
          item.exchange
        );
        stock.id = item.id;
        stock.favorite = item.favorite;
        return stock;
      });

      this.filteredStocks = this.stocks;
      this.updatePagination();
    });
  }

  //SEARCH
  onSearch() {
  const keyword = this.searchText.trim().toLowerCase();

  if (!keyword) {
    this.filteredStocks = this.stocks;
    this.updatePagination();
    return;
  }

  this.filteredStocks = this.stocks.filter(stock =>
    stock.name.toLowerCase().includes(keyword) ||
    stock.code.toLowerCase().includes(keyword)
  );
  this.updatePagination();
}

  // Pagination helpers
  private updatePagination() {
    this.totalPages = Math.max(1, Math.ceil(this.filteredStocks.length / this.pageSize));
    if (this.page > this.totalPages) this.page = this.totalPages;
    this.computeVisiblePages();
  }

  private computeVisiblePages() {
    const total = this.totalPages;
    const current = this.page;
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      let start = Math.max(1, current - 3);
      let end = Math.min(total, start + 6);
      if (end - start < 6) start = Math.max(1, end - 6);
      for (let i = start; i <= end; i++) pages.push(i);
    }

    this.visiblePages = pages;
  }

  public setPage(n: number) {
    if (n < 1) n = 1;
    if (n > this.totalPages) n = this.totalPages;
    this.page = n;
    // update query param for bookmark/share
    this.router.navigate([], { queryParams: { page: this.page }, replaceUrl: true });
    this.computeVisiblePages();
  }

  public changePageSize(size: number) {
    this.pageSize = size;
    this.updatePagination();
  }

  // returns slice for current page
  public get pagedStocks(): Stock[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredStocks.slice(start, start + this.pageSize);
  }

  onToggleFavourite(stock: Stock) {
  const updated = new Stock(
    stock.name,
    stock.code,
    stock.price,
    stock.previousPrice,
    stock.exchange
  );
  updated.id = stock.id;
  updated.favorite = !stock.favorite;

  this.httpService.updateStock(stock.id, updated)
    .subscribe(() => this.loadStocks());
  }

  onDeleteStock(stock: Stock) {
    this.httpService.deleteStock(stock.id)
      .subscribe(() => this.loadStocks());
  }

  // mở dialog update
    onUpdateStock(stock: Stock) {
    this.selectedStock = new Stock(
      stock.name,
      stock.code,
      stock.price,
      stock.previousPrice,
      stock.exchange
    );

    this.selectedStock.id = stock.id;
    this.selectedStock.favorite = stock.favorite;

    this.isEditDialogOpen = true;
  }

  // mở dialog detail
  onViewDetail(stock: Stock) {
    if (!this.userService.isLoggedIn()) {
      // redirect to login when not authenticated
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/detail', stock.code]);
  }

  // đóng dialog
  closeDialog() {
    this.isEditDialogOpen = false;
    this.isDetailDialogOpen = false;
    this.selectedStock = null;
  }

  // save update
  saveUpdate() {
    if (this.selectedStock) {
      const updated = new Stock(
        this.selectedStock.name,
        this.selectedStock.code,
        this.selectedStock.price,
        this.selectedStock.previousPrice,
        this.selectedStock.exchange
      );
      updated.id = this.selectedStock.id;
      updated.favorite = this.selectedStock.favorite;

      this.httpService.updateStock(this.selectedStock.id, updated)
        .subscribe(() => {
          this.loadStocks();
          this.closeDialog();
        });
    }
  }
}
