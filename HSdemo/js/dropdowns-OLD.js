$(document).ready(function() {
  let dropdown = $('#patientID-dropdown');
  let dropdown2 = $('#date-dropdown');

  dropdown.empty();
  dropdown2.empty();

  dropdown.append('<option selected="true" disabled>Choose ID</option>');
  dropdown.prop('selectedIndex', 0);

  dropdown2.append('<option selected="true" disabled>Please choose ID first</option>');
  dropdown2.prop('selectedIndex', 0);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      user.getIdToken().then(function(idToken) {
        const url = 'https://heart-survey.firebaseio.com/patients.json?auth=' + idToken;

        $.getJSON(url, function(data) {
          $.each(data, function(key, entry) {
            dropdown.append($('<option></option>').attr('value', key).text(key))
          });
        });
      });
    }
  });




  $('#patientID-dropdown').change(function() {
    var selectedID = this.value;
    console.log(status);

    dropdown2.empty();
    dropdown2.append('<option selected="true" disabled>Please choose ID first</option>');
    dropdown2.prop('selectedIndex', 0);


    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.getIdToken().then(function(idToken) {
          const url = 'https://heart-survey.firebaseio.com/patients/' + selectedID + '.json?auth=' + idToken;
          console.log(url);

          $.getJSON(url, function(data) {
            console.log(data);
            console.log(Object.keys(data));
            $.each(data, function(key, entry) {
              dropdown2.append($('<option></option>').attr('value', key).text(key))
            });
          });
        });
      }
    });
  })
});