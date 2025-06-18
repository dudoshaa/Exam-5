import { desserts } from "./data.js";
import formatNumber from "./formatNumber.js";

const dessertsList = document.getElementById("desserts-list");
const template = document.querySelector("template");

desserts.forEach((dessert) => {
  const clone = template.content.cloneNode(true);

  const { title, description, images, price } = dessert;

  const dessertName = clone.querySelector(".dessert-name");
  const cartQuantity = clone.querySelector(".cart-item__quantity");
  const cardPrice = clone.querySelector(".cart-item__price");
  const cartTotal=clone.querySelector(".cart-item__total")

  
    




  const dessertImage = clone.querySelector(".dessert-image");
  const dessertTitle = clone.querySelector(".dessert-title");
  const dessertDesc = clone.querySelector(".dessert-desc");
  const dessertPrice = clone.querySelector(".dessert-price");
  const dessertBtnAdd = clone.querySelector(".dessert-btn-add");
  const dessertBtn = clone.querySelector(".dessert-btn");
  const btnRemoveAmount = clone.querySelector(".btn-remove-amount");
  const amount = clone.querySelector(".amount");
  const cardList=clone.querySelector(".card-list")

  dessertBtn.addEventListener("click", () => {    
    dessertBtn.classList.add("hidden");
    dessertBtnAdd.classList.remove("hidden");
    dessertImage.classList.add("border-red");
  });

  

  let counter = 1;
  amount.textContent = counter;

  const btnAddAmount = clone.querySelector(".btn-add-amount");

  btnAddAmount.addEventListener("click", () => {
    counter++;
    amount.textContent = counter;
  });


  
  btnRemoveAmount.addEventListener("click", () => {
    counter--;
    if (counter <= 0) {
      counter = 0;
      dessertBtnAdd.classList.add("hidden");
      dessertBtn.classList.remove("hidden");
      dessertImage.classList.remove("border-red");
    } else {
      amount.textContent = counter;
    }
  });

  dessertImage.src = images;
  dessertTitle.textContent = title;
  dessertDesc.textContent = description;
  dessertPrice.textContent = formatNumber(price);
  dessertsList.appendChild(clone);
});
