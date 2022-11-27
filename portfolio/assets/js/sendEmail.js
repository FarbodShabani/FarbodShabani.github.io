const senderName = document.getElementById("name");
const senderEmail = document.getElementById("email");
const senderSubject = document.getElementById("subject");
const senderMessage = document.getElementById("senderMessage");
const submitEmailButton = document.getElementById("submitEmail");
const toastBody = document.getElementsByClassName("toast-body")[0];

toastBody.addEventListener("click", () => {
  toastBody.classList.remove("active");
  toastBody.classList.remove("success");
  toastBody.classList.remove("error");
});

console.log("toastBody", toastBody);

submitEmailButton.addEventListener("click", async () => {
  try {
    submitEmailButton.disabled = true;
    // const variables = {
    //   emailInput: {
    //     name: senderName.value,
    //     email: senderEmail.value,
    //     subject: senderSubject.value,
    //     message: senderMessage.value
    //   }
    // };
    // const emailMutationQuery = `
    //     mutation sendEmail($emailInput: EmailInputData!){
    //         sendEmail(EmailInput: $emailInput) {
    //             success
    //             message
    //           }
    //       }
    //       `;
    // const result = await fetch("http://localhost:2882/graphql", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     query: emailMutationQuery,
    //     variables
    //   }),
    // });
    // const convertedResult = await result.json();
    // const { success, message } = convertedResult?.data?.sendEmail;
    // if (success) {
    //   toastBody.classList.remove("error");
    //   toastBody.classList.add("success");
    // } else {
      //   toastBody.classList.remove("success");
      //   toastBody.classList.add("error");
      // }
        toastBody.classList.add("success");
    toastBody.classList.add("active");
    toastBody.innerHTML = message && message;
    submitEmailButton.disabled = false;
} catch (err) {
    console.error("error happened on sending email", err);
    submitEmailButton.disabled = false;
    toastBody.classList.add("error");
    toastBody.innerHTML = "something went wrong \n please send direct message through your email";
  }
});
