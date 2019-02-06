import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core'

import { PositionsService } from 'src/app/shared/services/positions.service'
import { MaterialService, ModalOptions } from 'src/app/shared/services/material.service'
import { Position } from 'src/app/shared/interfaces/interfaces'

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef

  positions: Position[] = []
  loading = false
  modal: ModalOptions

  constructor(private positionService: PositionsService) { }

  ngOnInit() {
    this.loading = true
    this.positionService.getAllPositions(this.categoryId)
    .subscribe(
      (positions) => {
        this.positions = positions
        this.loading = false
      },
      (error) => {
        MaterialService.toast(error.error.message)
      }
    )
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position) {
    this.modal.open()
  }

  addPosition() {
    this.modal.open()
  }

  onCancel() {
    this.modal.close()
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

}