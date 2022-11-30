let add = document.getElementById("add");
let form = document.getElementById("form");
let closebtn = document.querySelector(".close");
let wrapCards = document.getElementById("wrapCards");
let addBtn = document.getElementById("addBtn");
let discriptionInput = document.getElementById("discription");
let titleInput = document.getElementById("title");
let titleAlt = document.getElementById("titleAlt");
let disAlt = document.getElementById("disAlt");
let toggelCon = document.querySelector("#mood");
let root = document.documentElement;
let datalist = [];
let light = false;

function changeTh() {
  if (light) {
    root.style.setProperty("--body", "#d3d3d3");
    root.style.setProperty("--white", "white");
    root.style.setProperty("--mainColor", "rgb(134, 168, 252)");
    root.style.setProperty("--fontColor", "black");
    root.style.setProperty("--input", "white");
  } else {
    root.style.setProperty("--body", "rgba(0, 0, 0, 0.87)");
    root.style.setProperty("--white", "rgba(0, 0, 0, 0.3)");
    root.style.setProperty("--mainColor", "rgb(134, 168, 252)");
    root.style.setProperty("--fontColor", "white");
    root.style.setProperty("--input", "rgba(0 ,0 ,0 ,.4)");
  }
}
closebtn.addEventListener("click", () => {
  form.style.display = "none";
  wrapCards.style.filter = "blur()";
  titleInput.value = "";
  discriptionInput.value = "";
  disAlt.style.display = "none";
  titleAlt.style.display = "none";
});

addBtn.addEventListener("click", () => {
  let obj = {};
  obj.title = titleInput.value;
  obj.discription = discriptionInput.value;

  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();

  obj.date = `${day} - ${month} - ${year} `;
  if (obj.title == "") {
    titleAlt.style.display = "block";
  } else if (obj.discription == "") {
    disAlt.style.display = "block";
  } else if (obj.discription === "" && obj.title === "") {
    titleAlt.style.display = "block";
    disAlt.style.display = "block";
  } else {
    datalist.push(obj);
    localStorage.setItem("data", JSON.stringify(datalist));

    wrapCards.innerHTML = "";
    wrapCards.innerHTML = ` <div class="added card" id="add" onclick="createNoteFun()">
  <p id="plus">+</p>
  <p id="text">add new note</p>
</div>`;
    datalist.map(
      (ele, index) =>
        (wrapCards.innerHTML += `<div class="card ">
<h3 class="noteTitle">${index + 1}  - ${ele.title}  </h3>
<p class="noteDis">${ele.discription}</p>
<div class="time"> <p>${ele.date} </p>
<button id='delete' onclick="deleteNote( ${index})"><i class="fa fa-trash-o" style="font-size:48px;color:red"></i>
</button>
</div>
</div>`)
    );

    titleInput.value = "";
    discriptionInput.value = "";
    form.style.display = "none";
    wrapCards.style.filter = "blur()";
  }
});

if (datalist.length == 0) {
  datalist = JSON.parse(localStorage.getItem("data"));
  if (datalist.length) {
    wrapCards.innerHTML = "";
    wrapCards.innerHTML = ` <div class="added card" id="add" onclick="createNoteFun()">
  <p id="plus">+</p>
  <p id="text">add new note</p>
</div>`;
    datalist.map(
      (ele, index) =>
        (wrapCards.innerHTML += `<div class="card ">
<h3 class="noteTitle">${index + 1}  - ${ele.title}  </h3>
<p class="noteDis">${ele.discription}</p>
<div class="time"> <p>${ele.date} </p>

<button id='delete' onclick="deleteNote( ${index})"><i class="fa fa-trash-o" style="font-size:48px;color:red"></i>
</button>
</div>
</div>`)
    );
  }
}

titleInput.onfocus = () => {
  titleAlt.style.display = "none";
};

discriptionInput.onfocus = () => {
  disAlt.style.display = "none";
};

function deleteNote(para) {
  datalist = datalist.filter((ele) => datalist.indexOf(ele) != para);
  localStorage.setItem("data", JSON.stringify(datalist));

  wrapCards.innerHTML = "";
  wrapCards.innerHTML = ` <div class="added card" id="add" onclick="createNoteFun()">
  <p id="plus">+</p>
  <p id="text">add new node</p>
</div>`;
  datalist.map(
    (ele, index) =>
      (wrapCards.innerHTML += `<div class="card ">
      <h3 class="noteTitle">${index + 1}  - ${ele.title}  </h3>
      <p class="noteDis">${ele.discription}</p>
      <div class="time"> <p>${ele.date} </p>
      
      <button id='delete' onclick="deleteNote( ${index})"><i class="fa fa-trash-o" style="font-size:48px;color:red"></i>
      </button>
      </div>
      </div>`)
  );
}
function sunMoon() {
  light = !light;

  if (light) {
    toggelCon.style.marginLeft = "40px";
    changeTh();
  } else {
    toggelCon.style.marginLeft = "0";

    changeTh();
  }
}

function createNoteFun() {
  form.style.display = "block";
  wrapCards.style.filter = "blur(3px)";
}
