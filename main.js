var recipeArr = [];
var recipeObj = {};


let addRecipe = () =>{
    let recipeName = document.getElementById("recipeNameInp").value;
    let ingrediant = document.getElementById("ingrediantInp").value;
 
    if(recipeName == '' || ingrediant == ''){
        if(recipeName == ''){
            recipeNameInp.style.background = "#ffdddd";
        }
        if(ingrediant == ''){
            ingrediantInp.style.background = "#ffdddd";
        }

    }else if(recipeName !== '' || ingrediant !== ''){
        var ingrediantAr = ingrediant.split(',');
    
        recipeObj.recipeName = recipeName;
        recipeObj.ingrediantAr =ingrediantAr;

        recipeArr.push(recipeObj);
        recipeObj = {};
    }
       
    

    localStorage.setItem("recipeArr", JSON.stringify(recipeArr));

    console.log(recipeArr);
    document.getElementById("myForm").reset();

    fetchRecipeData();
}

// Delete Recipe

let deleteRecipe = (id) =>{
    var recipe =JSON.parse(localStorage.getItem('recipeArr'));
    recipe.splice(id, 1);
    localStorage.setItem("recipeArr", JSON.stringify(recipe));
    fetchRecipeData();
}

// Edit Recipe

let recipeEditInpe = document.getElementById("recipeEditInp");
let ingrediantEditInp = document.getElementById("ingrediantEditInp");
let indexItem =  document.getElementById("indexItem");

let editRecipe = (id) =>{
    var recipe =JSON.parse(localStorage.getItem('recipeArr'));

    recipeEditInpe.value = recipe[id].recipeName;
    ingrediantEditInp.value = recipe[id].ingrediantAr;
    indexItem.value=id; 
}
let updateRecipe = () =>{
    var recipe =JSON.parse(localStorage.getItem('recipeArr'));
    var  ingrediantEdit = ingrediantEditInp.value;
    var ingrediantAr = ingrediantEdit.split(',');


    recipe[indexItem.value].recipeName =  recipeEditInpe.value;
    recipe[indexItem.value].ingrediantAr =   ingrediantAr;

    localStorage.setItem("recipeArr", JSON.stringify(recipe));
    fetchRecipeData();
}

let fetchRecipeData = () =>{

    var recipe =JSON.parse(localStorage.getItem('recipeArr'));
    let recipeIngOutput = document.getElementById("recipeIngOutput");

    recipeIngOutput.innerHTML = '';
    
    for(let i=0; i<recipe.length; i++){        
        let recipeName = recipe[i].recipeName;        
        let ingrediantArr = recipe[i].ingrediantAr;
        var outPut = "";
       
        var modalid  = "myModal" + i;      
        // outPut += "<table>";
        for(let j=0; j<ingrediantArr.length; j++){                           
            outPut +="<ul>";
            outPut +="<li>"+ingrediantArr[j] +"</li>";
            outPut +="</ul>";
        }
        // outPut += "</table>";
        recipeIngOutput.innerHTML +='<div id="accordion">'+
                                        '<div class="card">'+
                                            '<div class="card-header">'+
                                                '<a class="card-link" data-toggle="collapse" href="#' + modalid + '">'+
                                                    '<div>'+
                                                        '<h4>'+recipeName+'</h4>'+
                                                    '</div>'+
                                                '</a>'+
                                            '</div>'+
                                            '<div id="' + modalid + '" class="collapse" data-parent="#accordion">'+
                                                '<div class="card-body">'+
                                                    '<h4 class="text-center text-info">' + "Ingrediants" + '</h4>' +
                                                    '<div>'+
                                                    '<p>'+outPut+'</p>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<button onclick="event.preventDefault();deleteRecipe('+i+')" class="btn btn-primary ml-4 mb-2">Delete</button>'+
                                                '<button onclick="event.preventDefault();editRecipe('+i+')" class="btn btn-primary ml-2 mb-2" data-toggle="modal" data-target="#exampleModalOne">Edit</button>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'                                            
    }
}



window.onload = fetchRecipeData();