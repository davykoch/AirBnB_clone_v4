$(document).ready(function () {
  const checkedAmenities = {};

  const updateAmenitiesList = () => {
    const checkedAmenitiesList = Object.values(checkedAmenities).join(', ');
    $('.popover .amenities-list').text(checkedAmenitiesList);
  };

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }
    updateAmenitiesList();
  });
});
