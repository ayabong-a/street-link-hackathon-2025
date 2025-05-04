require("dotenv").config();
mapboxgl.accessToken = process.env.ACCESS_TOKEN;

function exploreMap() {
  // Default user location close to vendors in Brakpan
  const userCoordinates = [28.3645, -26.2355]; // Coordinates close to the vendors

  setupMap(userCoordinates);

  function setupMap(center) {
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: 15, 
    }); 

    map.addControl(new mapboxgl.NavigationControl()); // Add user location marker

    var userMarker = new mapboxgl.Marker({ color: "blue" })
      .setLngLat(center)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML("<h3>Your Location</h3>")
      )
      .addTo(map);

    const vendors = [
      {
        name: "Vendor 1",
        description: "Delicious street food",
        coordinates: [28.364, -26.235],
        category: "food",
      },
      {
        name: "Vendor 2",
        description: "Local artist",
        coordinates: [28.365, -26.236],
        category: "art",
      },
    ];

    vendors.forEach(function (vendor) {
      var marker = new mapboxgl.Marker()
        .setLngLat(vendor.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            "<h3>" + vendor.name + "</h3><p>" + vendor.description + "</p>"
          )
        )
        .addTo(map);
    });

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.addControl(geocoder); // Add filter functionality

    var filterGroup = document.createElement("div");
    filterGroup.className = "filter-group";

    var categories = ["all", "food", "art"];
    categories.forEach(function (category) {
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "category";
      input.id = category;
      input.value = category;
      if (category === "all") input.checked = true;
      filterGroup.appendChild(input);

      var label = document.createElement("label");
      label.setAttribute("for", category);
      label.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      filterGroup.appendChild(label);

      input.addEventListener("change", function (e) {
        var value = e.target.value;
        vendors.forEach(function (vendor) {
          var marker = new mapboxgl.Marker()
            .setLngLat(vendor.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                "<h3>" + vendor.name + "</h3><p>" + vendor.description + "</p>"
              )
            )
            .addTo(map);
          if (value === "all" || vendor.category === value) {
            marker.getElement().style.display = "block";
          } else {
            marker.getElement().style.display = "none";
          }
        });
      });
    });

    document.body.appendChild(filterGroup);
  }
}

function goToVendorSystem() {
  window.location.href = "vendor-system.html";
}
