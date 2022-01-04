const textBox = document.getElementById("textBox");
const button = document.getElementById("enviar");
const chat = document.getElementById("chat");

localStorage.setItem("id", "1");

button.addEventListener("click", () => {
    const msg = textBox.value;

    if (textBox.value !== "") {
        createMsg("self", msg);
        navigator.serviceWorker.ready.then(response => response.active.postMessage(msg));
    }

    textBox.value = "";
});

navigator.serviceWorker.register("./worker.js");

navigator.serviceWorker.addEventListener("message", (msg) => {
    createMsg("other", msg.data);
});

function createMsg(person, msg) {
    let id = parseInt(localStorage.getItem("id"));
    let msgBox = document.createElement("div");
    msgBox.id = `msg${id}`;
    msgBox.classList.add(person, "mb-3", "p-2");
    msgBox.append(msg);
    chat.appendChild(msgBox);
    id++;
    localStorage.setItem("id", id.toString());
}

window.addEventListener("load", () => {
    navigator.serviceWorker.ready.then(response => {
        response.active.postMessage("REGISTRAR");
    });
})