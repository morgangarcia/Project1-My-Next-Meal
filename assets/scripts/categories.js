const appId = '1ca7c14f'
const appKey = '6ad5a627d4938d3b00d919649e31dc4d'
const url = 'https://api.edamam.com/search?'

$.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    let http = window.location.protocol === 'http:' ? 'http:' : 'https:'
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url
    // options.url = "http://cors.corsproxy.io/url=" + options.url;
  }
})

$(document).ready(function () {
  $('.modal').modal()
})

function displayRecipes (arg) {
     // url: 'https://api.edamam.com/search?q=' + searchIngredients + '&app_id=1ca7c14f&app_key=6ad5a627d4938d3b00d919649e31dc4d'
     // url: `${url}q=${searchIngredients}&app_id=${appId}&app_key=${appKey}`
     $.ajax({
	url: `${url}q=${arg}&app_id=${appId}&app_key=${appKey}`
     }).then(function (response) {
          if (response.count == 0) {
               // displayFailureText();
               $("#displayRecipe").hide();
               $(".search-update-text").show();
               alert("Sorry! We did not find any recipes for your query");
               location.reload();
          } else {
          let intCalories =
          response.hits[0].recipe.calories / response.hits[0].recipe.yield
     let calories = Math.floor(intCalories)
     let results = response.hits
          
     $('#displayRecipe').html('')

     for (i = 0; i < results.length; i++) {
          let intCalories = results[i].recipe.calories / results[i].recipe.yield
          let calories = Math.floor(intCalories)
          let recipeDiv = $('<div>')
          let recipeImage = $('<img>')
          let recipeCaption = $('<div>')
          let recipeBtnDiv = $('<div>')
          let caloriesP = $('<p>')

          recipeCaption.addClass('caption')
          recipeCaption.append(
          $('<div>')
               .text(results[i].recipe.label)
               .addClass('recipeName')
               .attr('id', results[i].recipe.label)
          )

          recipeCaption.addClass('text-center')
          caloriesP.text(calories + ' calories per serving')
          recipeCaption.append(caloriesP)
          recipeBtnDiv.append(
          $('<a>')
               .append(
               $('<button>')
               .addClass('btn recipeBtn')
               .text('Go to recipe')
               )
               .attr('href', results[i].recipe.url)
               .attr('target', '_blank')
          )
          // favoriteBtnDiv.addClass('heart fa fa-heart-o').toggleClass('heart fa fa-heart-o');
          let activityBtn = $('<button>')
          .text('Fun Activity')
          .addClass('btn')
          // let favoriteBtn = $('far fa-heart')
          // favoriteBtnDiv.addClass('far fa-heart');

          //does results[i].recipe.url exist in user.favorites - if yes use heart icon if no use enmpty heart icon
          let itemIsFav = user.favorites.includes(results[i].recipe.url) ? true : false;
          let favoriteBtn = $('<button>')
          .addClass(itemIsFav ? 'glyphicon glyphicon-heart':'glyphicon glyphicon-heart-empty')
          .attr('id', results[i].recipe.label)
          // recipeBtnDiv.append(favoriteBtnDiv.addClass('heart fa fa-heart-o'));

          recipeBtnDiv.append(activityBtn)
          recipeBtnDiv.append(favoriteBtn)
          recipeCaption.append(recipeBtnDiv)
          recipeImage.attr('src', results[i].recipe.image)
          recipeDiv.addClass('thumbnail col-md-4 recipe')
          recipeDiv.append(recipeImage)
          recipeDiv.append(recipeCaption)
          $('#displayRecipe').prepend(recipeDiv)

          if (calories < 100) {
          $(activityBtn).on('click', function () {
               let mod = `<div class="modal" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Fun Activity</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">So how many extra calories will you burn when you stand instead of sitting at the office? You burn about 10 extra calories for every 10 minutes you stand rather than sit at the office. And the good news is that you don't need a fancy standing desk to take advantage of the benefit.     </div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`
               $('body').append(mod)
               $('#exampleModal1').modal('show')
               $('#exampleModal1').on('hidden.bs.modal', function () {
               $(this).remove()
               })
          })
          } else if (calories >= 100 && calories < 500) {
          $(activityBtn).on('click', function () {
               let mod = `<div class="modal" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Fun Activity</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">Walk up the stairs for just ten minutes to burn 100 calories. Climbing stairs help to shape the muscles in your lower body. Walking downstairs provides benefits too!​    </div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`
               $('body').append(mod)
               $('#exampleModal2').modal('show')
               $('#exampleModal2').on('hidden.bs.modal', function () {
               $(this).remove()
               })
          })
          } else if (calories >= 500 && calories < 1000) {
          $(activityBtn).on('click', function () {
               let mod = `<div class="modal" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Fun Activity</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">Feeling adventurous? 60 minutes of rock climbing is a great way to give yourself a thrill, boost your adrenaline, and burn calories, all at the same time! Plus, it’s a great strength training workout for your upper body and your legs.   </div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`
               $('body').append(mod)
               $('#exampleModal3').modal('show')
               $('#exampleModal3').on('hidden.bs.modal', function () {
               $(this).remove()
               })
          })
          } else if (calories >= 1000 && calories < 1500) {
          $(activityBtn).on('click', function () {
               let mod = `<div class="modal" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Fun Activity</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">Cycling at a pace of 14 to 15.9 miles per hour, it will take you the same of amount of time to burn 1,000 calories as it would if you were running at a pace of 6 mph -- 67 to 100 minutes, depending on your weight. Pick up the pace to 16 to 19 mph and you could burn 1,000 calories in 56 to 83 minutes. Cycle up a lot of hills and you'll hit your goal in even less time.    </div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`
               $('body').append(mod)
               $('#exampleModal4').modal('show')
               $('#exampleModal4').on('hidden.bs.modal', function () {
               $(this).remove()
               })
          })
          } else if (calories >= 1500 && calories < 2000) {
          $(activityBtn).on('click', function () {
               let mod = `<div class="modal" id="exampleModal5" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Fun Activity</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">Running increases your heart rate and respiration rate, and allows you to build strength and endurance. A 125-pound person running at 7.5 mph burns 750 calories per hour while an 185-pound person burns 1110 calories. To burn 1,500 calories in one day, the smaller runner would have to run for two hours, while the larger person would only have to run for 81 minutes. </div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`
               $('body').append(mod)
               $('#exampleModal5').modal('show')
               $('#exampleModal5').on('hidden.bs.modal', function () {
               $(this).remove()
               })
          })
          }
     }
     
     $('.glyphicon').on("click", function(){
               let recId = $(this).parent().find("a").attr("href");
               let addItem = $(this).hasClass("glyphicon-heart-empty");  
               if(addItem){
                    $(this).removeClass("glyphicon-heart-empty");
                    $(this).addClass("glyphicon-heart");
                    user.favorites.push(recId);
               } else{
                    $(this).addClass("glyphicon-heart-empty");
                    $(this).removeClass("glyphicon-heart");
                    let rId2 = recId;
                    user.favorites = user.favorites.filter(function(o){
                         return o != rId2;
                    });
               }            
               sessionStorage.setItem("errorMessage", null); 
	     let theUID = user.uid;
               saveFavorite(theUID, recId, addItem);
               sessionStorage.setItem("user", JSON.stringify(user));
          });    
          }
     });
}

$('#ingredientsSearchBtn').on('click', function (event) {
  event.preventDefault()
  
      let theCat = $(".cboxCat").val();


     if (theCat === "0") {
          let mod = `<div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Selection Error</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">You must select a category before we can find you your recipes.</div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`
          $('body').append(mod)
          $('#exampleModal').modal('show')
          $('#exampleModal').on('hidden.bs.modal', function () {
               $(this).remove()
          });
     } else {
          displayRecipes(theCat)
     }
});



