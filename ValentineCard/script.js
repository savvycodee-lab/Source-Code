const form = document.querySelector(".input-form");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const createButton = document.getElementById("createButton");
const goBackButton = document.getElementById("goBack");

createButton.addEventListener("click", () => {
	const name = nameInput.value.trim();
	const message = messageInput.value.trim();

	if (name && message) {
		form.classList.add("hidden");
		envelope.classList.remove("hidden");
		envelope.classList.add("show");
		goBackButton.classList.remove("hidden");
		goBackButton.classList.add("show");

		letter.innerHTML = `
          <p>Dear ${name},</p>
          <p>${message}</p>
          <p style="margin-top: 20px;">With love,<br>Your Valentine</p>
        `;
	} else {
		alert("Please fill in both name and message fields.");
	}
});

let isOpen = false;
envelope.addEventListener("click", () => {
	isOpen = !isOpen;
	envelope.classList.toggle("active");

	if (!isOpen) {
		letter.style.transition = "all 0.5s ease";
		letter.style.transform = "translateY(0)";
		letter.style.visibility = "hidden";
		letter.style.opacity = "0";
		letter.style.zIndex = "3";
	}
});

goBackButton.addEventListener("click", () => {
	form.classList.remove("hidden");
	envelope.classList.remove("show");
	envelope.classList.add("hidden");
	goBackButton.classList.remove("show");
	goBackButton.classList.add("hidden");
	nameInput.value = "";
	messageInput.value = "";
	isOpen = false;
	envelope.classList.remove("active");
	letter.style.visibility = "hidden";
	letter.style.opacity = "0";
	letter.style.transform = "translateY(0)";
	letter.style.zIndex = "3";
});
