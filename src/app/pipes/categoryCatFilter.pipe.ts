import { Pipe, PipeTransform } from '@angular/core';
import { Cat } from '../models/cat.model';

@Pipe({
    name: 'categoryCatFilter'
})
export class CategoryCatFilterPipe implements PipeTransform {
  transform(cats: Cat[], filterByCategory: string): Cat[] {
    if(filterByCategory == "chaton"){
      return cats.filter(cat => {
        return cat.category === "chaton"
      }) 
    }else if(filterByCategory == "chat adulte"){
      return  cats.filter(cat => {
        return cat.category === "chat adulte"
      })
    }else if(filterByCategory == "chat en parrainage"){
      return  cats.filter(cat => {
        return cat.category === "chat en parrainage"
      }) 
    }else{
      return cats;
    }
}
}