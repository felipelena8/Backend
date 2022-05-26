
const socket = io();
const nameElement = document.getElementById("name");
const priceElement = document.getElementById("price");
const imageElement = document.getElementById("image");
const btnElement = document.getElementById("btn");
const tableBody = document.getElementById("tableBody");
const emailInput = document.getElementById("emailInput");
const sendEmail = document.getElementById("sendEmail");
const inputMessage = document.getElementById("inputMessage");
const sendMessage = document.getElementById("sendMessage");
const chat = document.getElementById("chat");
let usuario = "";

btnElement.addEventListener("click", () => {
  if (
    nameElement.value == "" ||
    priceElement.value == "" ||
    imageElement.value == ""
  ) {
    alert("Debes llenar todos los campos");
  } else {
    let producto = {
      title: nameElement.value,
      price: priceElement.value,
      thumbnail: imageElement.value,
    };
    socket.emit("producto", producto);
  }
});
const enviarMail = () => {
  emailInput.disabled = true;
  sendEmail.disabled = true;
  usuario = emailInput.value;
  return false;
};
socket.on("listProductos", (prods) => {
  tableBody.innerHTML =
    "<tr><td>Nombre</td> <td>Precio</td><td>Foto</td></tr>" +
    prods
      .map(
        (prod) => `
    <tr>
    <td>${prod.title}</td>
    <td>$${prod.price}</td>
    <td><img src="${prod.thumbnail}"></td>
  </tr>
  `
      )
      .join("");
});
sendMessage.addEventListener("click", () => {
  let message = inputMessage.value;
  if (message != "" && usuario != "") {
    socket.emit("newMessage", {usuario, message});
  }
});
socket.on("message", (message) => {
  const now = new Date();
  chat.innerHTML += `<div class="message">
    <p><span class="userMessage">${message.usuario}</span> [<span class="timeMessage">${now.getDay()}/${now.getMonth()}/${now.getFullYear()}
    ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}</span>]: <span class="textMessage">${message.message}</span></span></p>
    </div>`;
});
socket.on("listMessages", (messages) => {
    const now = new Date();
  chat.innerHTML = messages
    .map(
      (message) => `<div class="message">
<p><span class="userMessage">${message.usuario}</span> [<span class="timeMessage">${now.getDay()}/${now.getMonth()}/${now.getFullYear()}${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}</span>]: <span class="textMessage">${message.message}</span></span></p>
</div>`
    )
    .join("");
});
