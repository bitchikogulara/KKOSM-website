document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("J3rtyUu3ZYSfpeqUR"); // Public Key (Consider keeping this secure)
});

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let statusMessage = document.getElementById("status-message");
    let submitButton = event.target.querySelector("button");

    // Disable button during submission
    submitButton.disabled = true;
    submitButton.textContent = "გაგზავნა...";

    // Simple validation
    if (name === "" || email === "" || message === "") {
        statusMessage.textContent = "გთხოვთ შეავსეთ ყველა ველი.";
        statusMessage.style.color = "red";
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
        return;
    }

    if (!validateEmail(email)) {
        statusMessage.textContent = "გთხოვთ შეიყვანეთ სწორი მეილი.";
        statusMessage.style.color = "red";
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
        return;
    }

    // Send email using EmailJS
    emailjs.send("service_dkkqdps", "template_bd0fclk", {
        user_name: name,
        user_email: email,
        user_message: message
    }).then(function (response) {
        statusMessage.textContent = "შეტყობინება წარმატებით გაიგზავნა, მალე გიპასუხებთ!";
        statusMessage.style.color = "green";
        document.getElementById("contact-form").reset();

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }).catch(function (error) {
        console.error("EmailJS Error:", error);
        statusMessage.textContent = "შეტყობინება ვერ გაიგზავნა, სცადეთ თავიდან.";
        statusMessage.style.color = "red";

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    });
});

// Function to validate email
function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
