$('document').ready(function () {

  const form = document.getElementById('searchForm');
  const searchCon = document.getElementById('searchContainer');
  const searchText = document.getElementById('searchField');
  const err = document.getElementById('error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);
          let results = response.albums.items;
            if (searchText.value = "") {
              err.style.display = "block";
            } else {
              err.style.display = "none";
              let responseHTML = `<div class="container">`;
              for (let i = 0; i < results.length; ++i) {
                let resultsName = results[i].name;
                let resultsImage = results[i].images[0].url;
                responseHTML += `<div class="flex">
                                   <a href="` +resultsImage+ `" data-lightbox="gallery" data-title="` +resultsName+ `">
                                   <img class="gallery-item" src="` +resultsImage+ `" title="` +resultsName+ `"></a>
                                 </div>`;
              }
              responseHTML += `</div>`;
              searchCon.innerHTML = responseHTML;
              console.log(response);
            }
        }
      }
    };
    let searchQuery = '?q='+searchText.value+'&type=album&limit=18';
    xhr.open('GET', 'https://api.spotify.com/v1/search'+searchQuery);
    xhr.send();
  }); // end submit
}); // end ready
