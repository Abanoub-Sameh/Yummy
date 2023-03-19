
// start page
(function()  {
   mealSearch("", "https://www.themealdb.com/api/json/v1/1/search.php?s=", "content");
})();
// end start




async function mealSearch(meal, url, section) {
   $(".loading").removeClass("d-none");
   const data = await fetch(`${url}${meal}`);
   const result = (await data.json()).meals;
   $(".loading").addClass("d-none");
   displayMeals(result, section);
}


// Display meals in page
function displayMeals(arrOfMeals, section) {

   let cartona = ``;
   for (let i = 0; i < arrOfMeals.length; i++) {
      cartona += `
      <div class="col-xl-3 col-lg-4 col-md-6">
         <div class="item rounded-3" onclick="getDetails(${arrOfMeals[i].idMeal},'${section}')">
            <div class="image position-relative">
               <div> <img class="w-100" src="${arrOfMeals[i].strMealThumb}"></div>
                  <div class="layer position-absolute end-0 bottom-0 start-0 d-flex align-items-center text-black  py-2 px-2 ">
                  <h4>${arrOfMeals[i].strMeal}</h4>
               </div>
            </div>
         </div>
      </div>
      `;
   }

   $(`#${section}`).html(`<div class="row py-5 g-4 ms-5"> ${cartona} </div>`);
}




// display meal details by id meal when click on meal
async function getDetails(id, section) {
   
   
   $(".loading").removeClass("d-none");
   $(".search").addClass("d-none");
   const apiDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
   const resultDetails = (await apiDetails.json()).meals[0];
   setTimeout(function () {
      $(".loading").addClass("d-none");} , 500);

   // meal details
   $(`#${section}`).html(`
   <div class="row py-5 g-4 ms-5">
   <div class="col-md-4">
     <div class="image">
       <img class="w-100 rounded-3" src="${resultDetails.strMealThumb}" alt=""/>
       <h2 class="mt-3 "> ${resultDetails.strMeal} </h2>
     </div>
   </div>
   <div class="col-md-8">
     <h3>Instructions</h3>
     <p class="pt-3">
      ${resultDetails.strInstructions}
     </p>
     <h4 class="fw-bolder">Area : <span class="fw-normal">${resultDetails.strArea}</span></h4>
     <h4 class="fw-bolder">Category : <span class="fw-normal">${resultDetails.strCategory}</span></h4>
     <h4 class="recipes-title">Recipes :</h4>

     <ul class="d-flex flex-wrap mt-4" id="recipes">
      
     </ul>
     <h4  class="tags-title">Tags :</h4>

     <ul class="d-flex flex-wrap mt-4 gap-3" id="tags">
      
     </ul>

     <a href="${resultDetails.strSource}" target="_blank" class="btn btn-success">Source</a>
     <a href="${resultDetails.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
     
   </div>
 </div>
   `);

   //  recipes
      if (recipes == undefined) {
      $(".recipes-title").addClass("d-none");
   }
   else{
      let recipes = ``;
      for (let i = 1; i <= 20; i++) {
         if (resultDetails[`strIngredient${i}`]) {
            recipes += `      
         <li class="alert alert-info m-2 p-1">
         ${resultDetails[`strMeasure${i}`]}${resultDetails[`strIngredient${i}`]}
      </li>`;
         $("#recipes").html(recipes);
         }
      }
   }

   // tags
   let tagsArray = resultDetails.strTags?.split(","); 
   if (tagsArray == undefined) {
      $(".tags-title").addClass("d-none");
   }
   else{ 
      let tags = ``;
      for (let i = 0; i < tagsArray?.length; i++) {
         tags += `      
         <li class="alert alert-danger p-1">
         ${tagsArray[i]}
      </li>
         `;
         $("#tags").html(tags);
      }
   }
}


// open sliderBar
$("#menuIcon").on("click", showMenu);
$(".sliderBar-links a").on("click", function (e) {
   selectArea(e.target.innerHTML);
});


// show menu
function showMenu() {
   if ($("#sliderBar").css("left") == "-250px") {
      $("#sliderBar").animate({left: 0 });
      $("#menuIcon").removeClass("fa-bars").addClass("fa-x");
      $(".sliderBar-links li").animate({paddingTop: 15},1000 );
   } 
   else {
      $("#sliderBar").animate({left: -250});
      $("#menuIcon").removeClass("fa-x").addClass("fa-bars");
      $(".sliderBar-links li").animate({paddingTop: 300},1000);
   }
}


