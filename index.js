(async () => {
    const response = await fetch("./recipes.json");
    const recipes = await response.json();

    const inputBtn = document.querySelector("#searchBtn");
    
    const searchUlRecipes = document.querySelector("#recipeList");

    const detailsRecipes = (response) =>{

        recipeDetailsContainer.innerHTML=""
        let div = document.createElement("div")
        div.className = "recipeDetailsDiv"
        let recipeDetails =
        `
        <h1>${response.title}</h1>

        <h3>Ingredients</h3>

        <ul>${response.ingredients.map((ingredients)=>{
            return `<li>${ingredients}</li>`
        }).join('')}
        </ul>

        <h3>Instruction</h3>

        <ol>
        ${response.instructions.map((instruction)=>{
            return `<li>${instruction}</li> </br> `
        }).join('')}
        </ol>
        `
        div.innerHTML = recipeDetails 
        recipeDetailsContainer.appendChild(div)
    }

    window.searchRecipes = (filteredRecipes) => {
        searchUlRecipes.innerHTML="";    
        filteredRecipes.map((response) => {
            let li = document.createElement("li");
            const liDiv = `
            <div>
            <h3>${response.title}.</h3> 
            <div>${response.description}</div>
            </div>
            `;
            li.innerHTML = liDiv
            li.addEventListener("click",()=>{
                detailsRecipes(response)
            })
            searchUlRecipes.appendChild(li); 
        });
    }
    
    window.search = () => {
        const userInput = document.querySelector("#searchInput").value;

        if (userInput === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a search term',
            });
            return
        }

        const filteredRecipes = recipes.filter((response) => {
            return response.title.toLowerCase().includes(userInput.toLowerCase()) ||
            response.ingredients.join('').toLowerCase().includes(userInput.toLowerCase());
        })
        if (filteredRecipes.length === 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Recipe Is Not Found',
            });
        }else{
            Swal.fire({
                icon: 'success',
                title: 'Hurray!',
                text:'Recipes are Found'
            })
        }
        searchRecipes(filteredRecipes); 
    }
    inputBtn.addEventListener("click", search);         
})();