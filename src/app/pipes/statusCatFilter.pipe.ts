import { Pipe, PipeTransform } from '@angular/core';
import { Cat } from '../models/cat.model';

@Pipe({
    name: 'statusCatFilter'
})
export class StatusCatFilterPipe implements PipeTransform {
  transform(cats: Cat[], filter: string): Cat[] {
    if(filter == "A l'adoption"){
      return cats.filter(cat => {
        return cat.status === "A l'adoption"
      }) 
    }else if(filter == "Réservé(e)"){
      return  cats.filter(cat => {
        return cat.status === "Réservé(e)"
      })
    }else if(filter == "Résident"){
      return  cats.filter(cat => {
        return cat.status === "Résident"
      }) 
    }else{
      return cats;
    }
}
}