$(document).ready(function(){
  var url = "";
  var img = "";
  var title = "";
  var isbn = "";
  var author = "";

   $("#myform").submit(function(){
     modal.style.display = "none";
     $('#result').text("Please click on the image of the book to add it to your collection");
   	  var search = $("#books").val();
   	  if(search == "")
   	  {
   	  	alert("Please enter something in the field");
   	  }
   	  else{
     	  $.get("https://www.googleapis.com/books/v1/volumes?q=" + search,function(response){
            for(i=0;i<response.items.length;i++)
            {
             title=$('<h5 class="center-align white-text"> Title:  ' + response.items[i].volumeInfo.title + '</h5>');
             isbn=$('<h5 class="center-align white-text"> ISBN:  ' + response.items[i].volumeInfo.industryIdentifiers[0].identifier + '</h5>');
             author=$('<h5 class="center-align white-text"> By:  ' + response.items[i].volumeInfo.authors + '</h5>');
             img = $('<img class="aligning card z-depth-5" id="dynamic"><br><a target="_blank" href=' + response.items[i].volumeInfo.infoLink + '><button id="imagebutton" class="btn red aligning">Read More</button></a>');
             url= response.items[i].volumeInfo.imageLinks.thumbnail;
             img.attr('src', url);
             img.attr('data-title', response.items[i].volumeInfo.title);
             img.attr('data-author', response.items[i].volumeInfo.authors);
             img.attr('data-isbn', response.items[i].volumeInfo.industryIdentifiers[0].identifier);
             title.appendTo('#result');
             isbn.appendTo('#result')
             author.appendTo('#result');
             img.appendTo('#result');
            }
     	  });
      }
      return false;
   });
});
$(document).on("click", "img", logToDB);
function logToDB () {
  console.log($(this).attr("data-title"));
  console.log($(this).attr("data-author"));
  console.log($(this).attr("data-isbn"));

}