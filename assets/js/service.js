export class FetchApi {
  static getMethodPost(url, response) {
    return fetch(url + "/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    });
  }

  static getMethodGet(url, param = "") {
    return fetch(url + "/categories/" + param, {
      method: "GET",
    }).then(function (data) {
      return data.json();
    });
  }

  static getMethodDelete(url, param = "") {
    return fetch(url + "/categories/" + param, {
      method: "DELETE",
    });
  }

  static getMethodPut(url, response, param = "") {
    return fetch(url + "/categories/" + param, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    });
  }
}
