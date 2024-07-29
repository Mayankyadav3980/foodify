const inputBox = document.getElementById("search-bar");
const searchIcon = document.getElementById("search-icon");
let searchText = "";

inputBox.addEventListener("change", handleInput);
searchIcon.addEventListener("click", handleSearch);

function handleInput(e) {
  // console.log(e);
  // console.log(e.target.value);
  searchText = e.target.value;
  // console.log(searchText);
}

function handleSearch(e) {
  console.log(searchText);
  getData();
}

async function getData() {
  let resObj = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchText
  );
  console.log(resObj);
  let jsonObj = await resObj.json();
  const { idMeal, strName, strMeal, strInstructions, strMealThumb, strYoutube } = jsonObj.meals[0]
  console.log(jsonObj.meals[0]);
  console.log(
    idMeal,
    strMeal,
    strInstructions,
    strMealThumb,
    strYoutube
  );
}


