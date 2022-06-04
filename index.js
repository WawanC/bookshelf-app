const modalEl = document.getElementById("modal");
const tambahBukuBtn = document.getElementById("tambahBuku");
const modalBackdropEl = document.getElementById("modalBackdrop");

const modalForm = document.getElementById("modalForm");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const yearInput = document.getElementById("yearInput");
const isCompleteInput = document.getElementById("isCompleteInput");

const daftarBukuEl = document.getElementById("daftarBuku");

const books = [];

const renderBuku = () => {
  daftarBukuEl.innerHTML = "";

  books.forEach((book) => {
    const itemBuku = document.createElement("div");
    itemBuku.className = "itemBuku";

    const infoBuku = document.createElement("div");
    infoBuku.className = "infoBuku";
    const judulEl = document.createElement("h1");
    judulEl.innerText = book.title;
    const infoEl = document.createElement("span");
    infoEl.innerText = `${book.author} (${book.year})`;
    infoBuku.appendChild(judulEl);
    infoBuku.appendChild(infoEl);

    const actionBuku = document.createElement("div");
    actionBuku.className = "actionBuku";
    const selesaiBtn = document.createElement("button");
    selesaiBtn.innerText = "Selesai";
    const hapusBtn = document.createElement("button");
    hapusBtn.innerText = "Hapus";
    actionBuku.appendChild(selesaiBtn);
    actionBuku.appendChild(hapusBtn);

    itemBuku.appendChild(infoBuku);
    itemBuku.appendChild(actionBuku);

    daftarBukuEl.appendChild(itemBuku);
  });
};

renderBuku();

tambahBukuBtn.addEventListener("click", () => {
  modalEl.classList.toggle("tampil");
});

modalBackdropEl.addEventListener("click", (ev) => {
  ev.stopPropagation();
  resetForm();
  modalEl.classList.toggle("tampil");
});

modalForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const enteredTitle = titleInput.value.trim();
  const enteredAuthor = authorInput.value.trim();
  const enteredYear = yearInput.value;
  const enteredIsComplete = isCompleteInput.checked;

  tambahBuku(enteredTitle, enteredAuthor, enteredYear, enteredIsComplete);

  console.log(books);
  resetForm();
  modalEl.classList.toggle("tampil");
  renderBuku();
});

const tambahBuku = (title, author, year, isComplete) => {
  books.push({
    id: new Date().toISOString(),
    title,
    author,
    year,
    isComplete,
  });
};

const resetForm = () => {
  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  isCompleteInput.checked = false;
};
