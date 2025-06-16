import { desserts } from "./data.js";
import formatNumber from "./formatNumber.js";

const dessertsList = document.getElementById("desserts-list");
const template = document.querySelector("template");

desserts.forEach((dessert) => {
  const clone = template.content.cloneNode(true);

  const { title, description, images, price } = dessert;

  const dessertImage = clone.querySelector(".dessert-image");
  const dessertTitle = clone.querySelector(".dessert-title");
  const dessertDesc = clone.querySelector(".dessert-desc");
  const dessertPrice = clone.querySelector(".dessert-price");

  dessertImage.src = images;
  dessertTitle.textContent = title;
  dessertDesc.textContent = description;
  dessertPrice.textContent = formatNumber(price);

  dessertsList.appendChild(clone);
});
