import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncateName'
})

export class TruncateNamePipe implements PipeTransform {
  transform(firstname: string, lastname: string): string {
    const fullName = firstname + ' ' + lastname;
    if (fullName.length > 20) {
      return firstname.substring(0, 10) + '...';
    } else {
      return fullName;
    }
  }
}
