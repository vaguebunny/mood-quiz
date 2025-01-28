// JavaScript file for index.html (i.e., main page)

// Unresolved Issue?: Refreshing page does not reset localStorage.
//      This means that answers from prior to refreshing are saved,
//      and could trick user into submitting without filling
//      out all questions. Must use 'reset quiz' button to do so.

/* === triple equal comments split code into sections === */
/* ### triple hash comments are irrelevant to functionality ### */
/* !!! triple bang comments are also irrelevant...but slightly more important !!! */


/* === SETUP === */

// hides Question 10 by default
const question10 = document.querySelector('#question10');
question10.style.display = 'none';

// Boolean value, 'true' if all questions are answered
let completed_final = false;

// Boolean values, 'true' if question is answered
const completed = {
    q1_done: false,
    q2_done: false,
    q3_done: false,
    q4_done: false,
    q5_done: false,
    q6_done: false,
    q7_done: false,
    q8_done: false,
    q9_done: false,
};


/* === LOGIC FOR SELECTING AN ANSWER === */

// stores question number with score (i.e., onclick function for radio buttons)
function selected (radio) {
    const ques_num = radio.name; // ques_num is the 'name' property of the 'radio' button
    const score = answer_score(radio.value); // score is the numerical score
    done(ques_num); // marks question as answered
    update_completed_final(); // updates variable 'completed_final'
    reveal_ques10(); // shows Question 10 when all other questions have been answered

    // ### line below used to check value of 'completed_final' in localStorage  ###
    // ### comment/uncomment line below to disable/enable                      ###
    localStorage.setItem('completed_final', completed_final);

    // !!! don't comment line below !!!
    localStorage.setItem(ques_num, score); // store ques_num with score in localStorage

    // ### line below used to check if question is done in localStorage ###
    // ### comment/uncomment line below to disable/enable              ###
    localStorage.setItem(`done-${ques_num}`, true);
}

// returns score corresponding to anwser selected
function answer_score (value) {
    if (value === 'none') {
        return 0;
    } else if (value === 'some') {
        return 1;
    } else if (value === 'more') {
        return 2;
    } else if (value === 'most') {
        return 3;
    }
}

// changes Boolean values to 'true' if question is answered
function done (question) {
    if (question === 'ques1') {
        completed.q1_done = true;
    } else if (question === 'ques2') {
        completed.q2_done = true;
    } else if (question === 'ques3') {
        completed.q3_done = true;
    } else if (question === 'ques4') {
        completed.q4_done = true;
    } else if (question === 'ques5') {
        completed.q5_done = true;
    } else if (question === 'ques6') {
        completed.q6_done = true;
    } else if (question === 'ques7') {
        completed.q7_done = true;
    } else if (question === 'ques8') {
        completed.q8_done = true;
    } else if (question === 'ques9') {
        completed.q9_done = true;
    }
}

// updates variable 'completed_final', even if value doesn't change
function update_completed_final () {
    const completed_values = Object.values(completed)   // array of the values in object 'completed'
    let updated = false;                                // new Boolean variable, defaulted to 'false'
    updated = completed_values.every(checkTrue);        // checks if every element in 'completed_values' is 'true'
    completed_final = updated;                          // 'completed_final' is updated; either stays 'false', or turns and stays 'true'
    // ### line below used to check 'completed_values' in localStorage  ###
    // ### comment/uncomment line below to disable/enable               ###
    localStorage.setItem('comp_vals', completed_values);
}

// checks if passed argument is 'true'
function checkTrue(item) {
    return item; // 'item' is already a Boolean by default
}

// shows Question 10 when all other questions have been answered
function reveal_ques10 () {
    if (completed_final === true) {
        question10.style.display = 'block';
    }
}


/* === LOGIC FOR SUBMIT BUTTON === */

// setup
const submit = document.querySelector('input[type="submit"]'); // selects Submit "button"
submit.addEventListener('click', submission); // activates when clicked
const question_count = 9; // total number of questions

// submission logic
function submission (event) {
    event.preventDefault(); // prevents default, which is page refreshing
    // if (all_answered()) { // !!! OBSELETE: function 'all_answered' replaced with better logic system !!!
    if (completed_final === true) {
        calculate_total_score(); // calculate total score, and store in localStorage
        redirect_to_results(event); // go to Results page
    } else { // else if not all questions are answered
        const error_message = document.querySelector('#error_message');
        error_message.textContent = 'Please answer all questions'; // display error message
    }
}

// calculates total score by adding up each question's score
function calculate_total_score () {
    let total_score = 0; // used to keep track of total score
    for (let i = 1; i <= question_count; ++i) { // for each question in localStorage, add score to total score
        total_score += Number(localStorage.getItem(`ques${i}`)); // Number() used to convert this string into a number
    }
    localStorage.setItem('total_score', total_score); // store total score in localStorage
}

// redirects to Results page
function redirect_to_results (event) {
    event.preventDefault(); // prevents default, which is page refreshing
    location.assign('results.html'); // redirects to Results page
}


/* === LOGIC FOR RESET BUTTON === */

// reset button logic
const reset = document.querySelector('.reset'); // selects Reset div button

reset.addEventListener('click', function () {
    reset_completed(); // resets all values in object 'completed' to 'false'
    completed_final = false; // means that not all questions have been answered
    localStorage.clear(); // clears localStorage
    location.reload(); // refreshes page
});
// resets all values in object 'completed' to 'false'
function reset_completed () {
    for (const key in completed) {  // for each key in object 'completed'
        completed[key] = false;     // set the key's respective value to 'false'
    }
}
