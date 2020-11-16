import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

export class CustomButton {
  title: string;
  onClick: (parameters: object) => any;
  onClickParams?: object = {};
  styles?: string = '';
  disabled?: boolean = false;
}

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent implements OnInit {

  @Input()
  buttonTitle: string;
  @Input()
  popupTitle: any;
  @Input()
  styles: string;
  @Input()
  type: string = 'info';
  @Input()
  customButtons: CustomButton[] = [];
  @Input()
  onConfirm?: any = () => {};
  @Input()
  onReject?: any = () => {};

  isApproved: boolean = false;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService
      .open(content, {ariaLabelledBy: 'modal-basic-title'})
      .result
      .then((result) => {
      }, (reason) => {
      });
  }

  onClose(modal: any, event: string): void {
    switch (this.type) {
      case 'confirm':
        this.isApproved = event === 'approve';
        if (this.isApproved) {
          console.log("Confirmed");
          this.onConfirm();
        } else {
          console.log("Rejected");
          this.onReject();
        }
        break;
      default:
        console.log("Closed");
    }
    modal.close();
  }

}
