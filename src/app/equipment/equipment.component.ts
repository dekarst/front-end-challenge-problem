import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { EquipmentService } from '../shared/services/equipment.service';
import { Equipment } from '../shared/models/equipment.model';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  equipment: Equipment[];
  filterForm: FormGroup;
  keyword: string;

  constructor(
    private equipmentService: EquipmentService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      keyword: [null]
    });
  }

  ngOnInit() {
    this.equipmentService
      .getEquipment()
      .subscribe(eq => this.equipment = eq);

    this.filterForm.valueChanges.pipe(debounceTime(100)).subscribe(val => {
      this.keyword = val.keyword && val.keyword.toLowerCase();
    });
  }

  get filteredEquipments() {
    let eq = [];
    if (this.equipment) {
      eq = this.equipment.filter(eq => eq.active);
      if (this.keyword) {
        eq = eq.filter(e =>
          (e.description && e.description.toLowerCase().includes(this.keyword))
          || (e.manufacturer && e.manufacturer.toLowerCase().includes(this.keyword))
          || (e.model_number && e.model_number.toLowerCase().includes(this.keyword))
          || (e.serial_number && e.serial_number.toLowerCase().includes(this.keyword))
          || (e.equipment_type && e.equipment_type.toLowerCase().includes(this.keyword))
        );
      }
    }

    return eq;
  }
}
