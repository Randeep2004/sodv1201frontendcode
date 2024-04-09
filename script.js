document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async (event) => {
        event.preventDefault();
       

        const formData = new FormData(registrationForm);
        const requestBody = Object.fromEntries(formData);

        try {
            const response = await fetch('https://sodv1201registration-backend.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Error registering user');
            }

            const data = await response.json();
            displayConfirmation(data);
            document.getElementById('registrationForm').style.display ="none";
        } catch (error) {
            console.error('Error:', error);
            // Handle error display or logging
        }
    });
});

function displayConfirmation(data) {
    const confirmationContainer = document.getElementById('confirmationContainer');

    if (confirmationContainer) {
        confirmationContainer.innerHTML = `
            <h2>Confirmation Notice</h2>
            <p>ID: ${data.id}</p>
            <p>Full Name: ${data.fullName}</p>
            <p>Address: ${data.address}</p>
            <p>Status: ${data.status}</p>
            <p>Fee: ${data.fee}</p>
        `;
        confirmationContainer.style.display = 'block';
    } else {
        console.error('Confirmation container not found or is null');
        // Handle the error (e.g., display a message to the user)
    }
}
