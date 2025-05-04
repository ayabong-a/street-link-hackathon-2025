mapboxgl.accessToken =
  "2JrrQs9wFijeWVJZSxdFapiyi6DyGq7VtcXBhuLMPsNRQ9YYTn8aJQQJ99BEACYeBjFjEEY1AAAgAZMP20tV";

function exploreMap() {
  const userCoordinates = [28.3645, -26.2355];
  setupMap(userCoordinates);

  function setupMap(center) {
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: 15,
    });

    map.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker({ color: "blue" })
      .setLngLat(center)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML("<h3>Your Location</h3>")
      )
      .addTo(map);

    const vendors = [
      {
        name: "Tumi the Artist",
        description:
          "Colorful township murals & portraits. Available for custom wall art.",
        coordinates: [28.365, -26.236],
        category: "art",
        services: "murals, portraits, custom art",
        rating: 4.8,
      },
      {
        name: "Lebo’s Fresh Produce",
        description:
          "Locally grown fruits and vegetables picked fresh every morning.",
        coordinates: [28.366, -26.237],
        category: "food",
        services: "fruit, vegetables, farm produce",
        rating: 4.6,
      },
      {
        name: "Mama Thandi’s Knits",
        description:
          "Handmade scarves, beanies and throws with a personal touch.",
        coordinates: [28.363, -26.235],
        category: "craft",
        services: "scarves, beanies, throws",
        rating: 4.9,
      },
    ];

    const allMarkers = [];

    vendors.forEach(function (vendor) {
      const marker = new mapboxgl.Marker()
        .setLngLat(vendor.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${vendor.name}</h3><p>${vendor.description}</p><p><strong>Rating:</strong> ${vendor.rating} ★</p>`
          )
        )
        .addTo(map);

      marker.vendorData = vendor;
      allMarkers.push(marker);
    });

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      allMarkers.forEach((marker) => {
        const { name, description, services } = marker.vendorData;
        const match =
          name.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query) ||
          services.toLowerCase().includes(query);
        marker.getElement().style.display = match ? "block" : "none";
      });
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    map.addControl(geocoder);

    const filterGroup = document.createElement("div");
    filterGroup.className = "filter-group";

    const categories = ["all", "food", "art", "craft"];
    categories.forEach(function (category) {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "category";
      input.id = category;
      input.value = category;
      if (category === "all") input.checked = true;
      filterGroup.appendChild(input);

      const label = document.createElement("label");
      label.setAttribute("for", category);
      label.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      filterGroup.appendChild(label);

      input.addEventListener("change", function (e) {
        const value = e.target.value;
        allMarkers.forEach((marker) => {
          const vendor = marker.vendorData;
          const isMatch = value === "all" || vendor.category === value;
          marker.getElement().style.display = isMatch ? "block" : "none";
        });
      });
    });

    document.body.appendChild(filterGroup);
  }
}

function goToVendorSystem() {
  window.location.href = "vendor-system.html";
}
