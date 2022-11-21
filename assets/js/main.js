let categoryInput = document.getElementById("categoryInput"),
  addCategoryBtn = document.getElementById("addCategoryBtn"),
  updateCategoryBtn = document.getElementById("updateCategoryBtn"),
  tableBody = document.getElementById("tableBody");

function Category(category_name) {
  this.category_name = category_name.value;
}

addCategoryBtn.addEventListener("click", function () {
  fetch("http://localhost:3000/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: new Category(categoryInput),
    }),
  }).then(function () {
    renderList();
    resetInput();
  });
});

function renderList() {
  fetch("http://localhost:3000/categories", {
    method: "GET",
  })
    .then(function (data) {
      return data.json();
    })
    .then(function (categories) {
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
      <td>${category.category.category_name}</td>
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
      fetch("http://localhost:3000/categories/" + id, {
        method: "DELETE",
      }).then(function () {
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
      fetch("http://localhost:3000/categories/" + id, {
        method: "GET",
      })
        .then(function (data) {
          return data.json();
        })
        .then(function (categories) {
          categoryInput.value = categories.category.category_name;
          addCategoryBtn.style.display = "none";
          updateCategoryBtn.style.display = "block";
          updateCategoryBtn.setAttribute("data-categoryid", categories.id);
          updateCategoryBtn.addEventListener("click", function (event) {
            const id = event.target.getAttribute("data-categoryid");

            fetch("http://localhost:3000/categories/" + id, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                category: new Category(categoryInput),
              }),
            }).then(function () {
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
