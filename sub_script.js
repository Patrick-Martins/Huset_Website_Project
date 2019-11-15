const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

fetch("http://liatalony.com/liatalony/wp-json/wp/v2/event?_embed&per_page=100"+id)//with the information i get from the id parameter on the url i can the fetch the data from that specific id and display any information about it
    .then(res => res.json())
    .then(showBand)

function showBand(band){
    console.log(band);

    document.querySelector("article h1").textContent=band.title.rendered;
}



