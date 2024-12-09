
// Update the sendButton event listener to use the backend
sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (!userMessage) return;

    // Display user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.textContent = `You: ${userMessage}`;
    messagesDiv.appendChild(userMessageDiv);

    // Clear input
    userInput.value = '';

    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.textContent = 'AI is typing...';
    messagesDiv.appendChild(typingDiv);

    try {
        // Call the backend server
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;

        // Remove typing indicator
        messagesDiv.removeChild(typingDiv);

        // Display AI message
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.textContent = `AI: ${aiMessage}`;
        messagesDiv.appendChild(aiMessageDiv);

    } catch (error) {
        // Remove typing indicator
        messagesDiv.removeChild(typingDiv);

        // Display error message
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Error: Unable to fetch AI response. Please try again later.';
        messagesDiv.appendChild(errorDiv);
    }

    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});