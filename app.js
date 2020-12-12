///// GET SELECTORS

const detailsContentContainer = document.querySelector(".details-content");
const navMenu = document.querySelector(".nav-menu");
const hamburgerMenu = document.querySelector(".nav");
const inner = document.querySelector(".inner");
const recipesRapper = document.querySelector(".main-contents");
const recipeContainer = document.querySelector(".extra");
const detailsContainer = document.querySelector(".details-container");
const optionSelect = document.querySelector(".select");
const contentLoad = document.querySelector(".content-load");
// const contentName = document.querySelector(".content-name");
// const contentImg = document.querySelector(".content-image");
// const contentInfo = document.querySelector(".content-description");
//// CREATE FUNCTIONS

// FETCH API
const apiLink =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast";
const fetchApi = async (link) => {
  const response = await axios.get(link);
  console.log(response.data.meals);
  const data = response.data.meals;
  data.forEach((meal) => {
    // console.log(meal.strMeal);
    // console.log(meal.strMealThumb);
    // console.log(meal.idMeal);
    renderContent(meal);
  });
  //
  return response.data.meals;
};
const meals = fetchApi(apiLink);
// RENDER MEALS
const renderContent = ({ strMeal, strMealThumb, idMeal }) => {
  const recipesContainer = document.createElement("div");
  recipesContainer.classList.add("recipe");
  recipesContainer.innerHTML = `
  <div class="extra" id="${idMeal}">
  <!--<i class="far fa-heart to-favorites heart"></i>-->
  <img src="${strMealThumb}" alt="${strMeal}" class="recipe-img" />
  </div>
  <h4 class="recipe-name">${strMeal}</h4>
  `;
  recipesRapper.appendChild(recipesContainer);
};

const displayContentInfo = (id) => {
  const fetchApi = async (link) => {
    link = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await axios.get(link);
    console.log(response.data.meals[0]);
    const singleMeal = response.data.meals[0];
    showInfo(singleMeal);
    return response.data.meals[0];
  };
  function showInfo({ strMeal, strMealThumb, strInstructions }) {
    detailsContainer.innerHTML = `
    <img src="${strMealThumb}" alt="${strMeal}" class="content-image" />
            <p class="close">close</p>
            <h4 class="content-name">${strMeal}</h4>
            <h5>Procedures:</h5>
            <p class="content-description">${strInstructions}</p>
    `;
    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", () => {
      detailsContentContainer.style.display = "none";
    });
  }
  fetchApi();
};

// ADD EVENT LISTENERS

hamburgerMenu.addEventListener("click", () => {
  navMenu.classList.toggle("slide-in");
});
inner.addEventListener("click", (e) => {
  navMenu.classList.remove("slide-in");
  const clickedParent = e.target.parentElement;
  const getMeal = () => {
    const option = e.target.innerText;
    recipesRapper.innerHTML = "Loading";
    contentLoad.textContent = option;
    const fetchApi = async (link) => {
      let attach = `c=${option}`;
      if (!clickedParent.classList.contains("category")) {
        attach = `a=${option}`;
      } else attach;
      link = `https://www.themealdb.com/api/json/v1/1/filter.php?${attach}`;
      const response = await axios.get(link);
      console.log(response.data.meals);
      const data = response.data.meals;
      for (i = 0; i <= 12; i++) {
        const meal = data[i];
        console.log(meal);
        if (!(meal == undefined)) {
          renderContent(meal);
        }
      }
      // data.forEach((meal) => {
      //   // console.log(meal.strMeal);
      //   // console.log(meal.strMealThumb);
      //   // console.log(meal.idMeal);
      //   renderContent(meal);
      // });
      //
      return response.data.meals;
    };
    fetchApi();
    recipesRapper.innerHTML = "";
  };
  if (clickedParent.classList.contains("category")) {
    getMeal();
  } else if (clickedParent.classList.contains("area")) {
    getMeal();
  }
});
inner.addEventListener("click", (e) => {
  const clicked = e.target.parentElement;
  if (clicked.classList.contains("extra")) {
    console.log(clicked);
    console.log(clicked.id);
    displayContentInfo(clicked.id);
    detailsContentContainer.style.display = "initial";
  }
});
