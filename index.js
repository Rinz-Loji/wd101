let form = document.getElementById("user-form");
let submit = document.getElementById("submit");
let DOB = document.getElementById("dob");

/* Function for showing the table on the user page form local storage */
const retrieveentries = () => {
  /* Retrieving entries from local storage */
  let Entries = JSON.parse(localStorage.getItem("Entries"));
  const table = document.getElementById("table");

  /* Here all array elements are one row of the table  each element has to be in between <tr>*/
  let tr = Entries.map((row, index) => {
    /* Each elemnt inside an array has to be between <th> and </th> */
    th = row.map((col) => {
      return '<td class="border border-blue-400 px-6 py-1">' + col + "</td>";
    });
    return "<tr>" + th.join("\n") + "</tr>";
  });
  document.getElementById("table").innerHTML = tr.join("\n");
};

if (localStorage.getItem("Entries") === null) {
  /* Adding an empty array to local storage */
  entries = [];
  localStorage.setItem("Entries", JSON.stringify([]));
} else {
  entries = JSON.parse(localStorage.getItem("Entries"));
  retrieveentries();
}

retrieveentries();

function age(date) {
  let age = 0;
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let x = date.split("-");
  x = x.map((y) => Number(y));
  if (month > x[1]) {
    age = year - x[0];
  } else if (month < x[1]) {
    age = year - x[0] - 1;
  } else {
    if (day >= x[2]) {
      age = year - x[0];
    } else {
      age = year - x[0] - 1;
    }
  }
  return age;
}

function Minage(date) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const min = [year, month, day];
  let x = date.split("-");
  min[0] = year - 18;
  return min.join("/");
}

function Maxage(date) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const max = [year, month, day];
  let x = date.split("-");
  max[0] = year - 55;
  return max.join("/");
}
function validate(date) {
  if (age(date) < 18) {
    DOB.setCustomValidity(
      `Value must be ${Minage(date)} or before of the format YYYY/MM/DD`
    );
    DOB.reportValidity();
  } else if (age(date) > 55) {
    DOB.setCustomValidity(
      `Value must be ${Maxage(date)} or after of the format YYYY/MM/DD`
    );
    DOB.reportValidity();
  } else {
    DOB.setCustomValidity("");
  }
}
submit.addEventListener("click", () => validate(DOB.value));

form.addEventListener("submit", function (event) {
  /* Prevemting default event and getting all input elements */
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const terms = document.getElementById("acceptterms").checked;
  /* Putting all elements in an array and pushing into the entries array */
  console.log(age(DOB.value));
  let arr = [name, email, password, DOB.value, terms];
  entries.push(arr);
  localStorage.setItem("Entries", JSON.stringify(entries));
  retrieveentries();
});