//  choose from sliderBar
function selectArea(btn) {
   if (btn == "Search") {
      search();
   } else if (btn == "Categories") {
      Category();
   } else if (btn == "Area") {
      area();
   } else if (btn == "Ingredients") {
      ingredit();
   } else {
      ContactUs();
   }

   showMenu();
}

//search page
function search(){
   
   $("#content").html(`
      
   <div class="search row pt-5 gy-3 ms-5">
     <div class="col-lg-6">
       <input class="form-control" placeholder="Search By Name" id="searchName"/>
     </div>

     <div class="col-lg-6">
       <input class="form-control" placeholder="Search By First Letter" id="searchLetter"/>
     </div>
   </div>

   <div class="content-area pt-5" id="displaymeals">
 
   </div>
   `);

   // search by name
   $("#searchName").on("input", function () {
      console.log($("#searchName").val());
      mealSearch($("#searchName").val(), "https://www.themealdb.com/api/json/v1/1/search.php?s=", "displaymeals");
   });

   // search by letter
   $("#searchLetter").on("input", function () {
      this.value = $("#searchLetter").val().length > 0 ? $("#searchLetter").val().slice(0, 1) : "";

      mealSearch(this.value.length > 0 ? this.value : "m", "https://www.themealdb.com/api/json/v1/1/search.php?f=", "displaymeals");
   });
}


// contact us page 
function ContactUs() {
   
   $("#content").html(`

   <form>
      <div class="row ms-5 gy-3 vh-100 align-content-center">

         <div class="col-lg-6 position-relative">
            <input type="text" class="form-control" placeholder="Enter Your Name"/>
            <p class="alert alert-danger mt-2 d-none VNM">
               Special Characters and Numbers not allowed
            </p>
         </div>

         <div class="col-lg-6 position-relative">
            <input type="email" class="form-control" placeholder="Enter your E-mail "/>
            <p class="alert alert-danger mt-2 d-none VEM">
               Enter valid email. *Ex: xxx@yyy.zzz
            </p>
         </div>

         <div class="col-lg-6 position-relative">
            <input type="tel" class="form-control "  placeholder="Enter Phone"/>
            <p class="alert alert-danger mt-2 d-none VPHM">
               Enter valid Phone Number
            </p>
         </div>

         <div class="col-lg-6 position-relative">
            <input type="number" class="form-control " placeholder="Enter Age"/>
            <p class="alert alert-danger mt-2 d-none VAM">
               Enter valid Age
            </p>
         </div>

         <div class="col-lg-6 position-relative">
            <input type="password" class="form-control" placeholder="Enter Passward"/>
            <p class="alert alert-danger mt-2 d-none VPAM">
               Enter valid password *Minimum eight characters, at least one letter and one number:*
            </p>
         </div>

         <div class="col-lg-6 position-relative">
            <input type="password" class="form-control" placeholder="Enter Repassward"/>
            <p class="alert alert-danger mt-2 d-none VRPM">
               Enter valid Repassword    
            </p>
         </div>

         <div class="d-flex justify-content-center">
            <button type="submit" class=" btn btn-outline-danger mx-auto my-4 " disabled>submit</button>
         </div>
      </div>
   </form>

   `);

   
   
   $("form").on("input", function () {

      function validName(){
         var reg=/^[a-zA-Z ]+$/;
         return reg.test($("input").eq(0).val());
      }
      function validEmail(){
         var reg=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return reg.test($("input").eq(1).val());
      }
      function validPhone(){
         var reg=/^01[0125][0-9]{8}$/;
         return reg.test($("input").eq(2).val());
      }
      function validAge(){
         var reg=/^([1-9]|[1-9][0-9]|100)$/;
         return reg.test($("input").eq(3).val());
      }
      function validPass(){
         var reg=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
         return reg.test($("input").eq(4).val());
      }



            if (validName()==true) {
               $('.VNM').removeClass('d-block').addClass('d-none');

                  if(validEmail()==true){
                     $('.VEM').removeClass('d-block').addClass('d-none');

                        if (validPhone()==true) {
                           $('.VPHM').removeClass('d-block').addClass('d-none');

                              if(validAge()==true){
                                 $('.VAM').removeClass('d-block').addClass('d-none');
                                    if(validPass()==true){
                                       $('.VPAM').removeClass('d-block').addClass('d-none');
                                          if ($("input").eq(4).val() == $("input").eq(5).val()) {
                                             $('.VRPM').removeClass('d-block').addClass('d-none');
                                                  //change state button 
                                             $("button").removeAttr("disabled");
                                          }
                                          else{$('.VRPM').removeClass('d-none').addClass('d-block');}
                                    }
                                    else{$('.VPAM').removeClass('d-none').addClass('d-block');}
                              }
                              else{ $('.VAM').removeClass('d-none').addClass('d-block');}
                        }
                        else{$('.VPHM').removeClass('d-none').addClass('d-block');}                     
                  }
                  else{$('.VEM').removeClass('d-none').addClass('d-block');}
            }
            else{$('.VNM').removeClass('d-none').addClass('d-block');}

      $("form").on("submit", function (e) {
      e.preventDefault();
      });
   })

}



