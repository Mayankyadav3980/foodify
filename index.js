// if (localStorage.getItem("wishlist") == null) {
//   localStorage.setItem("wislist", JSON.stringify([]));
// }

const inputBox = document.getElementById("search-bar");
const searchIcon = document.getElementById("search-icon");
const resultsWrapper = document.getElementById("results");
const cards_container = document.getElementById("cards_container");
const wishlistBtn = document.getElementById("wishlist-btn");
//showMealList()
inputBox.addEventListener("keyup", handleInput);
searchIcon.addEventListener("click", handleSearch);
wishlistBtn.addEventListener("click", handleWishlist);

let searchText = "";

function handleSearch(e) {
  // getData(inputBox.value);
  getMealDetails(1);
  // console.log('searchIcon clicked');
}

async function getData(mealName) {
  try {
    let resObj = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName
    );
    let { meals } = await resObj.json();
    return meals;
  } catch (e) {
    console.log("err: " + e);
  }
}

async function getMealDetails(id){
  let obj = {};
  try{
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772";
    let resObj2 = await fetch(url);
    let jsObj2 = await resObj2.json();
    obj =  (jsObj2.meals[0]);
  }catch(e){
    console.log('error: ' + e);
  }
  return obj;
  }

async function test(id) {
  console.log("handleDP called " + id );
  // let container = document.getElementById('meal-detail');
  // let container = document.getElementById("cards-container");
  // let details = ` 
  //     <img id="meal-detail-img" src="${obj.strMealThumb}" alt="meal-image">
  //       <div id="meal-txt">
  //           <h1>${obj.strMeal}</h1>
  //           <p>${obj.strInstructions}</p>
  //           <a href="${obj.strYoutube}">watch video </a>
  //       </div>
  // `;

  // container.innerHTML = details;
}


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
        <div class="card">
                <div >
                    <img class="meal_image" src="${obj.strMealThumb}" alt="meal-image">
                </div>
                <p class="meal_name">${obj.strMeal}</p>
                <div id='content'>
                <button type="button" id="read-more-btn" onclick="test(${obj.idMeal})">rm</button>
                <i class="fa-solid fa-heart " id="fav_btn"></i>
                </div>
        </div>
      `;
      } else {
        cards += `
        <div class="card">
                <div >
                    <img class="meal_image" src="${obj.strMealThumb}" alt="meal-image">
                </div>
                <p class="meal_name">${obj.strMeal}</p>
                <div id='content'>
                <button type="button" id="read-more-btn" onclick="test(${obj.idMeal})">rm</button>
                <i class="fa-regular fa-heart " id="fav_btn"></i>
                </div>
        </div>
      `;
      }
    });
  }
  
  cards_container.innerHTML = cards;
}


function handleWishlist(){
  let cards = '';
  let obj = getMealDetails(1);



  cards_container.innerHTML = `
    <div class="card">
                <div >
                    <img class="meal_image" src="${obj.strMealThumb}" alt="meal-image">
                </div>
                <p class="meal_name">${obj.strMeal}</p>
                <div id='content'>
                <button type="button" id="read-more-btn" onclick="test(${obj.idMeal})">rm</button>
                <i class="fa-solid fa-heart " id="fav_btn"></i>
                </div>
        </div>
  `;
  
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
