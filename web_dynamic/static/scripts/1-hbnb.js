$(document).ready(function() {
    // Variable to store Amenity IDs
    const checkedAmenities = {};

    // Function to update the h4 tag with checked amenities
    const updateAmenitiesList = () => {
        const checkedAmenitiesList = Object.values(checkedAmenities).join(', ');
        $('.popover .amenities-list').text(checkedAmenitiesList);
    };

    // Listen for changes on input checkbox tags
    $('input[type="checkbox"]').change(function() {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            // Add Amenity ID to the variable
            checkedAmenities[amenityId] = amenityName;
        } else {
            // Remove Amenity ID from the variable
            delete checkedAmenities[amenityId];
        }

        // Update the h4 tag with checked amenities
        updateAmenitiesList();
    });
});
