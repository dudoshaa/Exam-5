import { desserts } from "./data.js";
import formatNumber from "./formatNumber.js";

const dessertsList = document.getElementById("desserts-list");
const template = document.querySelector("template");
const cartList = document.querySelector(".card-list");
const emptyImg = document.querySelector(".card-right-image");

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(dessert, qty = 1) {
  const item = cart.find((c) => c.id === dessert.id);
  item ? (item.qty += qty) : cart.push({ ...dessert, qty });
  if (item && item.qty <= 0) cart = cart.filter((c) => c.id !== dessert.id);
  saveCart();
  renderCart();
  syncGridCard(dessert.id);
}

desserts.forEach((dessert) => {
  const clone = template.content.cloneNode(true);
  const li = clone.querySelector(".dessert-item");
  li.dataset.id = dessert.id;

  const imgEl = clone.querySelector(".dessert-image");
  const addBtn = clone.querySelector(".dessert-btn");
  const panel = clone.querySelector(".dessert-btn-add");
  const amountSpan = clone.querySelector(".amount");
  const plusBtn = clone.querySelector(".btn-add-amount");
  const minusBtn = clone.querySelector(".btn-remove-amount");

  clone.querySelector(".dessert-title").textContent = dessert.title;
  clone.querySelector(".dessert-desc").textContent = dessert.description;
  clone.querySelector(".dessert-price").textContent = `$${formatNumber(
    dessert.price
  )}`;
  imgEl.src = dessert.images[0];

  const stored = cart.find((c) => c.id === dessert.id);
  if (stored) {
    addBtn.classList.add("hidden");
    panel.classList.remove("hidden");
    amountSpan.textContent = stored.qty;
    imgEl.classList.add("border-red");
  }

  addBtn.addEventListener("click", () => {
    addToCart(dessert, 1);
  });

  plusBtn.addEventListener("click", () => addToCart(dessert, 1));

  minusBtn.addEventListener("click", () => addToCart(dessert, -1));

  dessertsList.appendChild(clone);
});

function renderCart() {
  cartList.innerHTML = "";

  if (!cart.length) {
    emptyImg.style.display = "block";
    return;
  }
  emptyImg.style.display = "none";

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "card-item";
    row.innerHTML = `
      <div class="card-item__left">
        <h3 class="dessert-name">${item.title}</h3>
        <div class="card-item__bottom">
          <span class="cart-item__quantity">${item.qty}x</span>
          <span class="cart-item__price"> @$${formatNumber(item.price)}</span>
          <span class="cart-item__total">$${formatNumber(
            item.qty * item.price
          )}</span>
        </div>
      </div>
      <button class="remover-btn" data-id="${item.id}"> <span
                        ><svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 1.25C5.125 1.25 1.25 5.125 1.25 10C1.25 14.875 5.125 18.75 10 18.75C14.875 18.75 18.75 14.875 18.75 10C18.75 5.125 14.875 1.25 10 1.25ZM10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5Z"
                            fill="#AD8A85"
                          />
                          <path
                            d="M13.375 14.375L10 11L6.625 14.375L5.625 13.375L9 10L5.625 6.625L6.625 5.625L10 9L13.375 5.625L14.375 6.625L11 10L14.375 13.375L13.375 14.375Z"
                            fill="#AD8A85"
                          />
                        </svg>
                      </span></button>
    `;
    cartList.appendChild(row);
  });
}

cartList.addEventListener("click", (e) => {
  const del = e.target.closest(".remover-btn");
  if (!del) return;
  const id = +del.dataset.id;
  const item = cart.find((c) => c.id === id);
  addToCart(item, -item.qty);
});

function syncGridCard(id) {
  const li = dessertsList.querySelector(`.dessert-item[data-id="${id}"]`);
  if (!li) return;

  const addBtn = li.querySelector(".dessert-btn");
  const panel = li.querySelector(".dessert-btn-add");
  const amountSpan = li.querySelector(".amount");
  const imgEl = li.querySelector(".dessert-image");

  const item = cart.find((c) => c.id === id);

  if (item) {
    addBtn.classList.add("hidden");
    panel.classList.remove("hidden");
    amountSpan.textContent = item.qty;
    imgEl.classList.add("border-red");
  } else {
    addBtn.classList.remove("hidden");
    panel.classList.add("hidden");
    imgEl.classList.remove("border-red");
  }
}

renderCart();
