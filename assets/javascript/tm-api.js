const API_KEY = "aogXWkLZYoHL6VP33CSwmGxFBaI7KfRK";
const ROOT_URL = "https://app.ticketmaster.com/discovery/v2/";
const EVENT_SEARCH = "events.json?";

/**
 * Search using the parameters defined in @options
 * @param {Object} options 
 */
function search(options) {
    let queryUrl = ROOT_URL + EVENT_SEARCH + "apikey=" + API_KEY;
    let params = Object.entries(options);
    params.forEach(function (param) {
        queryUrl += "&" + param[0] + "=" + param[1];
    });
    console.log(queryUrl);

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (result) {
        // return result
        console.log(result);
        displayResult(result);
    }, function (error) {
        console.log(error);
    });
}

/**
 * Search for music event by a keyword
 * @param {string} keyword 
 */
function searchByKeyword(keyword) {
    search({
        keyword: keyword,
        classificationName: "music"
    });
}

/**
 * Search for a music event by city
 * @param {string} city 
 */
function searchByCity(city) {
    search({
        city: city,
        classificationName: "music"
    })
}

//onclick function to push data information into upcoming events cards
$("#hack-it").on("click", function (event) {
    event.preventDefault();
    console.log("this kind of works")
    // $(".card--content").empty();
    $("#card-row-container").empty();

    var valueArtist = $("#artistSearch").val().trim();
    searchByKeyword(valueArtist);
})



function displayResult(result) {
    let target = $("#card-row-container");
    result["_embedded"].events.forEach(function (event) {
        var properties = getEventProperties(event);

        // let sectionCard = $("<section>")
        //     .addClass("card");
        let container = $("<div>")
            .addClass("card sticky-action");
        let imageDiv = $("<div>")
            .addClass("card-image");
        let image = $("<img>")
            .attr("src", properties.imageUrl);
        let iconLink = $("<a>")
            .attr("href", "#")
            .addClass("halfway-fab btn-floating pink pulse");
        let icon = $("<i>")
            .addClass("material-icons")
            .html("favorite");
        let cardContentDiv = $("<div>")
            .addClass("card-content")
        let artistSpan = $("<span>")
            .addClass("card-title")
            .html(event.name);
        let detailsIconSpan = $("<span>")
            .addClass("card-title activator grey-text text-darken-4")
            .html("Details");
        let detailsIcon = $("<i>")
            .addClass("material-icons right")
            .html("more_vert");
        let locationSpan = $("<span>")
            .attr("id", "location")
            .html(properties.location.city + ", " + properties.location.state);
        let venueSpan = $("<span>")
            .attr("id", "venue")
            .html(properties.location.venue);
        let dateSpan = $("<span>")
            .attr("id", "date")
        let cardActionDiv = $("<div>")
            .addClass("card-action")
        let ticketsLink = $("<a>")
            .attr("href", "#")
            .html("Buy Tickets");
        let cardRevealDiv = $("<div>")
            .addClass("card-reveal");
        let cardRevealSpan = $("<span>")
            .addClass("card-title grey-text text-darken-4")
            .html(event.name);
        let closeIcon = $("<i>")
            .addClass("material-icons right")
            .html("close");

        container.append(
            imageDiv.append(
                image, iconLink.append(icon)
            ),
            cardContentDiv.append(
                artistSpan, detailsIconSpan.append(detailsIcon), locationSpan, venueSpan, dateSpan
            ),
            cardActionDiv.append(ticketsLink),
            cardRevealDiv.append(
                cardRevealSpan.append(closeIcon)
            )
        );

        target.append(container);



    });
}

function getEventProperties(event) {
    let properties = {
        imageUrl: getImageUrl(event),
        location: getLocation(event),
        eventUrl: getEventUrl(event, this)
    }


    return properties
}

function getImageUrl(event) {
    try {
        return event.images[0].url;
    } catch (error) {
        console.debug(error);
        return "";
    }
}

function getLocation(event) {
    return {
        venue: getVenue(event, this),
        city: getCity(event, this),
        state: getState(event, this)
    };
}

function getVenue(event) {
    try {
        return event["_embedded"].venues[0].name;
    } catch (error) {
        console.debug(error);
        return "";
    }
}

function getCity(event) {
    try {
        return event["_embedded"].venues[0].city.name;
    } catch (error) {
        console.debug(error);
        return "";
    }
}

function getState(event) {
    try {
        return event["_embedded"].venues[0].state.stateCode;
    } catch (error) {
        console.debug(error);
        return "";
    }
}

function getEventUrl(event) {
    try {
        return event.url;
    } catch (error) {
        console.debug(error);
        return "#";
    }
}