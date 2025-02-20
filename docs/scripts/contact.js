document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("J3rtyUu3ZYSfpeqUR");
});

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message").value.trim();
    let statusMessage = document.getElementById("status-message");
    let submitButton = event.target.querySelector("button");

    // Disable button during submission
    submitButton.disabled = true;
    submitButton.textContent = "გაგზავნა...";

    // Simple validation
    if (name === "" || email === "" || message === ""  || phone === "") {
        statusMessage.textContent = "გთხოვთ შეავსეთ ყველა ველი.";
        statusMessage.style.color = "red";
        submitButton.disabled = false;
        submitButton.textContent = "შეტყობინების გაგზავნა";
        return;
    }

    if (!validateEmail(email)) {
        statusMessage.textContent = "გთხოვთ შეიყვანეთ სწორი მეილი.";
        statusMessage.style.color = "red";
        submitButton.disabled = false;
        submitButton.textContent = "შეტყობინების გაგზავნა";
        return;
    }

    if (!validatePhoneNumber(phone)) {
        statusMessage.textContent = "გთხოვთ შეიყვანეთ სწორი ნომერი.";
        statusMessage.style.color = "red";
        submitButton.disabled = false;
        submitButton.textContent = "შეტყობინების გაგზავნა";
        return;
    }

    // Send email using EmailJS
    emailjs.send("service_dkkqdps", "template_bd0fclk", {
        user_name: name,
        user_email: email,
        user_message: message,
        user_phone: phone
    }).then(function (response) {
        statusMessage.textContent = "შეტყობინება წარმატებით გაიგზავნა, მალე გიპასუხებთ!";
        statusMessage.style.color = "green";
        document.getElementById("contact-form").reset();

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = "შეტყობინების გაგზავნა";
    }).catch(function (error) {
        console.error("EmailJS Error:", error);
        statusMessage.textContent = "შეტყობინება ვერ გაიგზავნა, სცადეთ თავიდან.";
        statusMessage.style.color = "red";

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = "შეტყობინების გაგზავნა";
    });
});

// Function to validate email
function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to validate phone number
function validatePhoneNumber(phoneNumber) {
    const regex = /^(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{1,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}$/;
    return regex.test(phoneNumber);
}