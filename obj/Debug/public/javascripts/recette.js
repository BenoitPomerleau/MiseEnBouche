
// Userlist data array for filling in info box
var recipeListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  populateRecipe();

  // Username link click
  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

  // Delete User link click
  $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

  // Add User button click
  $('#btnAddUser').on('click', addUser);

  // Update User button click
  $('#btnUpdateUser').on('click', updateUser);

});

// Functions =============================================================


// Fill table with data
function populateRecipe() {

  // Empty content string
  var content = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/recettesJSON', function( data ) {

    // Stick our user data array into a userlist variable in the global object
    recipeListData = data;


    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){

      content += '<article>';
      content += '<header>';
      content += '<time datetime="' + getTimestampFromObjectId(this._id) + '" pubdate>publié le ' + getTimestampFromObjectId(this._id) +'</time>';
      content += '<h1><a href="recette/' + this._id + '" rel="bookmark" title="link to this post">' + this.nom + '</a><h1>';
      content += '</header>';
      content += 'commentaire: ' + this.commentaire;
      content += '<br/>';
      content += 'temps de préparation: ' + this.tempsPreparation;
      content += '<br/>';
      content += 'temps de cuisson: ' + this.tempsCuisson;
      content += '<br/>';
      content += 'nombre de portion: ' + this.nombrePortion;
      content += '<br/>';
      content += 'appréciation: ' + this.note + '/100';
      content += '<br/>';
      content += 'fait la dernière fois: ' + this.dateDerniereExecution;
      content += '<br/>';
      content += 'Mots clés: ';
      $.each(this.listeCategorie, function(){
        content += this.nom + "; ";
      });

      content += '<br/>';
      content += 'Ingrédients';
      content += '<ul class="recette-detail">';

      $.each(this.listeIngredient, function(){
        content += "<li>" + this.quantite + "&nbsp;" + this.nom + "</li>";
      });

      
      content += '</ul>';

      content += 'Étapes';
      content += '<ul class="recette-detail">';

      $.each(this.listeEtape, function(){
        content += "<li>" + this.etape + "</li>";
      });

      
      content += '</ul>';
      content += '<div class="spacer">';
      content += '</article>';

      
      $('.contenu').append(content);

    });

  });
};



// Show User Info
function showUserInfo(event) {

  // Prevent Link from Firing
  event.preventDefault();

  // Retrieve username from link rel attribute
  var thisUserName = $(this).attr('rel');

  // Get Index of object based on id value
  var arrayPosition = recipeListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

  // Get our User Object
  var thisUserObject = recipeListData[arrayPosition];

  //Populate Info Box
  $('#userInfoName').text(thisUserObject.fullname);
  $('#userInfoAge').text(thisUserObject.age);
  $('#userInfoGender').text(thisUserObject.gender);
  $('#userInfoLocation').text(thisUserObject.location);

  $('#updateUser fieldset input#inputUpdateUserName').val(thisUserObject.username);
  $('#updateUser fieldset input#inputUpdateUserEmail').val(thisUserObject.email);
  $('#updateUser fieldset input#inputUpdateUserFullname').val(thisUserObject.fullname);
  $('#updateUser fieldset input#inputUpdateUserAge').val(thisUserObject.age);
  $('#updateUser fieldset input#inputUpdateUserLocation').val(thisUserObject.location);
  $('#updateUser fieldset input#inputUpdateUserGender').val(thisUserObject.gender);
  $('#updateUser fieldset input#inputUpdateUserId').val(thisUserObject._id);

};



// Add User
function addUser(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#addUser input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

    // If it is, compile all user info into one object
    var newUser = {
      'username': $('#addUser fieldset input#inputUserName').val(),
      'email': $('#addUser fieldset input#inputUserEmail').val(),
      'fullname': $('#addUser fieldset input#inputUserFullname').val(),
      'age': $('#addUser fieldset input#inputUserAge').val(),
      'location': $('#addUser fieldset input#inputUserLocation').val(),
      'gender': $('#addUser fieldset input#inputUserGender').val()
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/adduser',
      dataType: 'JSON'
    }).done(function( response ) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addUser fieldset input').val('');

        // Update the table
        populateTable();

      }
      else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg.err);

      }
    });
  }
  else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};


// Delete User
function deleteUser(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this user?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/deleteuser/' + $(this).attr('rel')
    }).done(function( response ) {

      // Check for a successful (blank) response
      if (response.msg === '') {
      }
      else {
        alert('Error: ' + response.msg.err);
      }

      // Update the table
      populateTable();

    });

  }
  else {

    // If they said no to the confirm, do nothing
    return false;

  }
};



// Update User
function updateUser(event) {

  event.preventDefault();


  var updateUser = {
      '_id': $('#updateUser fieldset input#inputUpdateUserId').val(),
      'username': $('#updateUser fieldset input#inputUpdateUserName').val(),
      'email': $('#updateUser fieldset input#inputUpdateUserEmail').val(),
      'fullname': $('#updateUser fieldset input#inputUpdateUserFullname').val(),
      'age': $('#updateUser fieldset input#inputUpdateUserAge').val(),
      'location': $('#updateUser fieldset input#inputUpdateUserLocation').val(),
      'gender': $('#updateUser fieldset input#inputUpdateUserGender').val()
  };

  $.ajax({
    type: 'PUT',
    data: updateUser,
    url: '/updateuser/' + updateUser._id
  }).done(function( response ) {

    // Check for a successful (blank) response
    if (response.msg === '') {
    }
    else {
      alert('Error: ' + response.msg.err);
    }

    // Update the table
    populateTable();

  });


};



function getTimestampFromObjectId(objectId){
  
  // first 4 bytes are the timestamp portion (8 hex chars)
  var timehex = objectId.substring(0,8);

  // convert to a number... base 16
  var secondsSinceEpoch = parseInt(timehex, 16);

  // convert to milliseconds, and create a new date
  return new Date(secondsSinceEpoch*1000);
}


