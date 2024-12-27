export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.tunespot.crabdance.com"
    : "http://localhost:3000";
function processServerRequest(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/mvids`).then(processServerRequest);
}

function postItem(data, token) {
  return fetch(`${baseUrl}/mvids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      strTrackThumb: data.strTrackThumb,
      strMusicVid: data.strMusicVid,
      strTrack: data.strTrack,
    }),
  }).then(processServerRequest);
}

function deleteItem(id) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/mvids/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerRequest);
}

export { getItems, deleteItem, postItem, processServerRequest };
