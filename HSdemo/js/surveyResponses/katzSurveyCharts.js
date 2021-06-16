$(document).ready(function() {
  var chartKatz1;
  var chartKatz2;
  var chartKatz3;
  var chartKatz4;
  var chartKatz5;
  var chartKatz6;

  $('#generate-charts').click(function() {

    console.log("TEST");

    // Get the selected Patient ID
    let selectedID = $('#surveyResponses-dropdown').val();

    // Null if default dropdown value used
    if (selectedID !== null) {

      // Get JSON data for current patient
      const url = '/HSdemo/exampleData/database/' + selectedID + '/katzResponses.json'

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

        let katzQuestion1Object = rows[0]
        let katzQuestion2Object = rows[1]
        let katzQuestion3Object = rows[2]
        let katzQuestion4Object = rows[3]
        let katzQuestion5Object = rows[4]
        let katzQuestion6Object = rows[5]

        console.log("Q1A");
        console.log(katzQuestion1Object);


        let katzQuestion1Dates = Object.keys(katzQuestion1Object);
        let katzQuestion1Answers = Object.values(katzQuestion1Object);

        let katzQuestion2Dates = Object.keys(katzQuestion2Object);
        let katzQuestion2Answers = Object.values(katzQuestion2Object);

        let katzQuestion3Dates = Object.keys(katzQuestion3Object);
        let katzQuestion3Answers = Object.values(katzQuestion3Object);

        let katzQuestion4Dates = Object.keys(katzQuestion4Object);
        let katzQuestion4Answers = Object.values(katzQuestion4Object);

        let katzQuestion5Dates = Object.keys(katzQuestion5Object);
        let katzQuestion5Answers = Object.values(katzQuestion5Object);

        let katzQuestion6Dates = Object.keys(katzQuestion6Object);
        let katzQuestion6Answers = Object.values(katzQuestion6Object);

        var options1, options2, options3, options4, options5, options6;
        options1 = options2 = options3 = options4 = options5 = options6 = {
          aspectRatio: 1,
          title: {
            display: true,
            fontSize: 16,
            padding: 25
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
                max: 2,
                stepSize: 1,
                padding: 25,
                callback: function(label, index, labels) {
                  switch (label) {
                    case 0:
                      return 'Dependence';
                    case 1:
                      return 'Indepedence';
                    case 2:
                      return '';
                  }
                }
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
        var ctx1 = document.getElementById("chartCanvasKatz1");
        options1.title.text = 'Q1: Bathing'
        chartKatz1 = new Chart(ctx1, {
          type: 'line',
          data: {
            datasets: [{
              label: "Points",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: katzQuestion1Answers
            }],
            labels: katzQuestion1Dates,
          },
          options: options1
        }); // End chart

        // Chart Q2
        var ctx2 = document.getElementById("chartCanvasKatz2");
        options2.title.text = 'Q2: Dressing'
        chartKatz2 = new Chart(ctx2, {
          type: 'line',
          data: {
            datasets: [{
              label: "Points",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: katzQuestion2Answers
            }],
            labels: katzQuestion2Dates,
          },
          options: options2
        }); // End chart

        // Chart Q3
        var ctx3 = document.getElementById("chartCanvasKatz3");
        options3.title.text = 'Q3: Toileting'
        chartKatz3 = new Chart(ctx3, {
          type: 'line',
          data: {
            datasets: [{
              label: "Points",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: katzQuestion3Answers
            }],
            labels: katzQuestion3Dates,
          },
          options: options3
        }); // End chart

        // Chart Q4
        var ctx4 = document.getElementById("chartCanvasKatz4");
        options4.title.text = 'Q4: Transferring'
        chartKatz4 = new Chart(ctx4, {
          type: 'line',
          data: {
            datasets: [{
              label: "Points",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: katzQuestion4Answers
            }],
            labels: katzQuestion4Dates,
          },
          options: options4
        }); // End chart

        // Chart Q5
        var ctx5 = document.getElementById("chartCanvasKatz5");
        options5.title.text = 'Q5: Continence'
        chartKatz5 = new Chart(ctx5, {
          type: 'line',
          data: {
            datasets: [{
              label: "Points",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: katzQuestion5Answers
            }],
            labels: katzQuestion5Dates,
          },
          options: options5
        }); // End chart

        // Chart Q6
        var ctx6 = document.getElementById("chartCanvasKatz6");
        options6.title.text = 'Q6: Feeding'
        chartKatz6 = new Chart(ctx6, {
          type: 'line',
          data: {
            datasets: [{
              label: "Points",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: katzQuestion6Answers
            }],
            labels: katzQuestion6Dates,
          },
          options: options6
        }); // End chart



      }); // End $.getJSON(url, function(data)

    } else {
      console.log("NULL ID");
    }
  });

  $('#reset-charts').click(function() {
    // CODE
    chartKatz1.destroy();
    chartKatz2.destroy();
    chartKatz3.destroy();
    chartKatz4.destroy();
    chartKatz5.destroy();
    chartKatz6.destroy();

    // Hide charts
    $("#chart-div").hide();

    // Hide the reset button (default hidden in HTML), show generate button
    $("#reset-charts").hide();
    $("#generate-charts").show();

    // location.reload(true);
  });
});