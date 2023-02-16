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
    });
});
