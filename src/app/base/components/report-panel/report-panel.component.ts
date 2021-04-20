import { Component, OnInit } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { ItypeReport, PDFReport, ReportService } from '../../services/ReportService';

@Component({
  selector: 'app-report-panel',
  templateUrl: './report-panel.component.html',
  styleUrls: ['./report-panel.component.css'],
  providers: [ReportService]
})
export class ReportPanelComponent implements OnInit {

  typeReport: SelectItemGroup[];

  selectedTypeReport: ItypeReport;

  forceDownload: boolean;

  constructor(private reportService: ReportService) { 
    this.typeReport = this.reportService.getTypeReport();
    this.selectedTypeReport = PDFReport;
    this.forceDownload = false;
  }

  ngOnInit(): void {

  }

}
