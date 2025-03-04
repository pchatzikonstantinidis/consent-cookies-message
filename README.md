# Cookie Consent Project

This project is a simple implementation of a cookie consent banner with multi-language support. It includes HTML, CSS, JavaScript, and PHP files to handle the display and functionality of the cookie consent banner.

## Project Structure
README.md
src/
  ├── index.php
  ├── locales/
  │   ├── el.json
  │   └── en.json
  ├── scripts/
  │   └── app.js
  └── styles.css


### Files

- **README.md**: This file contains the documentation for the project.
- **src/index.php**: The main PHP file that handles the language selection and loads the appropriate translations.
- **src/locales/el.json**: Greek translations for the cookie consent banner.
- **src/locales/en.json**: English translations for the cookie consent banner.
- **src/scripts/app.js**: JavaScript file that handles the functionality of the cookie consent banner, including language selection and modal display.
- **src/styles.css**: CSS file that styles the cookie consent banner and modal.

## How It Works

1. **Language Selection**: The default language is set to English. The language can be changed by clicking on the language buttons in the banner. The selected language is stored in the session and local storage.
2. **Translations**: The appropriate translation file is loaded based on the selected language. If the translation file does not exist, it falls back to English.
3. **Cookie Consent**: The user's consent status is stored in local storage. If the user has not made a choice or the consent has expired, the banner is displayed.
4. **Modal**: The "Learn more" button opens a modal with the full cookie policy.

## Usage

1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    ```

2. **Navigate to the project directory**:
    ```sh
    cd consent-cookies-message
    ```

3. **Start a local PHP server**:
    ```sh
    php -S localhost:8000 -t src
    ```

4. **Open your browser and navigate to**:
    ```
    http://localhost:8000
    ```

## Customization

- **Adding New Languages**: To add a new language, create a new JSON file in the `src/locales` directory with the appropriate translations.
- **Styling**: Modify the `src/styles.css` file to change the appearance of the cookie consent banner and modal.

## License

This project is licensed under the MIT License.