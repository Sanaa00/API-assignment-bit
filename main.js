async function fetchProducts(url) {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

const cards = document.querySelector(".cards");
let promise = fetchProducts();

promise.then((data) => {
  data?.results
    .filter((items) => items.status === "Alive")
    .map((item) => {
      if (item.episode.length < 25) {
        item.character = "side";
      } else {
        item.character = "main";
      }

      const card = document.createElement("div");
      card.classList = "card";
      cards.appendChild(card);

      const cardImg = document.createElement("img");
      cardImg.src = `${item.image}`;
      cardImg.classList = "card-img";
      card.appendChild(cardImg);

      const contentDiv = document.createElement("div");
      contentDiv.classList = "card-content";
      card.appendChild(contentDiv);

      const cardName = document.createElement("p");
      cardName.classList = "name";
      cardName.innerHTML = `${item.name}`;
      contentDiv.appendChild(cardName);

      const bottomDiv = document.createElement("div");
      bottomDiv.classList = "card-bottom";
      contentDiv.appendChild(bottomDiv);

      const statusCard = document.createElement("p");
      statusCard.classList = "status";
      statusCard.innerHTML = `${item.status}`;
      bottomDiv.appendChild(statusCard);

      const genderCard = document.createElement("p");
      genderCard.classList = "gender";
      genderCard.innerHTML = `${item.gender}`;
      bottomDiv.appendChild(genderCard);

      document
        .querySelector(".input-search")
        .addEventListener("input", filterList);

      function filterList() {
        const searchInput = document.querySelector(".input-search");
        const filter = searchInput.value.toLowerCase();
        const listItem = document.querySelectorAll(".card");

        listItem.forEach((item) => {
          let cards = item.textContent;
          if (cards.toLowerCase().includes(filter.toLowerCase())) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      }
    });
});
