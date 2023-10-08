import { Injectable } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root",
})
export class Modal {
  constructor(private modalService: NgbModal) {}

  showModal(content, modalSize, modalClass, backdrop) {
    this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: modalSize,
      windowClass: modalClass,
      backdrop: backdrop,
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
