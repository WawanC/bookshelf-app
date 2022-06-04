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

const sudahBacaBtn = document.getElementById("sudahBacaBtn");
const belumBacaBtn = document.getElementById("belumBacaBtn");
const searchBarInput = document.getElementById("searchBarInput");

const daftarBukuEl = document.getElementById("daftarBuku");

let searchKeyword = null;
let books = [];

const renderBuku = () => {
  daftarBukuEl.innerHTML = "";
  const daftarBukuMode = daftarBukuEl.dataset.mode;

  let displayedBooks = books.filter((book) => {
    if (daftarBukuMode === "sudah") {
      return book.isComplete === true;
    } else {
      return book.isComplete === false;
    }
  });

  const filteredBooks = searchKeyword
    ? displayedBooks.filter((book) => book.title.includes(searchKeyword))
    : displayedBooks;

  filteredBooks.forEach((book) => {
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

sudahBacaBtn.addEventListener("click", () => toggleModeDaftarBuku("sudah"));
belumBacaBtn.addEventListener("click", () => toggleModeDaftarBuku("belum"));

searchBarInput.addEventListener("input", () => {
  if (searchBarInput.value.trim().length >= 1) {
    searchKeyword = searchBarInput.value;
  } else {
    searchKeyword = null;
  }
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

const toggleModeDaftarBuku = (mode = "sudah") => {
  if (mode === "belum") {
    sudahBacaBtn.classList.toggle("unselectedListMode", true);
    belumBacaBtn.classList.toggle("selectedListMode", true);

    sudahBacaBtn.classList.toggle("selectedListMode", false);
    belumBacaBtn.classList.toggle("unselectedListMode", false);

    daftarBukuEl.dataset.mode = "belum";
  } else {
    sudahBacaBtn.classList.toggle("selectedListMode", true);
    belumBacaBtn.classList.toggle("unselectedListMode", true);

    sudahBacaBtn.classList.toggle("unselectedListMode", false);
    belumBacaBtn.classList.toggle("selectedListMode", false);

    daftarBukuEl.dataset.mode = "sudah";
  }
  renderBuku();
};
