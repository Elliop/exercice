let users = [
  {
    id: "123456789",
    createdDate: "2021-01-06T00:00:00.000Z",
    status: "En validation",
    firstName: "Mohamed",
    lastName: "Taha",
    userName: "mtaha",
    registrationNumber: "2584",
  },
  {
    id: "987654321",
    createdDate: "2021-07-25T00:00:00.000Z",
    status: "Validé",
    firstName: "Hamid",
    lastName: "Orrich",
    userName: "horrich",
    registrationNumber: "1594",
  },
  {
    id: "852963741",
    createdDate: "2021-09-15T00:00:00.000Z",
    status: "Rejeté",
    firstName: "Rachid",
    lastName: "Mahidi",
    userName: "rmahidi",
    registrationNumber: "3576",
  },
];

const userTable = document.getElementById("userTable");

const statusObject = {
  Rejeté: "reject",
  Validé: "validated",
  "En validation": "pending",
};

const tableHeader = [
  "id",
  "createdDate",
  "status",
  "lastName",
  "firstName",
  "userName",
  "registrationNumber",
];

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("/");
}

const addRow = (user) => {
  let tr = document.createElement("tr");
  tr.setAttribute("data-id", user.id);
  tableHeader.forEach((header) => {
    let value = user[header];
    if (header === "createdDate") {
      const tmp = new Date(user.createdDate);
      value = `${formatDate(tmp)}`;
    }
    let td = document.createElement("td");
    if (header === "status") {
      let spanElement = document.createElement("span");
      spanElement.className = statusObject[user[header]];
      spanElement.innerHTML = value;
      td.appendChild(spanElement);
    } else td.innerHTML = value;
    tr.appendChild(td);
  });
  let actionTd = document.createElement("td");
  let actionBtn = document.createElement("btn");
  actionBtn.className = "btn-box";
  actionBtn.setAttribute("data-id", user.id);
  actionBtn.setAttribute("onclick", "deleteElement(this)");
  actionBtn.innerHTML = '<i class="trash fa-solid fa-trash"></i>';
  actionTd.appendChild(actionBtn);
  tr.appendChild(actionBtn);
  userTable.appendChild(tr);
};

const renderTable = () => {
  users.forEach((user) => addRow(user));
};

const deleteElement = (user) => {
  let userId = user.getAttribute("data-id");
  users = users.filter((user) => (user.id = userId));
  const trs = [...userTable.getElementsByTagName("tr")];
  trs.forEach((tr) => {
    if (tr.getAttribute("data-id") === userId) tr.remove();
  });
};

const showAddUser = () => {
  const form = document.getElementById("form");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
};

const addUser = () => {
  const user = {};
  user.id = `${
    Math.floor(Math.random() * (1000000000 - 100000000 + 1)) + 100000000
  }`;
  user.firstName = document.getElementById("firstName").value;
  user.lastName = document.getElementById("lastName").value;
  user.status = document.getElementById("status").value;
  user.userName = document.getElementById("userName").value;
  user.createdDate = document.getElementById("createdDate").value;
  user.registrationNumber = document.getElementById("registrationNumber").value;
  users.push(user);
  addRow(user);
};

renderTable();
