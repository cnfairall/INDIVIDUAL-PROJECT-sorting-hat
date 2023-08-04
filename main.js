const students = [
  {
    id: 1,
    name: "Aja",
    house: "Gryffindor",
  },

  {
    id: 2,
    name: "Dr. T",
    house: "Ravenclaw",
  },

  {
    id: 3,
    name: "Mollie",
    house: "Hufflepuff",
  },
];

const openFormBtn = document.querySelector("#open-form-btn");
const filterBtn = document.querySelector("#filter-buttons");
const form = document.querySelector("form");
const deathEaters = [];
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

//functions

const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
};

const studentsOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `
      <div id="card" class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 id="name" class="card-title">${student.name}</h5>
        <p class="card-text">${student.house}</p>
        <button id="expel--${student.id}" class="btn btn-primary">Expel</button>
      </div>
      </div>
    `;
  }
  renderToDom("#student-container", domString);
};

const filterByHouse = (house) => {
  const filteredStudents = students.filter(
    (student) => student.house === house
  );
  studentsOnDom(filteredStudents);
};

const openForm = () => {
  let domString = "";
  domString += `<form>
  <div class="mb-3">
    <label for="name" class="form-label">Your name</label>
    <input type="text" class="form-control" id="name">
  </div>
  <button type="submit" id="submit" class="btn btn-primary">Sort me!</button>
  </form>
  `;
  renderToDom("#form", domString);
};

const showDarkSide = (array) => {
  let domString = "";
  for (const student of deathEaters) {
    domString += `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 id="name" class="card-title">${student.name}</h5>
      <button id="redeem--${student.id}" class="btn btn-primary">Redeem</button>
    </div>
    </div>
    `;
    renderToDom("#expelled-container", domString);
  }
};

const newStudent = () => {
  const houses = ["Hufflepuff", "Gryffindor", "Ravenclaw", "Slytherin"];
  const randomNumber = Math.floor(Math.random() * 4);
  const chosenHouse = houses[randomNumber];
  const newStudentObj = {
    id: students.length + 1,
    name: document.querySelector("#name").value,
    house: chosenHouse,
  };

  students.push(newStudentObj);
  studentsOnDom(students);
};

const eventListeners = () => {
  openFormBtn.addEventListener("click", openForm);

  span.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (document.querySelector("#name").value === "") {
      modal.style.display = "block";
    } else {
      newStudent();
      renderToDom("#form", "");
    }
  });

  filterBtn.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "Gryffindor":
        filterByHouse("Gryffindor");
        break;
      case "Ravenclaw":
        filterByHouse("Ravenclaw");
        break;
      case "Slytherin":
        filterByHouse("Slytherin");
        break;
      case "Hufflepuff":
        filterByHouse("Hufflepuff");
        break;
      default:
        studentsOnDom(students);
        break;
    }
  });

  document
    .querySelector("#student-container")
    .addEventListener("click", (e) => {
      if (e.target.id.includes("expel")) {
        const [, int] = e.target.id.split("--");
        const index = students.findIndex(
          (student) => student.id === Number(int)
        );

        const expelledStudent = students.splice(index, 1)[0];
        deathEaters.push(expelledStudent);
        showDarkSide(deathEaters);
        studentsOnDom(students);
      }
    });

  document
    .querySelector("#expelled-container")
    .addEventListener("click", (e) => {
      if (e.target.id.includes("redeem")) {
        const [, int] = e.target.id.split("--");
        const index = deathEaters.findIndex(
          (student) => student.id === Number(int)
        );

        const redeemedStudent = deathEaters.splice(index, 1)[0];
        students.push(redeemedStudent);
        showDarkSide(deathEaters);
        studentsOnDom(students);
      }
    });
};

const startApp = () => {
  studentsOnDom(students);
  showDarkSide(deathEaters);
  eventListeners();
};

startApp();
