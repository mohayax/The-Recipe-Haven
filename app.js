const searchForm = document.querySelector('form');
const searchResult = document.querySelector('.search-result');
const container = document.querySelector('.container');

let searchQuery = "";

// API data
const appID = "20aef03a";
const appKey = "5d7a0eacad907f7f2a964ebc5bc87055";


searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    searchQuery = e.target.querySelector('input').value;
// fetch Api function
fetchAPI();

});

async function fetchAPI () {
    const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appID}&app_key=${appKey}&to=25`;
    const response = await fetch(baseUrl);
    const data = await response.json();

    
    generateHtml(data.hits);
}

//getting html 
function generateHtml (results) {
    let generatedHtml = "";
    results.map( (result) => {
        generatedHtml += 
        `
        <div class="single-item">
            <img src="${result.recipe.image}" alt="">
            <div class="recipe-description">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-btn" href="${result.recipe.url}" target="_blank">View Recipe</a>
            </div>
            <p class="more-description">Calories: ${result.recipe.calories.toFixed(2)}</p>
         </div>
        `
    })
    searchResult.innerHTML = generatedHtml;
};

const date = document.querySelector('.date');

let year = new Date().getFullYear();

date.innerText = year