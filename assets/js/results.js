// separate JavaScript file for results.html (i.e., Results page)
// otherwise, using DOM (i.e., document) won't work

// gets total score from local storage
const total_score = localStorage.getItem('total_score');

// displays total score
const final_score = document.querySelector('#final_score');
final_score.textContent = `${total_score}`;

// creates variable for depression level
const depression_level = rubric(total_score);

// determines depression level
function rubric (score) {
    if (score >= 1 && score <= 4) {
        return 'minimal_depression'; // score 1-4: minimal depression
    } else if (score >= 5 && score <= 9) {
        return 'mild_depression'; // score 5-9: mild depression
    } else if (score >= 10 && score <= 14) {
        return 'moderate_depression'; // score 10-14: moderate depression
    } else if (score >= 15 && score <= 19) {
        return 'moderately_severe_depression'; // score 15-19: moderately severe depression
    } else if (score >= 20 && score <= 27) {
        return 'severe_depression'; // score 20-27: severe depression
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
