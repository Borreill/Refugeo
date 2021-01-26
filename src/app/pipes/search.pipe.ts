import { Pipe, PipeTransform } from '@angular/core';
import { Cat } from '../models/cat.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(cats: Cat[], searchString: string): Cat[] {
    return searchString ? cats.filter(cat => {
      return cat.name.toLowerCase().includes(searchString.toLowerCase())
    }) : cats
  }

}