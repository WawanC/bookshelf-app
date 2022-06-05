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

const storage = window.localStorage;

const iconSize = 24;

const selesaiBtnIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" fill="black" class="bi bi-check" viewBox="0 0 16 16">
<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg><span class='tooltip'>Sudah Selesai</span>`;

const belumSelesaiBtnIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" fill="black" class="bi bi-x" viewBox="0 0 16 16">
<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg><span class='tooltip'>Belum Selesai</span>`;

const editBtnIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" fill="black" class="bi bi-pencil" viewBox="0 0 16 16">
<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg><span class='tooltip'>Edit Buku</span>`;

const hapusBtnIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" fill="black" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg><span class='tooltip'>Hapus Buku</span>`;

let searchKeyword = null;
let books = storage.getItem("books")
  ? JSON.parse(storage.getItem("books"))
  : [];

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
    ? displayedBooks.filter((book) =>
        book.title.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : displayedBooks;

  if (filteredBooks.length <= 0) {
    const noBooksTextEl = document.createElement("span");
    noBooksTextEl.innerHTML = searchKeyword
      ? "Buku tidak ditemukan"
      : "Belum ada buku";
    noBooksTextEl.className = "noBook";
    daftarBukuEl.appendChild(noBooksTextEl);
  }

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

    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = book.isComplete
      ? belumSelesaiBtnIcon
      : selesaiBtnIcon;
    toggleBtn.className = book.isComplete ? "belumSelesaiBtn" : "selesaiBtn";
    toggleBtn.addEventListener("click", () =>
      updateBuku(book.id, { isComplete: !book.isComplete })
    );

    const editBtn = document.createElement("button");
    editBtn.innerHTML = editBtnIcon;
    editBtn.className = "editBtn";
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
    hapusBtn.innerHTML = hapusBtnIcon;
    hapusBtn.className = "hapusBtn";
    hapusBtn.addEventListener("click", () => hapusBuku(book.id));

    actionBuku.appendChild(toggleBtn);
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

modalBackdropEl.addEventListener("click", async (ev) => {
  ev.stopPropagation();
  await tutupModal();
  resetForm();
});

modalForm.addEventListener("submit", async (ev) => {
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

  await tutupModal();
  resetForm();
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

titleInput.addEventListener("input", () => {
  if (titleInput.value.trim().length < 1) {
    titleInput.setCustomValidity("Valid title is required");
    titleInput.value = "";
  } else {
    titleInput.setCustomValidity("");
  }
});

authorInput.addEventListener("input", () => {
  if (authorInput.value.trim().length < 1) {
    authorInput.setCustomValidity("Valid author is required");
    authorInput.value = "";
  } else {
    authorInput.setCustomValidity("");
  }
});

const tambahBuku = (title, author, year, isComplete) => {
  books.push({
    id: new Date().toISOString(),
    title,
    author,
    year,
    isComplete,
  });

  saveBooks();
  renderBuku();
};

const hapusBuku = (id) => {
  books = books.filter((book) => book.id !== id);

  saveBooks();
  renderBuku();
};

const updateBuku = (
  id,
  { title = null, author = null, year = null, isComplete = null }
) => {
  console.log(isComplete !== null);
  const bookIdx = books.findIndex((book) => book.id === id);

  books[bookIdx].title = title ? title : books[bookIdx].title;
  books[bookIdx].author = author ? author : books[bookIdx].author;
  books[bookIdx].year = year ? year : books[bookIdx].year;
  books[bookIdx].isComplete =
    isComplete !== null ? isComplete : books[bookIdx].isComplete;

  saveBooks();
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

  modalEl.classList.toggle("tampil", true);
  setTimeout(() => modalForm.classList.toggle("modalOpen", true), 20);
};

const tutupModal = () => {
  modalForm.classList.toggle("modalOpen", false);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      modalEl.classList.toggle("tampil", false);
      resolve();
    }, 400);
  });
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

const saveBooks = () => {
  storage.setItem("books", JSON.stringify(books));
};
