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
  
    // Check API status on page load
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  
    // Send POST request to places_search endpoint and display places
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (response) {
        for (const place of response) {
          const article = `
                      <article>
                          <div class="title_box">
                              <h2>${place.name}</h2>
                              <div class="price_by_night">$${place.price_by_night}</div>
                          </div>
                          <div class="information">
                              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                          </div>
                          <div class="description">
                              ${place.description}
                          </div>
                      </article>
                  `;
          $('.places').append(article);
        }
      },
      error: function (xhr, status, error) {
        console.error('Error fetching places:', error);
      }

    $(".filters button").bind("click", searchPlace);
      searchPlace();
    });
  });
  