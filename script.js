const apiKey = "sTzyzMvH4sQo9vKKgHbHiwm9WX6dpLE0042TL7MJ";  // Replace with your actual Cohere API key
const apiUrl = "https://api.cohere.ai/v1/generate";

function askAI() {
    const question = document.getElementById("question").value.trim();
    const responseDiv = document.getElementById("response");

    if (!question) {
        alert("Please enter a question!");
        return;
    }

    responseDiv.innerHTML = "<strong>AI:</strong> Thinking... ⏳";

    const requestBody = {
        model: "command",  // Use "command" or "command-light"
        prompt: question,
        max_tokens: 200,   // Limit response length
        temperature: 0.7    // Adjust randomness (0 = predictable, 1 = creative)
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Full API Response:", data);  // Debugging

        if (data.generations && data.generations.length > 0) {
            responseDiv.innerHTML = `<strong>AI:</strong> ${data.generations[0].text}`;
        } else {
            responseDiv.innerHTML = "AI did not return a valid response.";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        responseDiv.innerHTML = "Error fetching response!";
    });
      }
