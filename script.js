var websites = {
  "dodo": {
    "name": "Doppeldorf - Petershagen/Eggersdorf",
    "sites": [
      {
        "name": "Qualität der Bushaltestellen",
        "url": "dodo/bus_stop_quality/dodo_bus_stop_quality.html"
      },
      {
        "name": "Sattelfest 2023",
        "url": "dodo/sattelfest/sattelfest_2023.html"
      },
      {
        "name": "Sattelfest 2024",
        "url": "dodo/sattelfest/sattelfest_2024.html"
      }
    ]
  },
  "freifunk": {
    "sites": [
      {
        "name": "Freifunk",
        "url": "freifunk/freifunk.html"
      }
    ]
  },
  "mobus": {
    "sites": []
  },
  "sattelfest": {
    "sites": []
  },
  "maerker": {
    "sites": [
      {
        "name": "Maerker Brandenburg Viewer",
        "url": "maerker/maerker.html"
      }
    ]
  }
};

let div_website_overview = document.getElementById("website_overview");

Object.keys(websites).forEach((item, index, arr) => {
  let sites = websites[item]["sites"];
  
  if (!sites.lenght) {
    sites.forEach((item, index, arr) => {
      console.log(item.name);
      console.log(item.url);
      div_website_overview.innerHTML += `<a href="${item.url}" class="list-group-item list-group-item-action">${item.name}</a>`;
    });
  }
});

/*
function createDropdownLinkMenuHTML(menuName,linkDict) {
  var menu = document.createElement("div");
  menu.classList.add("dropdown");

  var menuHeader = document.createElement("a");
  menuHeader.classList.add("btn");
  menuHeader.classList.add("btn-secondary");
  menuHeader.classList.add("dropdown-toggle");

  menuHeader.innerHTML = menuName;

  menu.append(menuHeader);


  let menu = `
  <div class="dropdown">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">${menuName}</a>

    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div>`;
}
*/
