import { Component, Input, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core'

import { Order } from 'src/app/shared/interfaces/interfaces'
import { ModalOptions, MaterialService } from 'src/app/shared/services/material.service';

@Component({ 
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {

  @Input() orders: Order[]
  @ViewChild('modal') modalRef: ElementRef

  selectedOrder: Order
  modal: ModalOptions

  constructor() { }


  selectOrder(order: Order) {
    this.selectedOrder = order
    this.modal.open()
  }

  computedPrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

  closeModal() {
    this.modal.close()
  }

  ngAfterViewInit(): void {
    MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }
}