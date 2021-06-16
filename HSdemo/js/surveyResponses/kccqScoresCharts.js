$(document).ready(function() {
  var chartOverallScore;
  var chartPLScore;
  var chartQoLScore;
  var chartSLScore;
  var chartSFScore;

  $('#generate-charts').click(function() {

    console.log("TEST");

    // Get the selected Patient ID
    let selectedID = $('#surveyResponses-dropdown').val();

    // Null if default dropdown value used
    if (selectedID !== null) {

      // Get JSON data for current patient
      const url = '/HSdemo/exampleData/database/' + selectedID + '/kccqScores.json'

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

        let kccqOverallObject = rows[0]
        let kccqPLObject = rows[1]
        let kccqQoLObject = rows[2]
        let kccqSLObject = rows[3]
        let kccqSFObject = rows[4]

        console.log("Q1A");
        console.log(kccqOverallObject);


        let kccqOverallDates = Object.keys(kccqOverallObject);
        let kccqOverallScores = Object.values(kccqOverallObject);

        let kccqPLDates = Object.keys(kccqPLObject);
        let kccqPLScores = Object.values(kccqPLObject);

        let kccqQoLDates = Object.keys(kccqQoLObject);
        let kccqQoLScores = Object.values(kccqQoLObject);

        let kccqSLDates = Object.keys(kccqSLObject);
        let kccqSLScores = Object.values(kccqSLObject);

        let kccqSFDates = Object.keys(kccqSFObject);
        let kccqSFScores = Object.values(kccqSFObject);

        var kccqOptionsOverall, kccqOptionsPL, kccqOptionsQoL, kccqOptionsSL, kccqOptionsSF;
        kccqOptionsOverall = kccqOptionsPL = kccqOptionsQoL = kccqOptionsSL = kccqOptionsSF = {
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
                labelString: 'Score'
              },
              ticks: {
                beginAtZero: true,
                //stepSize: 1,
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



        // Chart Overall
        var ctxOverall = document.getElementById("chartCanvasKCCQ-overall");
        kccqOptionsOverall.title.text = 'Overall Score'
        chartOverallScore = new Chart(ctxOverall, {
          type: 'line',
          data: {
            datasets: [{
              label: "Score",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqOverallScores
            }],
            labels: kccqOverallDates,
          },
          options: kccqOptionsOverall
        }); // End chart

        // Chart Physical Limitation
        var ctxPL = document.getElementById("chartCanvasKCCQ-pl");
        kccqOptionsPL.title.text = 'Physical Limitation Score'
        chartPLScore = new Chart(ctxPL, {
          type: 'line',
          data: {
            datasets: [{
              label: "Score",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqPLScores
            }],
            labels: kccqPLDates,
          },
          options: kccqOptionsPL
        }); // End chart

        // Chart Quality of Life
        var ctxQoL = document.getElementById("chartCanvasKCCQ-qol");
        kccqOptionsQoL.title.text = 'Quality of Life Score'
        chartQoLScore = new Chart(ctxQoL, {
          type: 'line',
          data: {
            datasets: [{
              label: "Score",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqQoLScores
            }],
            labels: kccqQoLDates,
          },
          options: kccqOptionsQoL
        }); // End chart

        // Chart Social Limitation
        var ctxSL = document.getElementById("chartCanvasKCCQ-sl");
        kccqOptionsSL.title.text = 'Social Limitation'
        chartSLScore = new Chart(ctxSL, {
          type: 'line',
          data: {
            datasets: [{
              label: "Score",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqSLScores
            }],
            labels: kccqSLDates,
          },
          options: kccqOptionsSL
        }); // End chart

        // Chart Symptom Frequency
        var ctxSF = document.getElementById("chartCanvasKCCQ-sf");
        kccqOptionsSF.title.text = 'Symptom Frequency'
        chartSFScore = new Chart(ctxSF, {
          type: 'line',
          data: {
            datasets: [{
              label: "Score",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              cubicInterpolationMode: "monotone",
              data: kccqSFScores
            }],
            labels: kccqSFDates,
          },
          options: kccqOptionsSF
        }); // End chart

      }); // End $.getJSON(url, function(data)

    } else {
      console.log("NULL ID");
    }
  });

  $('#reset-charts').click(function() {
    // CODE
    chartOverallScore.destroy();
    chartPLScore.destroy();
    chartQoLScore.destroy();
    chartSLScore.destroy();
    chartSFScore.destroy();

    // Hide charts
    $("#chart-div").hide();

    // Hide the reset button (default hidden in HTML), show generate button
    $("#reset-charts").hide();
    $("#generate-charts").show();

    // location.reload(true);
  });
});