(async () => {
    const response = await fetch("./recipes.json");
    const recipes = await response.json();

    const inputBtn = document.querySelector("#searchBtn");
    
    const searchUlRecipes = document.querySelector("#recipeList");
    
    window.searchRecipes = (filteredRecipes) => {
        filteredRecipes.map((response) => {
            console.log(response)
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