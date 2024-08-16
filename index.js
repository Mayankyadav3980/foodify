const wishlistItemsNo = document.getElementById("wishlist-items");

// checking if local storage has wishlist array or not
if (localStorage.getItem("wishlist") == null) {
  localStorage.setItem("wishlist", JSON.stringify([]));
  wishlistItemsNo.innerHTML = 0;
} else {
  let arr = JSON.parse(localStorage.getItem("wishlist"));
  wishlistItemsNo.innerHTML = arr.length;
}

const inputBox = document.getElementById("search-bar");
const searchIcon = document.getElementById("search-icon");
const cards_container = document.getElementById("cards_container");
const wishlistBtn = document.getElementById("wishlist-btn");
const homeBtn = document.getElementById("home-btn");

inputBox.addEventListener("keyup", handleInput);
searchIcon.addEventListener("click", handleSearch);
wishlistBtn.addEventListener("click", handleWishlist);
homeBtn.addEventListener("click", handleHome);

function handleSearch(e) {
  handleInput();
}

// function to fetch data from api according to meal name
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

// function to get details of a meal based on id
async function getMealDetails(id) {
  let obj = {};
  try {
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
    let resObj2 = await fetch(url);
    let jsObj2 = await resObj2.json();
    obj = jsObj2.meals[0];
  } catch (e) {
    console.log("error is: " + e);
  }
  return obj;
}

//  this function  fetches details of a particlur meal according to id, and displays it on UI
async function handleMealDetails(id) {
  let obj = await getMealDetails(id);
  let details = ` 
  <div id="meal-detail">

        <div id="first-block">
          <img id="meal-detail-img" src="${obj.strMealThumb}" alt="meal-image">
          <div>
            <h1>${obj.strMeal}</h1>
            <button class="btn btn-warning" id="video-btn"><a href="${obj.strYoutube} target="_blank">watch video </a></button>
          </div>
        </div>
      
        <div id="second-block">
            <h3> Cooking Instructions </h3>
            <p>${obj.strInstructions}</p>
           
        </div>
        
  </div>
  `;

  cards_container.innerHTML = details;
}

// function to handle the input entered by the user, and displaying the results accordingly
async function handleInput() {
  let meals = await getData(inputBox.value);
  let wishlist = JSON.parse(localStorage.getItem("wishlist"));
  let cards = "";
  if (meals != null) {
    meals.forEach((obj) => {
      let isFav = false;
      // checking if current meal obj is present in whishlist or not.
      for (let i of wishlist) {
        if (obj.idMeal == i) isFav = true;
      }
      if (isFav) {
        cards += `
        <div class="card">
                <div >
                    <img class="meal_image" src="${obj.strMealThumb}" alt="meal-image">
                </div>
                <p class="meal_name">${obj.strMeal}</p>
                <div id='content'>
                <button type="button" id="read-more-btn" onclick="handleMealDetails(${obj.idMeal})">Read More</button>
                <button onclick="updateWishlist(${obj.idMeal})" id="fav_btn" ><i class="fa-solid fa-heart " ></i></button>
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
                <button type="button" id="read-more-btn" onclick="handleMealDetails(${obj.idMeal})">Read More</button>
                <button onclick="updateWishlist(${obj.idMeal})" id="fav_btn" ><i class="fa-regular fa-heart "></i></button>
                </div>
        </div>
      `;
      }
    });
  } else {
    cards = " <h1>Sorry, The meal you are searching is not available </h1>";
  }

  cards_container.innerHTML = cards;
}

// function to render the wishlist items in the wishlist section
async function handleWishlist() {
  let cards = "";
  let wishlistArr = JSON.parse(localStorage.getItem("wishlist"));
  if (wishlistArr.length != 0) {
    for (let i = 0; i < wishlistArr.length; i++) {
      let obj = await getMealDetails(wishlistArr[i]);

      cards += `
        <div class="card">
            <div >
                <img class="meal_image" src="${obj.strMealThumb}" alt="meal-image">
            </div>
            <p class="meal_name">${obj.strMeal}</p>
            <div id='content'>
            <button type="button" id="read-more-btn" onclick="handleMealDetails(${obj.idMeal})">Read More</button>
            <button onclick="updateWishlist(${obj.idMeal})" id="fav_btn" ><i class="fa-solid fa-heart "></i></button>
            </div>
         </div>
  `;
    }
    const fav_container = document.getElementById("bt-fav");
    fav_container.innerHTML = cards;
  } else {
    const fav_container = document.getElementById("bt-fav");
    fav_container.innerHTML = "Your wishlist is empty";
  }
}

// It clears the main page, when user clicks on navbar home button
function handleHome() {
  cards_container.innerHTML = "";
  inputBox.value = "";
}

// function to add or remove a meal item from wishlist
function updateWishlist(id) {
  let wishlistArr = JSON.parse(localStorage.getItem("wishlist"));
  let flag = false;

  wishlistArr.forEach((aId) => {
    if (id == aId) flag = true;
  });

  if (flag) {
    let idx = wishlistArr.indexOf(id);
    wishlistArr.splice(idx, 1);
    alert("Meal removed from wishlist successfully");
  } else {
    wishlistArr.push(id);
    alert("Meal added to wishlist successfully");
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlistArr));
  wishlistItemsNo.innerHTML = wishlistArr.length;
  handleWishlist();
  handleInput();
}
