// separate JavaScript file for results.html (i.e., Results page)
// otherwise, using DOM (i.e., document) won't work

// gets total score from local storage
const total_score = localStorage.getItem('total_score');

// displays total score
const final_score = document.querySelector('#final_score');
final_score.textContent = `${total_score}`;

// creates variablee for depression level
let depression_level = '';

// determines depression level
if (total_score >= 1 && total_score <= 4) {
    depression_level = 'minimal_depression'; // score 1-4: minimal depression
} else if (total_score >= 5 && total_score <= 9) {
    depression_level = 'mild_depression'; // score 5-9: mild depression
} else if (total_score >= 10 && total_score <= 14) {
    depression_level = 'moderate_depression'; // score 10-14: moderate depression
} else if (total_score >= 15 && total_score <= 19) {
    depression_level = 'moderately_severe_depression'; // score 15-19: moderately severe depression
} else if (total_score >= 20 && total_score <= 27) {
    depression_level = 'severe_depression'; // score 20-27: severe depression
}
