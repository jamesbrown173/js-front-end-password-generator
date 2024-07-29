const lengthSlider = document.getElementById("charLenSlider");
const charCount = document.getElementById("charCount");
const passwordOutput = document.getElementById("passwordOutput");
const strengthIndicator = document.getElementsByClassName("strengthIndicator");
const generateButton = document.getElementById("generateButton");
const upperCaseCheckBox = document.getElementById("upperCheckbox");
const lowerCaseCheckBox = document.getElementById("lowerCheckbox");
const numbersCheckBox = document.getElementById("numbersCheckbox");
const symbolsCheckBox = document.getElementById("symbolsCheckbox");
const checkBoxes = document.getElementsByClassName("checkBox");
const copyButton = document.getElementById("copyIcon");
const passwordCopiedNotification = document.getElementById(
  "passCopiedNotifcation"
);

/*================================================================================================================
Constants and Variables
 *==============================================================================================================*/

const UPPER_CASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER_CASE_LETTERS = "abcdefghijklmnopqrstuvqxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+";

var password = " ";
var strength = 0;
var passLength = 5;
var useUpper = false;
var useLower = false;
var useNumbers = false;
var useSymbosl = false;

/*================================================================================================================
 Generated the password and Update the password + strength elements
 *==============================================================================================================*/

function generatePassword(length, hasUpper, hasLower, hasNumbers, hasSymbols) {
  if (
    useUpper == false &&
    useLower == false &&
    useNumbers == false &&
    useSymbosl == false
  ) {
    window.alert("Please select password conditions");
    return 0;
  }

  password = "";
  let countOfTrueArgs = 0;
  if (hasUpper == true) countOfTrueArgs += 1;
  if (hasLower == true) countOfTrueArgs += 1;
  if (hasNumbers == true) countOfTrueArgs += 1;
  if (hasSymbols == true) countOfTrueArgs += 1;

  // Gets the length / num of args to know how many chars needed
  let numOfRequestedCharsEach = length / countOfTrueArgs;

  if (hasUpper == true) {
    for (let i = 0; i < numOfRequestedCharsEach; i++) {
      password += UPPER_CASE_LETTERS.charAt(
        Math.floor(Math.random() * UPPER_CASE_LETTERS.length)
      );
    }
  }

  if (hasLower == true) {
    for (let i = 0; i < numOfRequestedCharsEach; i++) {
      password += LOWER_CASE_LETTERS.charAt(
        Math.floor(Math.random() * LOWER_CASE_LETTERS.length)
      );
    }
  }

  if (hasNumbers == true) {
    for (let i = 0; i < numOfRequestedCharsEach; i++) {
      password += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
    }
  }

  if (hasSymbols == true) {
    for (let i = 0; i < numOfRequestedCharsEach; i++) {
      password += SYMBOLS.charAt(Math.floor(Math.random() * SYMBOLS.length));
    }
  }

  // Randomize the password output
  let passwordChars = password.split("");
  passwordChars.sort(() => 0.5 - Math.random());
  let passwordRandom = passwordChars.join("");

  // Check the length

  // Ensure the password is the correct length
  if (passwordRandom.length > length) {
    passwordRandom = passwordRandom.slice(0, length);
  } else {
    let allChars = (
      UPPER_CASE_LETTERS +
      LOWER_CASE_LETTERS +
      NUMBERS +
      SYMBOLS
    ).split("");
    while (passwordRandom.length < length) {
      passwordRandom += allChars[Math.floor(Math.random() * allChars.length)];
    }
  }

  // Update the output element
  passwordOutput.innerText = passwordRandom;
  passwordOutput.classList.add("text-white");
}

/*================================================================================================================
 Mainly for Styling the slider
 *==============================================================================================================*/

const getSliderVal = () => {
  charCount.textContent = lengthSlider.value;
};

const styleRangeSlider = () => {
  const min = lengthSlider.min;
  const max = lengthSlider.max;
  const val = lengthSlider.value;

  lengthSlider.style.backgroundSize =
    ((val - min) * 100) / (max - min) + "% 100%";
};

const handleSliderInput = () => {
  getSliderVal();
  styleRangeSlider();
  passLength = lengthSlider.value;
};

/*================================================================================================================
Handle User Inputs
*==============================================================================================================*/

for (i = 0; i < checkBoxes.length; i++) {
  checkBoxes[i].addEventListener("change", updateStengthMeter);
}

upperCaseCheckBox.addEventListener("change", function () {
  if (this.checked) {
    useUpper = true;
    strength += 1;
    updateStengthMeter();
  } else {
    useUpper = false;
    strength -= 1;
    updateStengthMeter();
  }
});

lowerCaseCheckBox.addEventListener("change", function () {
  if (this.checked) {
    useLower = true;
    strength += 1;
  } else {
    useLower = false;
    strength -= 1;
  }
});
numbersCheckBox.addEventListener("change", function () {
  if (this.checked) {
    useNumbers = true;
    strength += 1;
  } else {
    useNumbers = false;
    strength -= 1;
  }
});
symbolsCheckBox.addEventListener("change", function () {
  if (this.checked) {
    useSymbosl = true;
    strength += 1;
  } else {
    useSymbosl = false;
    strength -= 1;
  }
});
lengthSlider.addEventListener("input", handleSliderInput);
generateButton.addEventListener("click", function () {
  generatePassword(
    (length = passLength),
    (hasUpper = useUpper),
    (hasLower = useLower),
    (hasNumbers = useNumbers),
    (hasSymbols = useSymbosl)
  );
});

function updateStengthMeter() {
  for (i = 0; i < strengthIndicator.length; i++) {
    strengthIndicator[i].classList.remove("bg-yellow-400");
  }
  for (i = 0; i < strength; i++) {
    strengthIndicator[i].classList.add("bg-yellow-400");
  }
}

/*================================================================================================================
Copy the password to clip board and display success message
*==============================================================================================================*/

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(passwordOutput.textContent);
    window.alert("Password copied! 🤗");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
});
