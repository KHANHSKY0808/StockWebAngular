import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Stock } from '../../model/stock';
import { EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: '[app-stock-item]',
  imports: [CommonModule],
  templateUrl: './stock-item.html',
  styleUrl: './stock-item.css',
})
export class StockItem {
  @Input() stock!: Stock;

  @Output() toggleFavourite = new EventEmitter<Stock>();
  @Output() deleteStock = new EventEmitter<Stock>();     
  @Output() updateStock = new EventEmitter<Stock>();
  @Output() viewDetail = new EventEmitter<Stock>();

  viewDetailHandler() {
    this.viewDetail.emit(this.stock);
  }
  onToggleFavourite() {
    this.toggleFavourite.emit(this.stock);
  }
  onDelete() {
    this.deleteStock.emit(this.stock);
  }
  onUpdate() {
    this.updateStock.emit(this.stock);
  }
}
