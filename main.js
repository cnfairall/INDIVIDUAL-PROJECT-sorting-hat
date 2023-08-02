const students = [
{
  id: 1,
  name: "Aja",
  house: "Griffyndor",
},

{
  id: 2,
  name: "Dr. T",
  house: "Ravenclaw"
},

{
  id: 3,
  name: "Mollie",
  house: "Hufflepuff"
}

]


const openFormBtn = document.querySelector("#open-form-btn");
const form = document.querySelector("form");
const deathEaters = []


//functions
const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
}

const studentsOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString +=
    `
      <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 id="name" class="card-title">${student.name}</h5>
        <p class="card-text">${student.house}</p>
        <button id="expel--${student.id}" class="btn btn-primary">Expel</button>
      </div>
      </div>
    `
  };
  renderToDom("#student-container", domString);
};

const openForm = () => {
  let domString = ""
  domString +=
  `<form>
  <div class="mb-3">
    <label for="name" class="form-label">Your name</label>
    <input type="text" class="form-control" id="name">
  </div>
  <button type="submit" id="submit" class="btn btn-primary">Submit</button>
  </form>
  `
  renderToDom("#form", domString);
};

const showDarkSide = (array) => {
  let domString = ""
  for (const expelledStudent of deathEaters) {
    domString +=
    `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 id="name" class="card-title">${expelledStudent.name}</h5>
      <button id="redeem--${expelledStudent.id}" class="btn btn-primary">Redeem</button>
    </div>
    </div>
    `
    renderToDom("#expelled-container", domString)
}
}

const newStudent = () => {
  const houses = ["Hufflepuff", "Griffyndor", "Ravenclaw", "Slytherin"]
  const randomNumber = Math.floor(Math.random() * 4);
  const chosenHouse = houses[randomNumber];
  const newStudentObj = {
    id: students.length + 1,
    name: document.querySelector("#name").value,
    house: chosenHouse
  }
  
  students.push(newStudentObj);
  studentsOnDom(students);
};

const eventListeners = () => {
  openFormBtn.addEventListener("click", openForm);
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    newStudent();
    renderToDom("#form", "")
  })

  document.querySelector("#student-container").addEventListener("click", (e) => {
    if (e.target.id.includes("expel")) {
      const [, int] = e.target.id.split("--");
      const index = students.findIndex((student) => student.id === Number(int));
      
      const expelledStudent = students.splice(index, 1)[0];
      deathEaters.push(expelledStudent)
      showDarkSide(deathEaters)
      studentsOnDom(students)
      
    }
  })
}
 const startApp = () => {
  studentsOnDom(students);
  showDarkSide(deathEaters);
  eventListeners();
};

startApp()
