document.getElementById('translate-btn').addEventListener('click', function() {
    const text = document.getElementById('text-to-translate').value;
    const targetLanguage = document.getElementById('language-selector').value;

    if (text.trim() === "") {
        alert("Please enter some text to translate.");
        return;
    }

    const apiKey = 'AIzaSyBnTZxz52RCSdW1DZRBqNeE9RkOV_Uy5Ks';  // Replace with your actual API key

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: text,
            target: targetLanguage,
            format: 'text'  // Ensure correct text format is passed
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.data && data.data.translations) {
            const translatedText = data.data.translations[0].translatedText;
            document.getElementById('translated-text').value = translatedText;

            // Save the translation to history
            saveToHistory(text, translatedText);

        } else {
            console.error("Unexpected API response:", data);
            alert("Translation failed. Check console for details.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Translation failed. Please check your API key and internet connection.");
    });
});

// Function to speak the translated text slowly
document.getElementById('speak-btn').addEventListener('click', function() {
    const translatedText = document.getElementById('translated-text').value;
    if (translatedText.trim() === "") {
        alert("No translated text to speak.");
        return;
    }

    const speech = new SpeechSynthesisUtterance(translatedText);
    speech.lang = document.getElementById('language-selector').value; // Use the target language for speech
    
    // Slow down the speech
    speech.rate = 0.7;  // 1 is the normal rate. Less than 1 makes it slower.

    window.speechSynthesis.speak(speech);
});

// Function to save translation to history
function saveToHistory(originalText, translatedText) {
    const history = JSON.parse(localStorage.getItem('translationHistory')) || [];
    history.push({ originalText, translatedText });
    if (history.length > 10) {
        history.shift(); // Keep only the last 10 translations
    }
    localStorage.setItem('translationHistory', JSON.stringify(history));
    updateHistoryList();
}

// Function to update the history list
function updateHistoryList() {
    const history = JSON.parse(localStorage.getItem('translationHistory')) || [];
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.originalText} → ${entry.translatedText}`;
        historyList.appendChild(listItem);
    });
}

// Function to clear the translation history
document.getElementById('clear-history-btn').addEventListener('click', function() {
    localStorage.removeItem('translationHistory'); // Clear history from localStorage
    updateHistoryList(); // Update the history list display
});

// Load history on page load
window.onload = function() {
    updateHistoryList();
};

