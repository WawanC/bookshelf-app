const modalEl = document.getElementById("modal");
const tambahBukuBtn = document.getElementById("tambahBuku");
const modalBackdropEl = document.getElementById("modalBackdrop");

const modalForm = document.getElementById("modalForm");
const modalTitle = document.getElementById("modalTitle");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const yearInput = document.getElementById("yearInput");
const isCompleteInput = document.getElementById("isCompleteInput");
const modalSubmitBtn = document.getElementById("modalSubmit");

const daftarBukuEl = document.getElementById("daftarBuku");

let books = [];

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

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", () =>
      tampilkanModal("edit", {
        id: book.id,
        title: book.title,
        author: book.author,
        year: book.year,
        isComplete: book.isComplete,
      })
    );

    const hapusBtn = document.createElement("button");
    hapusBtn.innerText = "Hapus";
    hapusBtn.addEventListener("click", () => hapusBuku(book.id));

    actionBuku.appendChild(editBtn);
    actionBuku.appendChild(hapusBtn);

    itemBuku.appendChild(infoBuku);
    itemBuku.appendChild(actionBuku);

    daftarBukuEl.appendChild(itemBuku);
  });
};

renderBuku();

tambahBukuBtn.addEventListener("click", () => {
  tampilkanModal("tambah", {});
});

modalBackdropEl.addEventListener("click", (ev) => {
  ev.stopPropagation();
  resetForm();
  modalEl.classList.toggle("tampil");
});

modalForm.addEventListener("submit", (ev) => {
  const formMode = modalForm.dataset.mode || "tambah";
  const bookId = modalForm.dataset.id || null;
  ev.preventDefault();

  const enteredTitle = titleInput.value.trim();
  const enteredAuthor = authorInput.value.trim();
  const enteredYear = yearInput.value;
  const enteredIsComplete = isCompleteInput.checked;

  formMode === "tambah" && bookId
    ? tambahBuku(enteredTitle, enteredAuthor, enteredYear, enteredIsComplete)
    : updateBuku(bookId, {
        title: enteredTitle,
        author: enteredAuthor,
        year: enteredYear,
        isComplete: enteredIsComplete,
      });

  resetForm();
  modalEl.classList.toggle("tampil");
});

const tambahBuku = (title, author, year, isComplete) => {
  books.push({
    id: new Date().toISOString(),
    title,
    author,
    year,
    isComplete,
  });
  renderBuku();
};

const hapusBuku = (id) => {
  books = books.filter((book) => book.id !== id);
  renderBuku();
};

const updateBuku = (
  id,
  { title = null, author = null, year = null, isComplete = null }
) => {
  const bookIdx = books.findIndex((book) => book.id === id);

  books[bookIdx].title = title ? title : books[bookIdx].title;
  books[bookIdx].author = author ? author : books[bookIdx].author;
  books[bookIdx].year = year ? year : books[bookIdx].year;
  books[bookIdx].isComplete = isComplete
    ? isComplete
    : books[bookIdx].isComplete;

  renderBuku();
};

const resetForm = () => {
  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  isCompleteInput.checked = false;
};

const tampilkanModal = (
  mode,
  { id = null, title = null, author = null, year = null, isComplete = null }
) => {
  modalForm.dataset.mode = mode;
  modalForm.dataset.id = id;
  modalTitle.innerText = mode === "tambah" ? "Tambah Buku" : "Edit Buku";

  titleInput.value = title ? title : "";
  authorInput.value = author ? author : "";
  yearInput.value = year ? year : "";
  isCompleteInput.checked = isComplete ? isComplete : false;
  modalSubmitBtn.innerText = mode === "tambah" ? "Tambah" : "Edit";

  modalEl.classList.toggle("tampil");
};
