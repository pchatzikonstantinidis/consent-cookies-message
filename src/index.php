<?php
session_start();

// Set default language to English
$lang = 'en';

// Check if a language is set in the URL or in the session
if (isset($_GET['lang'])) {
    $lang = $_GET['lang'];
    $_SESSION['lang'] = $lang;
} elseif (isset($_SESSION['lang'])) {
    $lang = $_SESSION['lang'];
}

// Load the appropriate language file
$lang_file = __DIR__ . "/locales/{$lang}.json";
if (!file_exists($lang_file)) {
    $lang_file = __DIR__ . "/locales/en.json"; // Fallback to English if the file doesn't exist
}
$translations = json_decode(file_get_contents($lang_file), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    die("Error loading translations. Please try again later.");
}
?>
<!DOCTYPE html>
<html lang="<?php echo htmlspecialchars($lang); ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cookie Consent</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>

    <div id="cookie-consent" class="cookie-consent">
        <p id="consent-message"><?php echo htmlspecialchars($translations['cookieConsent']['message']); ?></p>
        <div class="consent-buttons">
            <button id="accept-cookies" class="consent-button"><?php echo htmlspecialchars($translations['cookieConsent']['acceptButton']); ?></button>
            <button id="reject-cookies" class="consent-button reject"><?php echo htmlspecialchars($translations['cookieConsent']['rejectButton']); ?></button>
            <button id="learn-more" class="consent-button learn-more"><?php echo htmlspecialchars($translations['cookieConsent']['learnMore']); ?></button>
        </div>
        <div class="language-selector">
            <a href="?lang=en" id="lang-en" class="lang-button">English</a>
            <a href="?lang=el" id="lang-el" class="lang-button">Ελληνικά</a>
        </div>
    </div>

    <!-- Modal for Learn More -->
    <div id="learn-more-modal" class="modal">
        <div class="modal-content">
            <span id="close-modal" class="close">&times;</span>
            <div id="full-policy"><?php echo $translations['cookieConsent']['fullPolicy']; ?></div>
        </div>
    </div>

    <script src="scripts/app.js"></script>
</body>

</html>