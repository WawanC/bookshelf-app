const modalEl = document.getElementById("modal");
const tambahBukuBtn = document.getElementById("tambahBuku");
const modalBackdropEl = document.getElementById("modalBackdrop");

tambahBukuBtn.addEventListener("click", () => {
  modalEl.classList.toggle("tampil");
});

modalBackdropEl.addEventListener("click", (ev) => {
  ev.stopPropagation();
  modalEl.classList.toggle("tampil");
});
