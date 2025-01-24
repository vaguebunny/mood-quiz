// JavaScript file for index.html (i.e., main page)

// Unresolved Issue?: Refreshing page does not reset localStorage.
//      This means that answers from prior to refreshing are saved,
//      and could trick user into submitting without filling
//      out all questions. Must use 'reset quiz' button to do so.

/* ### triple hash comments are irrelevant to functionality ### */
/* !!! triple bang comments are also irrelevant...but slightly more important !!! */


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
// resets all values in object 'completed' to 'false'
function reset_completed () {
    for (const key in completed) {  // for each key in object 'completed'
        completed[key] = false;     // set the key's respective value to 'false'
    }
}
// checks if passed argument is 'true'
function checkTrue(item) {
    return item; // 'item' is already a Boolean by default
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

// stores question number with score (i.e., onclick function for radio buttons)
function selected (radio) {
    const ques_num = radio.name; // ques_num is the 'name' property of the 'radio' button
    const score = answer_score(radio.value); // score is the numerical score
    done(ques_num); // marks question as answered
    update_completed_final(); // updates variable 'completed_final'

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

// submit button logic
const submit = document.querySelector('input[type="submit"]'); // selects Submit "button"
submit.addEventListener('click', submission); // activates when clicked

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

// !!! OBSELETE: formerly used in function 'submission' !!!
// // checks if any questions were unanswered
// function all_answered () {
//     return (localStorage.length >= question_count)
// }

// total number of questions
const question_count = 9;

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

// reset button logic
const reset = document.querySelector('.reset'); // selects Reset div button

reset.addEventListener('click', function () {
    reset_completed(); // resets all values in object 'completed' to 'false'
    completed_final = false; // means that not all questions have been answered
    localStorage.clear(); // clears localStorage
    location.reload(); // refreshes page
});




// BEN'S PLAYGROUND BELOW THIS LINE
//    (it shouldn't mess up functionality...i hope...)


// select 'prev' and 'next' buttons
// const prev = document.querySelector('#prev');
// const next = document.querySelector('#next');

// next.addEventListener('click', add_secret_question());
// prev.addEventListener('click', prev_click);
// next.addEventListener('click', next_click);

function prev_click (event) {
    event.stopPropagation();
    // reset.style.display = 'none';
    // reset.textContent = 'HIDE'
}

function next_click (event) {
    event.stopPropagation();
    add_secret_question();
    // reset.style.display = 'block';
    // reset.textContent = 'SHOW'
}

{/* <form id="ques10">
    <h3>Question here?</h3>
    <input type="radio" name="ques7" value="none" onclick="selected(this)">
    <label for="none">Not At All</label><br>
    <input type="radio" name="ques7" value="some" onclick="selected(this)">
    <label for="some">Several Days</label><br>
    <input type="radio" name="ques7" value="more" onclick="selected(this)">
    <label for="more">More Than Half the Days</label><br>
    <input type="radio" name="ques7" value="most" onclick="selected(this)">
    <label for="most">Nearly Every Day</label><br><br></br>
</form> */}

// adds secret 10th question
function add_secret_question () {
    // makes elements for ques10
    const body = document.querySelector('body');
    const q10_form = document.createElement('form');
    const q10_h3 = document.createElement('h3');

    const q10_input_none = document.createElement('input');
    const q10_label_none = document.createElement('label');
    const q10_br_none = document.createElement('br');

    const q10_input_some = document.createElement('input');
    const q10_label_some = document.createElement('label');
    const q10_br_some = document.createElement('br');

    const q10_input_more = document.createElement('input');
    const q10_label_more = document.createElement('label');
    const q10_br_more = document.createElement('br');
    
    const q10_input_most = document.createElement('input');
    const q10_label_most = document.createElement('label');
    const q10_br_most1 = document.createElement('br');
    const q10_br_most2 = document.createElement('br');

    // sets attributes for elements in ques10
    q10_form.setAttribute('id', 'ques10');

    // appends elements (i.e., puts ques10 together)
    body.appendChild(q10_form);
    q10_form.appendChild(q10_h3);
    q10_form.appendChild(q10_input_none);
    q10_form.appendChild(q10_label_none);
    q10_form.appendChild(q10_input_some);
    q10_form.appendChild(q10_label_some);
    q10_form.appendChild(q10_input_more);
    q10_form.appendChild(q10_label_more);
    q10_form.appendChild(q10_input_most);
    q10_form.appendChild(q10_label_most);

    // puts text content in elements
    q10_h3.textContent = 'Secret Question 10!!??';

    // places before submit
    const submit = document.querySelector('input[type=submit]');
    const submit_parent = submit.parentNode;
    submit_parent.insertBefore(q10_form, submit);

    // hides by default
    // q10_form.style.display = 'none';
}

// temporary: add element
function add_element () {
    const submit = document.querySelector('input[type=submit]');
    const submit_parent = submit.parentNode;
    const test_El = document.createElement('h1');
    test_El.textContent = 'ABCDEFGHI';
    submit_parent.insertBefore(test_El, submit);
}
