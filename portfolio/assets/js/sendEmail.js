const senderName = document.getElementById("name");
const senderEmail = document.getElementById("email");
const senderSubject = document.getElementById("subject");
const senderMessage = document.getElementById("senderMessage");
const messageForm = document.querySelector(".node-email-form");
const submitEmailButton = document.getElementById("submitEmail");
const toastBody = document.getElementsByClassName("toast-body")[0];

toastBody.addEventListener("click", () => {
  toastBody.classList.remove("active");
  toastBody.classList.remove("success");
  toastBody.classList.remove("error");
});

submitEmailButton.addEventListener("click", async () => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    submitEmailButton.disabled = true;

    if (!senderName.value.length > 0) {
      toastBody.classList.add("error");
      toastBody.classList.add("active");
      senderName.classList.add("error");
      toastBody.innerHTML = "Please type your name";
      return null;
    }

    if (!senderEmail.value.length > 0 || !emailRegex.test(senderEmail.value)) {
      toastBody.classList.add("error");
      toastBody.classList.add("active");
      senderEmail.classList.add("error");
      toastBody.innerHTML = "Please type the correct email format";
      return null;
    }

    if (!senderSubject.value.length > 0) {
      toastBody.classList.add("error");
      toastBody.classList.add("active");
      senderSubject.classList.add("error");
      toastBody.innerHTML = "Please type your subject";
      return null;
    }

    if (!senderMessage.value.length > 0) {
      toastBody.classList.add("error");
      toastBody.classList.add("active");
      senderMessage.classList.add("error");
      toastBody.innerHTML = "Please type your subject";
      return null;
    }

    const formData = new FormData();

    formData.append("name", senderName.value);
    formData.append("email", senderEmail.value);
    formData.append("subject", senderSubject.value);
    formData.append("message", senderMessage.value);

    const result = await fetch("https://formspree.io/f/xnqrygov", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (result.ok) {
      toastBody.classList.add("success");
      toastBody.classList.add("active");
      toastBody.innerHTML = "Thanks for your submission!";
      submitEmailButton.disabled = false;
      messageForm.reset();
    } else {
      const jsonResult = await result.json();
      if (Object.hasOwn(jsonResult, 'errors')) {
        toastBody.innerHTML = jsonResult["errors"].map(error => error["message"]).join(", ")
      } else {
        toastBody.innerHTML = "Oops! There was a problem submitting your form"
      }
      submitEmailButton.disabled = false;
    }
  } catch (err) {
    console.error("error happened on sending email", err);
    submitEmailButton.disabled = false;
    toastBody.classList.add("error");
    toastBody.innerHTML =
      "something went wrong \n please send direct message through your email";
  }
});

senderName.addEventListener("click", () => {
  senderName.classList.remove("error");
  submitEmailButton.disabled = false;
});

senderEmail.addEventListener("click", () => {
  senderEmail.classList.remove("error");
  submitEmailButton.disabled = false;
});

senderSubject.addEventListener("click", () => {
  senderSubject.classList.remove("error");
  submitEmailButton.disabled = false;
});

senderMessage.addEventListener("click", () => {
  senderMessage.classList.remove("error");
  submitEmailButton.disabled = false;
});
