const navbarBrand = document.getElementById("navBrand"); // link with navBrand id
const myNameArray = ["H", "a", "r", "r", "y","'s"," ","M","u","s","e","u","m"]; // an array of letters to be displayed in the navbar

let index = 0; // Initialize the current index to 0

function addAnimation() {
    const name = document.createElement('span'); // Create a span element
    name.classList.add("fs-2", "fw-bolder"); // add class fs-2 and fw-bolder for font size and bold font weight.

    // Determine the color class based on the current index
    if (index == 0 || index == 1 || index == 7 || index == 8) {
        name.classList.add("heading-red"); // add class heading-red for red color.
    } 
    
    else if (index == 4 || index == 5 || index == 11 || index == 12) {
        name.classList.add("heading-green"); // add class heading-green for green color.
    } 
    
    else {
        name.classList.add("text-info"); // add class text-info for blue color.
    }

    name.textContent = myNameArray[index]; // display the letter at the current index

    navbarBrand.appendChild(name); // Append the span element to the navbarBrand

    index++; // Increment the current index for the next letter

    if (index == array.length) {
        clearInterval(animationInterval); // Stop the animation when all letters are added
    }
}

const animationInterval = setInterval(addAnimation, 100); // Call the addAnimation function every 100 milliseconds, loop


/* Form validation */

(function () {
    'use strict'

    // Fetch all the elements with class name "needs-validation"
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms) // Convert the NodeList of elements with class name "needs-validation" to an array
        .forEach(function (form) { // Loop over them and prevent submission
            form.addEventListener('submit', function (event) { // Add a submit event listener to each form. 
                // runs the function when the form is submitted because of "submit" event
                if (!form.checkValidity()) { // If the form is invalid, prevent submission
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated'); // Add the class "was-validated" to the form
            }, false)
        })
})

(); // recalling the function