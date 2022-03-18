import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ComService } from 'src/app/services/com.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @Output() public onMenuClicked: EventEmitter<any>;

  constructor(private comS: ComService) {
    // this.onMenuClicked = new EventEmitter();
  }

  ngOnInit(): void {
  }

  menuClick(): void{
    // this.onMenuClicked.emit();
    this.comS.isDrawerOpen.next(!this.comS.isDrawerOpen.value);
  }

}
