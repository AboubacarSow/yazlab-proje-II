import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyCsv'
})
export class PrettyCsvPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return '';

    // Normalize to array
    const data = Array.isArray(value) ? value : [value];

    if (!data.length || typeof data[0] !== 'object') return '';

    const headers = Object.keys(data[0]);

    const csvRows = [
      headers.join(','), // header row
      ...data.map(row =>
        headers.map(h => this.escape(row[h])).join(',')
      )
    ];

    return csvRows.join('\n');
  }

  private escape(value: any): string {
    if (value === null || value === undefined) return '';
    const str = String(value);
    return `"${str.replace(/"/g, '""')}"`;
  }

}
