import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyJson'
})
export class PrettyJsonPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return '';

    const json = JSON.stringify(value, null, 2);

    return json
      .replace(/"(.*?)":/g, '<span class="json-key">"$1"</span>:')
      .replace(/: "(.*?)"/g, ': <span class="json-string">"$1"</span>')
      .replace(/: (\d+(\.\d+)?)/g, ': <span class="json-number">$1</span>')
      .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>');
  }

}
