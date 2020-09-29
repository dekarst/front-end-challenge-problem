import { Component, OnInit, Input } from '@angular/core';

import { Equipment } from '../../models/equipment.model';

@Component({
  selector: 'app-equipment-item-component',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.css']
})
export class EquipmentItemComponent implements OnInit {
  @Input() equipment: Equipment;

  public isCollapsed = true;

  constructor() { }

  ngOnInit() { }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
