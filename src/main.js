const lengthSlider = document.getElementById("charLenSlider");
const charCount = document.getElementById("charCount");

const UPPER_CASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER_CASE_LETTERS = "abcdefghijklmnopqrstuvqxyz";
const NUMBERS = "0123456789";
const symbols = "!@#$%^&*()_+";

var password = " ";

// 2. Create a function to generate an uppercase random password of given length
function passwordGenerator(length, hasLower, hasUpper), {
  console.log(length);
  for (let i = 0; i < 10; i++) {
    password += UPPER_CASE_LETTERS.charAt(
      Math.floor(Math.random() * UPPER_CASE_LETTERS.length)
    );
  }
  console.log(password);
}

passwordGenerator((length = 10), (hasUpper = true), (hasLower = true));

// 3. Modify function to have lower case letters

// 4. Modify function to have numbers

// 5. Modify function to have symbols.

// 6. Trigger the input from user

// 7. Tigger the modifications from user

// 8. Update the Srength meter

// 9. Update the output element

// 10. Allow users to copy the password

// 11. Display password copied message

/*================================================================================================================
 Handle the slider
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
};

/*================================================================================================================
 Event Listeners
 *==============================================================================================================*/

lengthSlider.addEventListener("input", handleSliderInput);
