(async () => {
    const response = await fetch("./recipes.json");
    const recipes = await response.json();

    const inputBtn = document.querySelector("#searchBtn");
    
    const searchUlRecipes = document.querySelector("#recipeList");


    window.searchRecipes = (filteredRecipes) => {
        searchUlRecipes.innerHTML="";    
        filteredRecipes.map((response) => {
            let li = document.createElement("li");
            const liDiv = `
             <div>${response.title}</div>
            `;
            li.innerHTML = liDiv
            searchUlRecipes.appendChild(li); 
        });
    }
    
    window.search = () => {
        const userInput = document.querySelector("#searchInput").value;
        const filteredRecipes = recipes.filter((response) => {
            return response.title.toLowerCase().includes(userInput.toLowerCase()) ||
            response.ingredients.join('').toLowerCase().includes(userInput.toLowerCase());
        })
        searchRecipes(filteredRecipes); 
    }
    inputBtn.addEventListener("click", search);         
})();