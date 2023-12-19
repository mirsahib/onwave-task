/*---------------------------------------------------------------------
    File Name: myScript.js
---------------------------------------------------------------------*/
$(function () {
    $(document).ready(function () {
        console.log("my script loaded");
        makeAPICall();
        handleRegistration();
        uploadFile();
        getUser();
    })

    function getUser() {
        const userId = localStorage.getItem("userId");
        console.log("🚀 ~ file: myScript.js:16 ~ getUser ~ userId:", userId);
        if (userId) {
            $.ajax({
                url: `http://localhost:3001/api/users/${userId}`,
                type: "GET",
                success: function (user) {
                    // Assuming the API response contains a 'name' property

                    // Display the user's name
                    $("#loginLink").hide();
                    $("#registerLink").hide();
                    $(".navbar-nav").append(
                        '<li class="nav-item"><span class="nav-link">' +
                            user.email +
                            "</span></li>"
                    );
                    
                },
                error: function (error) {
                    console.error("Error fetching user info:", error);
                },
            });
        }
    }

    function makeAPICall() {
        $.ajax({
            url: "http://numbersapi.com/1/30/date?json",
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log("🚀 ~ file: myScript.js:14 ~ data:", data);
                $("#api-response-text").text(data.text);
                $("#api-response-year").text(data.year);
            },
            error: function (error) {
                console.error("Error making API call:", error);
            },
        });
    }

    function handleRegistration() {
        $("#request").submit(function (event) {
            // Prevent the default form submission
            event.preventDefault();

            // Get form values
            var email = $("#email").val();
            console.log("🚀 ~ file: myScript.js:35 ~ email:", email);
            var password = $("#password").val();
            console.log("🚀 ~ file: myScript.js:37 ~ password:", password);

            // Create an object with the form data
            var formData = {
                email: email,
                password: password,
            };

            // Make AJAX POST call to the "/api/user" endpoint
            $.ajax({
                url: "http://localhost:3001/api/users",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function (response) {
                    console.log("API response:", response);
                    localStorage.setItem("userId", response.userId);
                    // Handle success, e.g., display a success message
                    alert("User registered successfully!");
                },
                error: function (error) {
                    console.error("Error making API call:", error);
                    // Handle error, e.g., display an error message
                    alert("Error registering user.");
                },
            });
        });
    }
    function uploadFile() {
        $("#upload").submit(function (event) {
            event.preventDefault();
            // Get the user ID from localStorage
            const userId = localStorage.getItem("userId");

            // Create a FormData object to store the file
            const formData = new FormData();
            const fileInput = $("#formFileLg")[0];
            if (!fileInput.files || fileInput.files.length === 0) {
                alert("Please select a file before submitting.");
                return;
            }

            formData.append("image", fileInput.files[0]);

            // Make the AJAX POST request
            $.ajax({
                url: `http://localhost:3001/api/users/upload/${userId}`,
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    console.log("File uploaded successfully:", response);
                    // Handle success, e.g., show a success message
                    alert("File uploaded successfully!");
                },
                error: function (error) {
                    console.error("Error uploading file:", error);
                    // Handle error, e.g., show an error message
                    alert("Error uploading file. Please try again.");
                },
            });
        });
    }

    
});
