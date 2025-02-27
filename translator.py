from googletrans import Translator, LANGUAGES

def translate_text():
    translator = Translator()

    print("Welcome to the Language Translator!")
    text = input("Enter the text to translate: ").strip()

    if not text:
        print("Error: No text entered. Please enter some text to translate.")
        return

    print("\nAvailable languages:")
    for code, language in LANGUAGES.items():
        print(f"{code}: {language}")

    target_language = input("\nEnter the target language code (e.g., 'es' for Spanish, 'fr' for French): ").strip().lower()

    if target_language not in LANGUAGES:
        print("Error: Invalid language code. Please try again.")
        return

    try:
        translated = translator.translate(text, dest=target_language)
        print(f"\nTranslated Text: {translated.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ =french= "__main__":
    translate_text()

