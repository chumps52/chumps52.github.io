$(document).ready(function() {
  var chartKCCQ1a;
  var chartKCCQ1b;
  var chartKCCQ1c;
  var chartKCCQ2;
  var chartKCCQ3;
  var chartKCCQ4;
  var chartKCCQ5;
  var chartKCCQ6;
  var chartKCCQ7;
  var chartKCCQ8a;
  var chartKCCQ8b;
  var chartKCCQ8c;

  $('#generate-charts').click(function() {

    console.log("TEST");

    // Get the selected Patient ID
    let selectedID = $('#surveyResponses-dropdown').val();

    // Null if default dropdown value used
    if (selectedID !== null) {

      // Get JSON data for current patient
      const url = '/HSdemo/exampleData/database/' + selectedID + '/kccqChartResponses.json'

      $.getJSON(url, function(data) {

        // Show charts
        $("#chart-div").show();

        // Show the reset button (default hidden in HTML), hide generate button
        $("#reset-charts").show();
        $("#generate-charts").hide();

        // Get the columns
        let columns = Object.keys(data);

        //Get unique questions
        let rows = []
        for (column of columns) {
          rows = Object.keys(data[column]).reduce((a, b) => {
            if (!a.includes(b)) a.push(b)
            return a
          }, rows)
        }

        //Extract row data
        rows = rows.map(row => {
          let rowData = {}
          for (column of columns) {
            rowData[column] = data[column][row]
          }
          return rowData
        })
        console.log("ROWS2");
        console.log(rows);

        let kccqQuestion1aObject = rows[0]
        let kccqQuestion1bObject = rows[1]
        let kccqQuestion1cObject = rows[2]
        let kccqQuestion2Object = rows[3]
        let kccqQuestion3Object = rows[4]
        let kccqQuestion4Object = rows[5]
        let kccqQuestion5Object = rows[6]
        let kccqQuestion6Object = rows[7]
        let kccqQuestion7Object = rows[8]
        let kccqQuestion8aObject = rows[9]
        let kccqQuestion8bObject = rows[10]
        let kccqQuestion8cObject = rows[11]

        console.log("Q1A");
        console.log(kccqQuestion1aObject);


        let kccqQuestion1aDates = Object.keys(kccqQuestion1aObject);
        let kccqQuestion1aAnswers = Object.values(kccqQuestion1aObject);

        let kccqQuestion1bDates = Object.keys(kccqQuestion1bObject);
        let kccqQuestion1bAnswers = Object.values(kccqQuestion1bObject);

        let kccqQuestion1cDates = Object.keys(kccqQuestion1cObject);
        let kccqQuestion1cAnswers = Object.values(kccqQuestion1cObject);

        let kccqQuestion2Dates = Object.keys(kccqQuestion2Object);
        let kccqQuestion2Answers = Object.values(kccqQuestion2Object);

        let kccqQuestion3Dates = Object.keys(kccqQuestion3Object);
        let kccqQuestion3Answers = Object.values(kccqQuestion3Object);

        let kccqQuestion4Dates = Object.keys(kccqQuestion4Object);
        let kccqQuestion4Answers = Object.values(kccqQuestion4Object);

        let kccqQuestion5Dates = Object.keys(kccqQuestion5Object);
        let kccqQuestion5Answers = Object.values(kccqQuestion5Object);

        let kccqQuestion6Dates = Object.keys(kccqQuestion6Object);
        let kccqQuestion6Answers = Object.values(kccqQuestion6Object);

        let kccqQuestion7Dates = Object.keys(kccqQuestion7Object);
        let kccqQuestion7Answers = Object.values(kccqQuestion7Object);

        let kccqQuestion8aDates = Object.keys(kccqQuestion8aObject);
        let kccqQuestion8aAnswers = Object.values(kccqQuestion8aObject);

        let kccqQuestion8bDates = Object.keys(kccqQuestion8bObject);
        let kccqQuestion8bAnswers = Object.values(kccqQuestion8bObject);

        let kccqQuestion8cDates = Object.keys(kccqQuestion8cObject);
        let kccqQuestion8cAnswers = Object.values(kccqQuestion8cObject);

        var kccqOptions1a, kccqOptions1b, kccqOptions1c, kccqOptions2, kccqOptions3, kccqOptions4, kccqOptions5, kccqOptions6, kccqOptions7, kccqOptions8a, kccqOptions8b, kccqOptions8c;
        kccqOptions1a = kccqOptions1b = kccqOptions1c = kccqOptions2 = kccqOptions3 = kccqOptions4 = kccqOptions5 = kccqOptions6 = kccqOptions7 = kccqOptions8a = kccqOptions8b = kccqOptions8c = {
          aspectRatio: 1,
          title: {
            display: true,
            fontSize: 16,
            padding: 25,
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                fontStyle: 'bold',
                labelString: 'Answer'
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1,
                padding: 25
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                fontStyle: 'bold',
                padding: 10,
                labelString: 'Date (ddMMMyyyy-HHmmss)'
              },
              ticks: {
                padding: 25,
                maxRotation: 90,
                minRotation: 90
              }
            }]
          } // End scales
        };



        // Chart Q1a
        var ctx1a = document.getElementById("chartCanvasKCCQ1a");
        kccqOptions1a.title.text = 'Q1a: Please indicate how much you have been limited by heart failure (shortness of breath or fatigue) over the past two weeks whilst: Showering/bathing'
        kccqOptions1a.scales.yAxes[0].ticks.max = 5
        kccqOptions1a.scales.yAxes[0].ticks.callback = function(label, index, labels) {
          switch (label) {
            case 0:
              return 'Limited for other reasons/did not do the activity';
            case 1:
              return 'Extremely limited';
            case 2:
              return 'Quite a bit limited';
            case 3:
              return 'Moderately limited';
            case 4:
              return 'Slightly limited';
            case 5:
              return 'Not at all limited';
          }
        }
        chartKCCQ1a = new Chart(ctx1a, {
          type: 'line',
          data: {
            datasets: [{
              label: "Answer number",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQuestion1aAnswers
            }],
            labels: kccqQuestion1aDates,
          },
          options: kccqOptions1a
        }); // End chart

        // Chart Q1b
        var ctx1b = document.getElementById("chartCanvasKCCQ1b");
        kccqOptions1b.title.text = 'Q1b: Please indicate how much you have been limited by heart failure (shortness of breath or fatigue) over the past two weeks whilst: Walking 1 block (approx. 80 metres) on level ground'
        kccqOptions1b.scales.yAxes[0].ticks.max = 5
        kccqOptions1b.scales.yAxes[0].ticks.callback = function(label, index, labels) {
          switch (label) {
            case 0:
              return 'Limited for other reasons/did not do the activity';
            case 1:
              return 'Extremely limited';
            case 2:
              return 'Quite a bit limited';
            case 3:
              return 'Moderately limited';
            case 4:
              return 'Slightly limited';
            case 5:
              return 'Not at all limited';
          }
        }
        chartKCCQ1b = new Chart(ctx1b, {
          type: 'line',
          data: {
            datasets: [{
              label: "Answer number",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQuestion1bAnswers
            }],
            labels: kccqQuestion1bDates,
          },
          options: kccqOptions1b
        }); // End chart

        // Chart Q1c
        var ctx1c = document.getElementById("chartCanvasKCCQ1c");
        kccqOptions1c.title.text = 'Q1c: Please indicate how much you have been limited by heart failure (shortness of breath or fatigue) over the past two weeks whilst: Hurrying or jogging (as if to catch a bus)'
        kccqOptions1c.scales.yAxes[0].ticks.max = 5
        kccqOptions1c.scales.yAxes[0].ticks.callback = function(label, index, labels) {
          switch (label) {
            case 0:
              return 'Limited for other reasons/did not do the activity';
            case 1:
              return 'Extremely limited';
            case 2:
              return 'Quite a bit limited';
            case 3:
              return 'Moderately limited';
            case 4:
              return 'Slightly limited';
            case 5:
              return 'Not at all limited';
          }
        }
        chartKCCQ1c = new Chart(ctx1c, {
          type: 'line',
          data: {
            datasets: [{
              label: "Answer number",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQuestion1cAnswers
            }],
            labels: kccqQuestion1cDates,
          },
          options: kccqOptions1c
        }); // End chart

        // Chart Q2
        var ctx2 = document.getElementById("chartCanvasKCCQ2");
        kccqOptions2.title.text = 'Q2: Over the past 2 weeks, how many times did you have swelling in your feet, ankles or legs when you woke up in the morning?'
        kccqOptions2.scales.yAxes[0].ticks.max = 4
        kccqOptions2.scales.yAxes[0].ticks.callback = function(label, index, labels) {
          switch (label) {
            case 0:
              return 'Every morning';
            case 1:
              return '3 or more times a week, but not every day';
            case 2:
              return '1-2 times per week';
            case 3:
              return 'Less than once per week';
            case 4:
              return 'Never over the past 2 weeks';
          }
        }
        chartKCCQ2 = new Chart(ctx2, {
          type: 'line',
          data: {
            datasets: [{
              label: "Answer number",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQuestion2Answers
            }],
            labels: kccqQuestion2Dates,
          },
          options: kccqOptions2
        }); // End chart

        // Chart Q3
        var ctx3 = document.getElementById("chartCanvasKCCQ3");
        kccqOptions3.title.text = 'Q3: Over the past 2 weeks, on average, how many times has fatigue limited your ability to do what you wanted?'
        kccqOptions3.scales.yAxes[0].ticks.max = 6
        kccqOptions3.scales.yAxes[0].ticks.callback = function(label, index, labels) {
          switch (label) {
            case 0:
              return 'All of the time';
            case 1:
              return 'Several times per day';
            case 2:
              return 'At least once per day';
            case 3:
              return '3 or more times per week, but not every day';
            case 4:
              return '1-2 times per week';
            case 5:
              return 'Less than once per week';
            case 6:
              return 'Never over the past 2 weeks';
          }
        }
        chartKCCQ3 = new Chart(ctx3, {
          type: 'line',
          data: {
            datasets: [{
              label: "Answer number",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQuestion3Answers
            }],
            labels: kccqQuestion3Dates,
          },
          options: kccqOptions3
        }); // End chart

        // Chart Q4
        var ctx4 = document.getElementById("chartCanvasKCCQ4");
        kccqOptions4.title.text = 'Q4: Over the past 2 weeks, on average, how many times has shortness of breath limited your ability to do what you wanted?'
        kccqOptions4.scales.yAxes[0].ticks.max = 6
        kccqOptions4.scales.yAxes[0].ticks.callback = function(label, index, labels) {
          switch (label) {
            case 0:
              return 'All of the time';
            case 1:
              return 'Several times per day';
            case 2:
              return 'At least once per day';
            case 3:
              return '3 or more times per week, but not every day';
            case 4:
              return '1-2 times per week';
            case 5:
              return 'Less than once per week';
            case 6:
              return 'Never over the past 2 weeks';
          }
        }
        chartKCCQ4 = new Chart(ctx4, {
          type: 'line',
          data: {
            datasets: [{
              label: "Answer number",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQuestion4Answers
            }],
            labels: kccqQuestion4Dates,
          },
          options: kccqOptions4
        }); // End chart

        // Chart Q5
        var ctx5 = document.getElementById("chartCanvasKCCQ5");
        kccqOptions5.title.text = 'Q5: Over the past 2 weeks, on average, how many times have you been forced to sleep sitting up in a chair or with at least 3 pillows to prop you up because of shortness of breath?'
        kccqOptions5.scales.yAxes[0].ticks.max = 4
        kccqOptions5.scales.yAxes[0].ticks.callback = function(label, index, labels) {
          switch (label) {
            case 0:
              return 'Every night';
            case 1:
              return '3 or more times per week, but not every day';
            case 2:
              return '1-2 times per week';
            case 3:
              return 'Less than once per week';
            case 4:
              return 'Never over the past 2 weeks';
          }
        }
        chartKCCQ5 = new Chart(ctx5, {
          type: 'line',
          data: {
            datasets: [{
              label: "Answer number",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQuestion5Answers
            }],
            labels: kccqQuestion5Dates,
          },
          options: kccqOptions5
        }); // End chart

        // Chart Q6
        var ctx6 = document.getElementById("chartCanvasKCCQ6");
        kccqOptions6.title.text = 'Q6: Over the past 2 weeks, how much has your heart failure limited your enjoyment of life?'
        kccqOptions6.scales.yAxes[0].ticks.max = 4
        kccqOptions6.scales.yAxes[0].ticks.callback = function(label, index, labels) {
          switch (label) {
            case 0:
              return 'It has extremely limited my enjoyment of life';
            case 1:
              return 'It has limited my enjoyment of life quite a bit';
            case 2:
              return 'It has moderately limited my enjoyment of life';
            case 3:
              return 'It has slightly limited my enjoyment of life';
            case 4:
              return 'It has not limited my enjoyment of life at all';
          }
        }
        chartKCCQ6 = new Chart(ctx6, {
          type: 'line',
          data: {
            datasets: [{
              label: "Answer number",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQuestion6Answers
            }],
            labels: kccqQuestion6Dates,
          },
          options: kccqOptions6
        }); // End chart

        // Chart Q7
        var ctx7 = document.getElementById("chartCanvasKCCQ7");
        kccqOptions7.title.text = 'Q7: If you had to spend the rest of your life with your heart failure the way it is right now, how would you feel about this?'
        kccqOptions7.scales.yAxes[0].ticks.max = 4
        kccqOptions7.scales.yAxes[0].ticks.callback = function(label, index, labels) {
          switch (label) {
            case 0:
              return 'Not at all satisfied';
            case 1:
              return 'Mostly dissatisfied';
            case 2:
              return 'Somewhat satisfied';
            case 3:
              return 'Mostly satisfied';
            case 4:
              return 'Completely satisfied';
          }
        }
        chartKCCQ7 = new Chart(ctx7, {
          type: 'line',
          data: {
            datasets: [{
              label: "Answer number",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQuestion7Answers
            }],
            labels: kccqQuestion7Dates,
          },
          options: kccqOptions7
        }); // End chart

        // Chart Q8a
        var ctx8a = document.getElementById("chartCanvasKCCQ8a");
        kccqOptions8a.title.text = 'Q8a: Please indicate how your heart failure may have limited your participation in the following activities over the past 2 weeks: Hobbies, recreational activities'
        kccqOptions8a.scales.yAxes[0].ticks.max = 5
        kccqOptions8a.scales.yAxes[0].ticks.callback = function(label, index, labels) {
          switch (label) {
            case 0:
              return 'Limited for other reasons/did not do the activity';
            case 1:
              return 'Extremely limited';
            case 2:
              return 'Quite a bit limited';
            case 3:
              return 'Moderately limited';
            case 4:
              return 'Slightly limited';
            case 5:
              return 'Not at all limited';
          }
        }
        chartKCCQ8a = new Chart(ctx8a, {
          type: 'line',
          data: {
            datasets: [{
              label: "Answer number",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQuestion8aAnswers
            }],
            labels: kccqQuestion8aDates,
          },
          options: kccqOptions8a
        }); // End chart

        // Chart Q8b
        var ctx8b = document.getElementById("chartCanvasKCCQ8b");
        kccqOptions8b.title.text = 'Q8b: Please indicate how your heart failure may have limited your participation in the following activities over the past 2 weeks: Working or doing household chores'
        kccqOptions8b.scales.yAxes[0].ticks.max = 5
        kccqOptions8b.scales.yAxes[0].ticks.callback = function(label, index, labels) {
          switch (label) {
            case 0:
              return 'Limited for other reasons/did not do the activity';
            case 1:
              return 'Extremely limited';
            case 2:
              return 'Quite a bit limited';
            case 3:
              return 'Moderately limited';
            case 4:
              return 'Slightly limited';
            case 5:
              return 'Not at all limited';
          }
        }
        chartKCCQ8b = new Chart(ctx8b, {
          type: 'line',
          data: {
            datasets: [{
              label: "Answer number",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQuestion8bAnswers
            }],
            labels: kccqQuestion8bDates,
          },
          options: kccqOptions8b
        }); // End chart

        // Chart Q8c
        var ctx8c = document.getElementById("chartCanvasKCCQ8c");
        kccqOptions8c.title.text = 'Q8c: Please indicate how your heart failure may have limited your participation in the following activities over the past 2 weeks: Visiting family or friends out of your home'
        kccqOptions8c.scales.yAxes[0].ticks.max = 5
        kccqOptions8c.scales.yAxes[0].ticks.callback = function(label, index, labels) {
          switch (label) {
            case 0:
              return 'Limited for other reasons/did not do the activity';
            case 1:
              return 'Extremely limited';
            case 2:
              return 'Quite a bit limited';
            case 3:
              return 'Moderately limited';
            case 4:
              return 'Slightly limited';
            case 5:
              return 'Not at all limited';
          }
        }
        chartKCCQ8c = new Chart(ctx8c, {
          type: 'line',
          data: {
            datasets: [{
              label: "Answer number",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQuestion8cAnswers
            }],
            labels: kccqQuestion8cDates,
          },
          options: kccqOptions8c
        }); // End chart



      }); // End $.getJSON(url, function(data)

    } else {
      console.log("NULL ID");
    }
  });

  $('#reset-charts').click(function() {
    // CODE
    chartKCCQ1a.destroy();
    chartKCCQ1b.destroy();
    chartKCCQ1c.destroy();
    chartKCCQ2.destroy();
    chartKCCQ3.destroy();
    chartKCCQ4.destroy();
    chartKCCQ5.destroy();
    chartKCCQ6.destroy();
    chartKCCQ7.destroy();
    chartKCCQ8a.destroy();
    chartKCCQ8b.destroy();
    chartKCCQ8c.destroy();

    // Hide charts
    $("#chart-div").hide();

    // Hide the reset button (default hidden in HTML), show generate button
    $("#reset-charts").hide();
    $("#generate-charts").show();

    // location.reload(true);
  });
});