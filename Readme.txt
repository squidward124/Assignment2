COS10005 Web Development - Assignment 2
Plate & Place - Restaurant Discovery & Reservation
Author: Edward Morris
Student ID: 105663107
Semester 1, 2026


1. Website structure

assignment2/
  index.html          home page
  restaurants.html    listing of all six restaurants
  recommend.html      recommendation form + results area
  register.html       registration form
  reservation.html    reservation / booking form
  css/style.css       all the styling for every page
  js/script.js        all the JavaScript for every page
  images/             logo, hero image and one svg per restaurant
  Readme.txt          this file


2. GitHub repository

https://github.com/squidward124/Assignment2


3. JavaScript validation logic (plain English)

All the JavaScript is in one file, js/script.js. When a page loads,
the init() function at the bottom checks which form exists on the
current page (registerForm / reservationForm / recommendForm) and
attaches the right handler to its onsubmit.

If any check fails the function builds up an error string and shows
it in one alert() at the end, then returns false to stop the form
submitting. This is the pattern from the Week 9 lecture example.


3.1 Registration form

Each field is read with document.getElementById and checked in turn.

- Username: not empty, at least 5 characters, only letters, numbers
  or underscores.
- Email: not empty and matches a basic email pattern with a @ and
  a dot.
- Phone: not empty, digits only, between 8 and 15 long.
- Password: not empty, at least 10 characters, must contain at least
  one uppercase letter, one lowercase letter, one digit, and one
  non letter/digit "special" character.
- Confirm password: must match the password.
- Gender: one of the four radio buttons must be checked.
- Country: the dropdown must not be on the blank option.

If all checks pass I show a confirmation alert and reset the form.
The registration page has no real backend so it returns false either
way.


3.2 Reservation form

Same shape as the registration validator but with different rules.

- Full name, email, phone: required, email matches the email pattern,
  phone must be digits only and at least 10 long.
- Restaurant: must not be the blank "-- Choose a restaurant --"
  option.
- Date: required, and not earlier than today. I build today as a
  YYYY-MM-DD string (new Date, getFullYear, getMonth+1, getDate,
  padded to two digits) and compare with the date input value using
  a string compare, which works because YYYY-MM-DD sorts the same
  way alphabetically as it does by date.
- Time: required.
- Guests: not empty, is a number, and at least 1.
- Payment method: must pick Voucher or Online.
   * Voucher: voucher code box must not be empty (no check on the
     12 digits, the spec says it isn't required).
   * Online: card type must be picked, card number must be digits
     only, 15 digits for Amex or 16 digits for Visa / Mastercard.
- Billing email: only validated if the "Same as email" checkbox is
  NOT ticked. If it is ticked, the value was already copied across
  and locked by copyEmailToBilling().

If everything passes the validator returns true and the form
actually posts to the Mercury endpoint.


3.3 Recommendation form

Three radio groups (dietary preference, budget tier, dining
purpose). handleRecommend() reads each one by looking at every
radio in the group and seeing which one is .checked. If any group
is unanswered it alerts the user and stops.

For each of the six restaurants the function then runs three rules:

- Dietary: starts as true. If the user picked Vegan and the
  restaurant's restVegan[i] is false, the restaurant fails. Same for
  Halal. "No preference" doesn't filter anything.
- Budget: starts as false. Becomes true only if the restaurant's
  avgPrice falls inside the chosen tier (under 30, 30-50, 50-80,
  over 80).
- Purpose: starts as false. Becomes true if the user's choice
  matches the matching flag (restFamily[i], restDate[i],
  restBusiness[i]).

If all three are true I build a card for that restaurant by string
concatenation and add it to an html variable. After the loop I drop
the cards into the recommendation-results section with innerHTML.
Restaurants appear in the same order they sit in the data arrays.


3.4 Cross-page data

The reservation page accepts a ?restaurant=<id> parameter so it
can pre-select the dropdown when the user clicks a Reserve button
on the home page, restaurants page, or recommendation results.
getRestaurantFromURL() reads location.href and uses six small
match() regex checks (one per known restaurant id) to find the id.


3.5 Other small bits

- updateDeposit() runs whenever the restaurant dropdown changes.
  It uses findIndex() to find the position in the restaurant arrays,
  then writes the name and deposit into the display with innerHTML
  and into a hidden form field so the deposit travels to the server
  on submit.
- updatePaymentFields() shows the Voucher section or the Card
  section by swapping the "active" class on .payment-section divs.
- copyEmailToBilling() runs when the Same as email checkbox is
  clicked. It copies the contact email into the billing field and
  sets the readonly attribute so the user can't edit it; unticking
  removes the readonly.


4. Known limitations

- The reservation form posts to a Mercury PHP endpoint with my
  student id (105663107) hardcoded in the action attribute. The
  POST only does anything once the site is on Mercury.
- The registration page has no backend so nothing is actually
  saved when you register.
- The recommendation engine works on six restaurants; if no
  restaurants match all three rules the user sees a "no matches"
  message.
- Voucher codes are not checked for length or against any list.


5. References

All HTML, CSS and JavaScript code is original work for this
assignment. The restaurant illustrations in images/ are simple
SVG drawings I made by hand. No third-party libraries or stock
images are used.

Course material I referred to while writing this:
  Week 2 to 4 - HTML
  Week 4 to 6 - CSS and responsive design
  Week 7 to 9 - JavaScript and the DOM