async function filterCategory(letter, char) {
   $(".loading").removeClass("d-none");
   let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${char}=${letter}`);
   let result = (await data.json()).meals;
   setTimeout(function () {
      $(".loading").addClass("d-none");} , 500);
      displayMeals(result, "content");
}

async function area() {
   $(".loading").removeClass("d-none");
   let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
   let result = (await data.json()).meals.slice(0, 20);
   setTimeout(function () {
      $(".loading").addClass("d-none");} , 500);
   let cartona = ``;
   for (let i = 0; i < result.length; i++) {
      cartona += `
   <div class="col-xl-3 col-lg-4 col-md-6 ">
    <div class=" area p-4 ms-4" onclick="filterCategory('${result[i].strArea}','a')">
        <div class="image position-relative text-center">
        <i class="fa-solid fa-earth-americas fa-5x"></i>    
      <div >
    <h3>${result[i].strArea}</h3>
      </div>
        </div>
    </div>
    </div>
      `;
   }

   $("#content").html(`
  <div class="row py-5 g-4 text-center ms-5">
   ${cartona}
 </div> 
  `);
}

async function ingredit() {
   $(".loading").removeClass("d-none");
   let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list` );
   let result = (await data.json()).meals.slice(0, 20);
   setTimeout(function () {
      $(".loading").addClass("d-none");} , 500);
      
      let cartona = ``;
   for (let i = 0; i < result.length; i++) {
      cartona += `   
   
       <div class="col-xl-3 col-lg-4 col-md-6">
     <div class="item" onclick="filterCategory('${result[i].strIngredient}','i')">
         <div class="image position-relative text-center">
         <i class="fa-solid fa-cookie-bite fa-3x mb-3"></i>     
     <div >
     <h3>${result[i].strIngredient}</h3>
     <p class="text-white small">${result[i].strDescription.split(" ", 10).join(" ")}</p>
     
             </div>
         </div>
     </div>
     </div>
       `;
   }

   $("#content").html(`
   <div class="row  g-4 text-center mt-5 ms-5">
  ${cartona}
  </div> 
  
   `);
}


async function Category() {
   $(".loading").removeClass("d-none");
   let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   let result = (await apiData.json()).categories;
   setTimeout(function () {
      $(".loading").addClass("d-none");} , 500);

   let cartona = ``;
   for (let i = 0; i < result.length; i++) {
      cartona += `

   <div class="col-xl-3 col-lg-4 col-md-6">
 <div class="item text-black" onclick="filterCategory('${result[i].strCategory}','c')">
     <div class="image position-relative">
<div> <img class="w-100" src="${result[i].strCategoryThumb}"></div>
 
 <div class="layer position-absolute end-0 bottom-0 start-0 py-3 px-3 ">

 <h3 class="align-self-center">${result[i].strCategory}</h3> 
</div>
</div>
 </div>
 </div>
   `;
   }

   $("#content").html(
      `<div class="row g-4 text-center mt-5 ms-5">
      ${cartona}
</div> 
 `);
}


