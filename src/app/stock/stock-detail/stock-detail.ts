import { Component, ChangeDetectorRef } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';
@Component({
  selector: 'app-stock-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-detail.html',
  styleUrl: './stock-detail.css',
})
export class StockDetail implements OnInit {
  public stock: Stock | null = null;
  constructor(private stockService: StockService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  if (typeof window === 'undefined') {
    // Nếu đang render phía server, bỏ qua việc redirect.
    return;
  }

  const currentUser = this.userService.getCurrentUser();

  if (!currentUser) {
    this.router.navigate(['/login']);
    return;
  }

  const stockCode = this.route.snapshot.paramMap.get('code');

  if (!stockCode) return;

  this.stockService.getStocksByCode(stockCode)
    .subscribe({
      next: (data) => {
        if (data.length > 0) {
          // Delay assignment to avoid ExpressionChangedAfterItHasBeenCheckedError
          setTimeout(() => {
            this.stock = data[0];
            // ensure change detection runs and stabilizes the view
            try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
          });
        } else {
          console.log('Không có dữ liệu');
        }
      },
      error: (err) => console.error(err)
    });
}
}
