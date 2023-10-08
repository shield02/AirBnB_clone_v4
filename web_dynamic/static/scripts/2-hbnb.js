$(document).ready(init);

const HOST = '0.0.0.0';

function init () {
    const amenities = {};
    $('.amenities .popover input').change(function () {
      if ($(this).is(':checked')) {
        amenities[$(this).attr('data-name')] = $(this).attr('data-id');
      } else if ($(this).is(':not(:checked)')) {
        delete amenities[$(this).attr('data-name')];
      }
      const names = Object.keys(amenities);
      $('.amenities h4').text(names.sort().join(', '));
    });

    apiStats();
  }
  
function apiStats () {
  const URL = `http://${HOST}:5001/api/v1/status/`;
  $.get(URL, (data, apiStats) => {
    if (apiStats === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}
