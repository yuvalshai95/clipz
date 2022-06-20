import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';

// Services
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalId = '';

  constructor(public modal: ModalService, public el: ElementRef) {}

  ngOnInit(): void {
    // Fix problem where modal css is getting effected by parent css changes like font color etc..
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement);
  }

  closeModal() {
    this.modal.toggleModal(this.modalId);
  }
}
