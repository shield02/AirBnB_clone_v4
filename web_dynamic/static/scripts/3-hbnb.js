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
    fetchPlaces();
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

function fetchPlaces () {
    const URL = `http://${HOST}:5001/api/v1/places_search/`;
    $.ajax({
      url: URL,
      type: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({}),
      success: function (response) {
        for (const r of response) {
          const article = ['<article>',
            '<div class="title_box">',
          `<h2>${r.name}</h2>`,
          `<div class="price_by_night">$${r.price_by_night}</div>`,
          '</div>',
          '<div class="information">',
          `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
          `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
          `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
          '</div>',
          '<div class="description">',
          `${r.description}`,
          '</div>',
          '</article>'];
          $('SECTION.places').append(article.join(''));
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
}
