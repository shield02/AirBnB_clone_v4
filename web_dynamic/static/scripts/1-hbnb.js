$(document).ready(init);

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
}
