import { search } from "./app.js";
import { Recipe } from "./recipe.js";

export class Tag{

    constructor(tag, type){
        this.tag = tag;
        this.type = type;
        this.container = document.querySelector(".container__tags");
        this.addTag();
    }

    get tagName(){
        return this.tag;
    }

    addTag = () =>{
        const allTag = document.querySelectorAll(".tag");
        console.log(allTag);
        const btnTag = document.createElement("span");
        btnTag.classList.add("text-white","rounded", "tag");
        switch(this.type){
            case "ingredient": btnTag.classList.add("bg-primary");
            break;
            case "appliance": btnTag.classList.add("bg-success");
            break;
            case "ustensil": btnTag.classList.add("bg-danger");
            break; 
        }
        btnTag.innerHTML = `<span class="tag__text">${this.tag}</span><i class="bi bi-x-circle"></i>`;
        let existe = false;
        if (allTag.length != 0) {
           for ( let tag of allTag) {
                if (tag.textContent == btnTag.textContent){
                existe = true;
                break
                }
            } 
          
        }
        if ( existe == false) {
            this.container.appendChild(btnTag);
            btnTag.addEventListener("click", e =>{
                this.deleteTag(btnTag);
            });
        }
       
    }

    deleteTag = tag =>{
        this.container.removeChild(tag);
        search.deleteTag(this.type, this.tag);
    }

    filterByTags = () =>{
        let recipeFiltered = search.actualList;
        const tags = this.container.querySelectorAll(".tag");
        if(tags.length == 0) {
            Recipe.flushRecipesInDOM();
            Recipe.displayAllRecipes();
        } else {                       //------------change forEach with for---------
            //tags.forEach(tag =>{
            for (const tag of tags) {   
                let recipeFilter = [];
                if(tag.classList.contains("bg-primary")){
                    //recipeFiltered.forEach(recipe =>{
                    for (const recipe of recipeFiltered) {    
                        //recipe.ingredients.forEach(ingredient =>{
                        for (const ingredient of recipe.ingredients) {    
                            if(ingredient.ingredient.toLowerCase().match(tag.innerText)){
                                recipeFilter.push(recipe);
                            }
                        }
                    }
                }
                if(tag.classList.contains("bg-success")){
                   // recipeFiltered.forEach(recipe =>{
                    for (const recipe of recipeFiltered) {
                        if(recipe.appliance.toLowerCase().match(tag.innerText)){
                            recipeFilter.push(recipe);
                        }
                    }
                }
                if(tag.classList.contains("bg-danger")){
                    //recipeFiltered.forEach(recipe =>{
                    for (const recipe of recipeFiltered) {    
                       // recipe.ustensils.forEach(ustensil =>{
                        for (const ustensil of recipe.ustensils) { 
                            if(ustensil.toLowerCase().match(tag.innerText)){
                                recipeFilter.push(recipe);
                            }
                        }
                    }
                }
                recipeFiltered = recipeFilter;
                Recipe.flushRecipesInDOM();
                search.actualList = recipeFiltered;
                //recipeFiltered.forEach(recipe => Recipe.displayRecipe(recipe));
                for (const recipe of recipeFiltered) {
                    Recipe.displayRecipe(recipe); 
                }
            }
        }
    }
}