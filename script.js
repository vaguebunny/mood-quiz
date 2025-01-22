// JavaScript file for index.html (i.e., main page)
// Unresolved Issue: Refreshing page does not reset local storage.
//      This means that answers from prior to refreshing are saved,
//      and could trick user into submitting without filling
//      out all questions.

// total number of questions
const question_count = 9;

// stores question number with score (i.e., onclick function for radio buttons)
function selected (radio) {
    const ques_num = radio.name; // ques_num is the 'name' property of the 'radio' button
    const score = answer_score(radio.value); // score is the numerical score
    localStorage.setItem(ques_num, score); // store ques_num with score in local storage
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
    if (all_answered()) { // if all questions are answered
        calculate_total_score(); // calculate total score
        redirect_to_results(event); // go to Results page
    } else { // else if not all questions are answered
        const error_message = document.querySelector('#error_message');
        error_message.textContent = 'Please answer all questions'; // diaply error message
    }
}

// checks if any questions were unanswered
function all_answered () {
    return (localStorage.length >= question_count) // checks if number of items stored in local storage is less than actual number of questions
}

// calculates total score by adding up each question's score
function calculate_total_score () {
    let total_score = 0;
    // for each question in local storage, add score to total score
    for (let i = 1; i <= question_count; ++i) {
        total_score += Number(localStorage.getItem(`ques${i}`));
    }
    localStorage.setItem('total_score', total_score);
}

// redirects to Results page
function redirect_to_results (event) {
    event.preventDefault(); // prevents default, which is page refreshing
    location.assign('results.html'); // redirects to Results page
}

// reset button logic
const reset = document.querySelector('.reset'); // selects Reset div button

reset.addEventListener('click', function (event) {
    localStorage.clear(); // clears local storage
    location.reload(); // refreshes page
});


// temporary: test out secret 10th question
// activates when clicking 'next' button
const next = 

// adds secret 10th question
function add_secret_question () {
    const body = document.querySelector('body');
    const q10_form = document.createElement('form');
    const q10_h3 = document.createElement('h3');
    const q10_input_none = document.createElement('input');
    const q10_label_none = document.createElement('label');
    const q10_input_some = document.createElement('input');
    const q10_label_some = document.createElement('label');
    const q10_input_more = document.createElement('input');
    const q10_label_more = document.createElement('label');
    const q10_input_most = document.createElement('input');
    const q10_label_most = document.createElement('label');

    q10_h3.textContent = 'Secret Question 10!!??';
    
    body.appendChild(q10_form);
    q10_form.appendChild(q10_form);
    q10_form.appendChild(q10_h3);
    q10_form.appendChild(q10_input_none);
    q10_form.appendChild(q10_label_none);
    q10_form.appendChild(q10_input_some);
    q10_form.appendChild(q10_label_some);
    q10_form.appendChild(q10_input_more);
    q10_form.appendChild(q10_label_more);
    q10_form.appendChild(q10_input_most);
    q10_form.appendChild(q10_label_most);
}
