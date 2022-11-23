import { URL_LOCAL } from "./enviroment.js";
import { FetchApi } from "./service.js";
import { Category } from "./modal.js";

let categoryInput = document.getElementById("categoryInput"),
  addCategoryBtn = document.getElementById("addCategoryBtn"),
  updateCategoryBtn = document.getElementById("updateCategoryBtn"),
  tableBody = document.getElementById("tableBody");

addCategoryBtn.addEventListener("click", function () {
  FetchApi.getMethodPost(URL_LOCAL, new Category(categoryInput)).then(
    function () {
      renderList();
      resetInput();
    }
  );
});

function renderList() {
  FetchApi.getMethodGet(URL_LOCAL).then(function (categories) {
    tableBody.innerHTML = null;
    createList(categories);
    editList();
    deleteList();
  });
}

function createList(response) {
  for (let category of response) {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML += `
      <td>${category.id}</td>
      <td>${category.category_name}</td>
      <td><button class= "edit"  data-categoryid ="${category.id}">Edit</button></td>
      <td><button class= "delete"  data-categoryid ="${category.id}">Delete</button></td>
  `;
    tableBody.appendChild(tableRow);
  }
}

function deleteList() {
  const deleteLinks = document.getElementsByClassName("delete");

  for (let deleteLink of deleteLinks) {
    deleteLink.addEventListener("click", function (event) {
      const id = event.target.getAttribute("data-categoryid");
      FetchApi.getMethodDelete(URL_LOCAL, id).then(function () {
        renderList();
      });
    });
  }
}

function editList() {
  const editLinks = document.getElementsByClassName("edit");
  for (let editLink of editLinks) {
    editLink.addEventListener("click", function (event) {
      const id = event.target.getAttribute("data-categoryid");
      FetchApi.getMethodGet(URL_LOCAL, id).then(function (categories) {
        categoryInput.value = categories.category_name;
        addCategoryBtn.style.display = "none";
        updateCategoryBtn.style.display = "block";
        updateCategoryBtn.setAttribute("data-categoryid", categories.id);
        updateCategoryBtn.addEventListener("click", function (event) {
          const id = event.target.getAttribute("data-categoryid");
          FetchApi.getMethodPut(
            URL_LOCAL,
            new Category(categoryInput),
            id
          ).then(function () {
            addCategoryBtn.style.display = "block";
            updateCategoryBtn.style.display = "none";
            resetInput();
            renderList();
          });
        });
      });
    });
  }
}

function resetInput() {
  categoryInput.value = null;
}

window.onload = function () {
  renderList();
};
