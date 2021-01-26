import { Pipe, PipeTransform } from '@angular/core';
import { Dog } from '../models/dog.model';

@Pipe({
    name: 'statusDogFilter'
})
export class StatusDogFilterPipe implements PipeTransform {
  transform(dogs: Dog[], catFilter: string): Dog[] {
    if(catFilter == "A l'adoption"){
      return dogs.filter(dog => {
        return dog.status === "A l'adoption"
      }) 
    }else if(catFilter == "Réservé(e)"){
      return  dogs.filter(dog => {
        return dog.status === "Réservé(e)"
      })
    }else if(catFilter == "Résident"){
      return  dogs.filter(dog => {
        return dog.status === "Résident"
      }) 
    }else{
      return dogs;
    }
}
}