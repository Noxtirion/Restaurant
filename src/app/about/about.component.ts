import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  test() {
    //  this.menuService.changeLogging(true);
  }
}
