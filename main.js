async function fetchProducts() {
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
// const nameCard = document.querySelector("name");
// const statusCard = document.querySelector("status");
// const genderCard = document.querySelector("gender");
const promise = fetchProducts();
promise.then((data) => {
  data.results
    .filter((items) => items.status === "Alive")
    .map((item) => {
      if (item.episode.length < 25) {
        item.character = "side";
      } else {
        item.character = "main";
      }
      console.log(item);

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

      // const episodeCard = document.createElement("button");
      // episodeCard.innerHTML = `${item.episode}`;
      // episodeCard.onclick((episode) => {
      //   episode = `https://rickandmortyapi.com/api/episode/1+1`;
      // });
      // contentDiv.appendChild(episodeCard);

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
    });
});
