firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    user.getIdToken().then(function(idToken) {
      // console.log(data)
      $.getJSON('https://heart-survey.firebaseio.com/patients.json?auth=' + idToken, function(data) {
        //data is the JSON string
        console.log(data);
        var result = Object.keys(data);
        console.log("ID LIST: " + result); // Prints the patientIDs

      });
    }).catch(function(error) {
      // Handle error
    });
  } else {
    // No user is signed in.
    window.location.href = '/';
  }
});