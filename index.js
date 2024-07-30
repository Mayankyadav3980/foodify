if (localStorage.getItem("wishlist") == null) {
  localStorage.setItem("whislist", JSON.stringify([]));
}

const inputBox = document.getElementById("search-bar");
const searchIcon = document.getElementById("search-icon");
const resultsWrapper = document.getElementById("results");
const cards_container = document.getElementById("cards_container");

let searchText = "";

//showMealList()
inputBox.addEventListener("keyup", handleInput);
searchIcon.addEventListener("click", handleSearch);

async function handleInput(e) {
  let meals = await getData(inputBox.value);
  console.log(meals);
  let wishlist = JSON.parse(localStorage.getItem("wishlist"));
  let cards = "";
  if(meals != null){
    
    meals.forEach((obj) => {
      let isFav = false;
      //checking if current meal obj is present in whishlist or not.
      // for(let i of wishlist){
      //   if(obj.idMeal == i) isFav = true;
      // }
      if (isFav) {
        cards += `
        <p> wishlisted Item </p>
      `;
      } else {
        cards += `
        <div class="card">
                <i class="fa-regular fa-heart " id="fav_btn"></i>
                <div >
                    <img class="meal_image" src="${obj.strMealThumb}" alt="meal-image">
                </div>
                <p class="meal_name">${obj.strMeal}</p>
                <button class="readMore_btn">Read More</button>
        </div>
      `;
      }
    });
  }
  
  cards_container.innerHTML = cards;
}

function handleSearch(e) {
  // console.log(searchText);
  // searchText = inputBox.value;
  getData(inputBox.value);
}

async function getData(mealName) {
  try{
    let resObj = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName
    );
    let { meals } = await resObj.json();
    // console.log(meals);
    return meals;
  }catch(e){
    console.log('err: ' + e);
  }
  
}





























// function renderResults(results){
//   console.log(results);
//   if(!results.length){
//     // return resultsWrapper.classList.remove('show');
//     return;
//   }
//   let content = results.map((item) => {
//     return `<li> ${item} </li>`;
//   }).join('');

//   resultsWrapper.classList.remove('hide');
//   resultsWrapper.innerHTML = `<ul type='none'> ${content}</ul>`;
// }
