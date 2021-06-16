function writeUserData(patientID, date, question1a, question1b, question1c, question2, question3, question4, question5, question6, question7, question8a, question8b, question8c) {
  firebase.database().ref("patients/").update({
    [patientID]: {
      [date]: {
        "question1a": question1a,
        "question1b": question1b,
        "question1c": question1c,
        "question2": question2,
        "question3": question3,
        "question4": question4,
        "question5": question5,
        "question6": question6,
        "question7": question7,
        "question8a": question8a,
        "question8b": question8b,
        "question8c": question8c
      }
    }
  });
}

writeUserData("testID", "1-1-19", 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8)






function writeUserData(patientID, date, number, answer) {
  firebase.database().ref("patients/").set({
    "patientID": patientID,
    "questions" [
      dateAnswered: date,
      questionNumber: number,
      questionAnswer: answer
    ]
  });
}

writeUserData("testID", "1-1-19", 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8)





// WORKING

function writeUserData(patientID, date, question1a, question1b, question1c, question2, question3, question4, question5, question6, question7, question8a, question8b, question8c) {
  firebase.database().ref("patients/").child(patientID).child(date).set({
    "question1a": question1a,
    "question1b": question1b,
    "question1c": question1c,
    "question2": question2,
    "question3": question3,
    "question4": question4,
    "question5": question5,
    "question6": question6,
    "question7": question7,
    "question8a": question8a,
    "question8b": question8b,
    "question8c": question8c
  });
}

writeUserData("testID", "1-1-19", 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8)


// TEST

function writeUserData(patientID, date, question1a, question1b, question1c, question2, question3, question4, question5, question6, question7, question8a, question8b, question8c) {
  firebase.database().ref("patients/").update({
    "patientID": patientID
  });

  firebase.database().ref("patients/").child("surveys").update({
    "date": date
  });

  firebase.database().ref("patients/").child("surveys").child("questions").update({
    "question1a": question1a,
    "question1b": question1b,
    "question1c": question1c,
    "question2": question2,
    "question3": question3,
    "question4": question4,
    "question5": question5,
    "question6": question6,
    "question7": question7,
    "question8a": question8a,
    "question8b": question8b,
    "question8c": question8c
  });
}

writeUserData("testID", "1-1-19", 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8)