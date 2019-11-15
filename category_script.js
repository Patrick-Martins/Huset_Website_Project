const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
console.log(id);

fetch("http://pjmelite.dk/wp_mytest/wordpress/wp-json/wp/v2/band/" + category) //with the information i get from the id parameter on the url i can the fetch the data from that specific id and display any information about it
    .then(res => res.json())
    .then(showBand)

function showBand(event) {
    console.log(event);

    //2 clone a template
    const template = document.querySelector(".postTemplate").content;
    const eventCopy = template.cloneNode(true);

    //3 textcontent & innerHTML

    const a = eventCopy.querySelector("a");
    a.href = "sub_script.html?id=" + event.id;

    //    const content=eventCopy.querySelector("section");
    //    content.innerHTML=event.content.rendered;


    const eventImage = eventCopy.querySelector("img");
    const imagePath = event._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
    eventImage.src = imagePath;


    console.log(event.featured_media)
    console.log(event.event_date)


    const eventDate = eventCopy.querySelector("#event_date");
    eventDate.textContent = `${event.event_date} at ${event.event_time}`;

    console.log("this is the time" + event.event_time)

    const eventPrice = eventCopy.querySelector("#event_price");
    eventPrice.textContent = `${event.price}`;

    const eventLocation = eventCopy.querySelector("#event_location");
    eventLocation.textContent = `${event.where}`;

    //     const eventPrice = eventCopy.querySelector("#event_date");
    //    eventTitle.textContent = event.;

    const eventTitle = eventCopy.querySelector("#event_title");
    eventTitle.innerHTML = event.title.rendered; //.rendered because it is already rendered in the event post itself


    //4 append
    document.querySelector("#events").appendChild(eventCopy);
}
