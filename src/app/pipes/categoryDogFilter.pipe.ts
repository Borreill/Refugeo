import { Pipe, PipeTransform } from '@angular/core';
import { Dog } from '../models/dog.model';

@Pipe({
    name: 'categoryDogFilter'
})
export class CategoryDogFilterPipe implements PipeTransform {
  transform(dogs: Dog[], filterByCategory: string): Dog[] {
    if(filterByCategory == "chiot"){
      return dogs.filter(dog => {
        return dog.category === "chiot"
      }) 
    }else if(filterByCategory == "chien adulte"){
      return  dogs.filter(dog => {
        return dog.category === "chien adulte"
      })
    }else if(filterByCategory == "chien en parrainage"){
      return  dogs.filter(dog => {
        return dog.category === "chien en parrainage"
      }) 
    }else{
      return dogs;
    }
}
}