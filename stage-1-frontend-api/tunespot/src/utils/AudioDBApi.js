const key = "2";
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function processServerRequest(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

async function getArtist(query) {
  let obj;
  const res = await fetch(
    `https://www.theaudiodb.com/api/v1/json/${key}/searchalbum.php?s=${query}`
  );

  try {
    obj = await res.json();

    return obj.album[0].idArtist;
  } catch (error) {
    console.log(error);
  }
}

// function getArtist(query) {
//   fetch(`https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?s=${query}`)
//     .then((response) => response.json())
//     .then((data) => console.log(data.album[0].idArtist))
//     .catch((error) => console.error(error));
// }

// function getVideo(input) {
//   return fetch(
//     `https://www.theaudiodb.com/api/v1/json/${key}/mvid.php?i=${input}`
//   );
// }

async function getVideo(input) {
  let obj;
  const res = await fetch(
    `https://www.theaudiodb.com/api/v1/json/${key}/mvid.php?i=${input}`
  );
  try {
    obj = await res.json();

    return obj;
  } catch (error) {
    console.log(error);
  }
}

export { getArtist, getVideo };
