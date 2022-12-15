import { search } from "./app.js";
import { Input } from "./inputs.js";

export class Ingredients extends Input {
  constructor() {
    super("Ingrédient", "ingredient", "bg-primary");
    this.list = search.actualList;
  }

  refreshList = () => {
    this.list = search.actualList;
    let refreshedList = [];
    for (let i = 0; i < this.list.length; i++) {
      //this.list[i].ingredients.forEach((ingredient) => {---change forEach with for----
        for(const ingredient of this.list[i].ingredients) {
        if (!refreshedList.includes(ingredient.ingredient.toLowerCase()))
          refreshedList.push(ingredient.ingredient.toLowerCase());
      }
    }
    return refreshedList;
  };
}
