$(document).ready(function() {
  $('#downloadButton').click(function() {

    // Get the selected Patient ID
    let selectedID = $('#backups-dropdown').val();

    // Null if default dropdown value used
    if (selectedID !== null) {

      var healthURL = '/HSdemo/exampleData/storage/csv/' + selectedID + '/HealthResults.csv';
      var kccqSurveyURL = '/HSdemo/exampleData/storage/csv/' + selectedID + '/KCCQSurveyResults.csv';
      var kccqScoresURL = '/HSdemo/exampleData/storage/csv/' + selectedID + '/KCCQScoresResults.csv';
      var katzSurveyURL = '/HSdemo/exampleData/storage/csv/' + selectedID + '/KatzSurveyResults.csv';

      // For iOS
      var windowReference = window.open();

      function downloadData(urlToDownload) {
        var name = '';
        if (urlToDownload == healthURL) {
          name = '-HealthResults.csv'
        } else if (urlToDownload == kccqSurveyURL) {
          name = '-KCCQSurveyResults.csv'
        } else if (urlToDownload == kccqScoresURL) {
          name = '-KCCQScoresResults.csv'
        } else if (urlToDownload == katzSurveyURL) {
          name = '-KatzSurveyResults.csv'
        }

        if (iOS()) {
          console.log("iOS DEVICE")
          windowReference.location = urlToDownload;
        } else {
          $.ajax({
            url: urlToDownload,
            method: 'GET',
            xhrFields: {
              responseType: 'blob'
            },
            success: function(data) {
              var a = document.createElement('a');
              var url = window.URL.createObjectURL(data);
              a.href = url;
              a.download = selectedID + name;
              a.click();
              window.URL.revokeObjectURL(url);
            }
          });
          console.log("NOT iOS DEVICE")
        }
      }

      downloadData(healthURL);
      downloadData(kccqSurveyURL);
      downloadData(kccqScoresURL);
      downloadData(katzSurveyURL);

    } else {
      console.log("NULL ID");
    }

  });
});

function iOS() {
  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()) {
        return true;
      }
    }
  }
  return false;
}