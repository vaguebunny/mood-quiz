// separate JavaScript file for results.html (i.e., Results page)
// otherwise, using DOM (i.e., document) won't work

// gets total score from local storage
const total_score = localStorage.getItem('total_score');

// displays total score
const final_score = document.querySelector('#final_score');
final_score.textContent = `${total_score}`;

// creates variable for depression level
let depression_level = '';

// determines depression level
rubric(total_score);

// displays depression severity
const mood_name = document.querySelector('#mood_name');
mood_name.textContent = depression_level;

// function for determining depression level
function rubric (score) {
    if (score >= 1 && score <= 4) {
        depression_level = 'minimal depression'; // score 1-4: minimal depression
    } else if (score >= 5 && score <= 9) {
        depression_level = 'mild depression'; // score 5-9: mild depression
    } else if (score >= 10 && score <= 14) {
        depression_level = 'moderate depression'; // score 10-14: moderate depression
    } else if (score >= 15 && score <= 19) {
        depression_level = 'moderately severe depression'; // score 15-19: moderately severe depression
    } else if (score >= 20 && score <= 27) {
        depression_level = 'severe depression'; // score 20-27: severe depression
    }
}

// logic for minimal depression
function min_dep () {
    return 0;
}

// logic for mild depression
function mild_dep () {
    return 0;
}

// logic for moderate depression
function mod_dep () {
    return 0;
}

// logic for moderately severe depression
function modsev_dep () {
    return 0;
}

// logic for severe depression
function sev_dep () {
    return 0;
}
