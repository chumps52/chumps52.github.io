$(document).ready(function() {
  $('#downloadButton').click(function() {

    // Get the selected Patient ID
    let selectedID = $('#consentForms-dropdown').val();

    // Null if default dropdown value used
    if (selectedID !== null) {

      var consentURL = '/HSdemo/exampleData/storage/consent/' + selectedID + '.pdf';

      // For iOS
      var windowReference = window.open();

      function downloadData(urlToDownload) {
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
              a.download = selectedID + '.pdf';
              a.click();
              window.URL.revokeObjectURL(url);
            }
          });
          console.log("NOT iOS DEVICE")
        }
      }

      downloadData(consentURL);

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