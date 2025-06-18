import { desserts } from "./data.js";
import formatNumber from "./formatNumber.js";


const dessertsList  = document.getElementById("desserts-list");
const template      = document.querySelector("template");
const cartList      = document.querySelector(".card-list");
const emptyImg      = document.querySelector(".card-right-image");
const orderTotalEl  = document.querySelector(".order-total p");
const orderBtn      = document.querySelector(".order-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveCart      = () => localStorage.setItem("cart", JSON.stringify(cart));
const cartTotal     = () => cart.reduce((s, i) => s + i.qty * i.price, 0);


function updateOrderTotal() {
  orderTotalEl.textContent = formatNumber(cartTotal());
}

function changeItemQty(dessert, delta) {
  const found = cart.find((i) => i.id === dessert.id);
  if (found) {
    found.qty += delta;
    if (found.qty <= 0) cart = cart.filter((i) => i.id !== dessert.id);
  } else if (delta > 0) {
    cart.push({ ...dessert, qty: delta });
  }
  saveCart();
  renderCart();
  syncProductCard(dessert.id);
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  desserts.forEach((d) => syncProductCard(d.id));
}

desserts.forEach((dessert) => {
  const node  = template.content.cloneNode(true);
  const li    = node.querySelector(".dessert-item");
  li.dataset.id = dessert.id;


  const img      = node.querySelector(".dessert-image");
  const addBtn   = node.querySelector(".dessert-btn");
  const qtyPane  = node.querySelector(".dessert-btn-add");
  const amountEl = node.querySelector(".amount");
  const plusBtn  = node.querySelector(".btn-add-amount");
  const minusBtn = node.querySelector(".btn-remove-amount");

 
  img.src = dessert.images[0];
  node.querySelector(".dessert-title").textContent = dessert.title;
  node.querySelector(".dessert-desc").textContent  = dessert.description;
  node.querySelector(".dessert-price").textContent = formatNumber(dessert.price);

  
  const stored = cart.find((i) => i.id === dessert.id);
  if (stored) {
    addBtn.classList.add("hidden");
    qtyPane.classList.remove("hidden");
    amountEl.textContent = stored.qty;
    img.classList.add("border-red");
  }


  addBtn .addEventListener("click", () => changeItemQty(dessert,  1));
  plusBtn.addEventListener("click", () => changeItemQty(dessert,  1));
  minusBtn.addEventListener("click", () => changeItemQty(dessert, -1));

  dessertsList.appendChild(node);
});


   
function renderCart() {
  cartList.innerHTML = "";

  if (!cart.length) {
    emptyImg.style.display = "block";
    updateOrderTotal();
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
          <span class="cart-item__price"> @${formatNumber(item.price)}</span>
          <span class="cart-item__total">${formatNumber(item.qty * item.price)}</span>
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
                      </span></button>`;
    cartList.appendChild(row);
  });

  updateOrderTotal();
}


cartList.addEventListener("click", (e) => {
  const btn = e.target.closest(".remover-btn");
  if (!btn) return;
  const id   = +btn.dataset.id;
  const item = cart.find((i) => i.id === id);
  if (item) changeItemQty(item, -item.qty);
});


function syncProductCard(id) {
  const li   = dessertsList.querySelector(`.dessert-item[data-id='${id}']`);
  if (!li) return;
  const addBtn   = li.querySelector(".dessert-btn");
  const qtyPane  = li.querySelector(".dessert-btn-add");
  const amountEl = li.querySelector(".amount");
  const img      = li.querySelector(".dessert-image");
  const item     = cart.find((i) => i.id === id);

  if (item) {
    addBtn.classList.add("hidden");
    qtyPane.classList.remove("hidden");
    amountEl.textContent = item.qty;
    img.classList.add("border-red");
  } else {
    addBtn.classList.remove("hidden");
    qtyPane.classList.add("hidden");
    img.classList.remove("border-red");
  }
}


orderBtn.addEventListener("click", () => {
  if (!cart.length) return alert("Your cart is empty!");
  alert(`Thank you! Your order total is ${formatNumber(cartTotal())}.`);
  clearCart();
});


renderCart();
