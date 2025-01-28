// separate JavaScript file for results.html (i.e., Results page)
// otherwise, using DOM (i.e., document) won't work

// gets total score from local storage
const total_score = localStorage.getItem('total_score');

// displays total score
const display_total_score = document.querySelector('#display_total_score');
display_total_score.textContent = `${total_score}`;

// creates variable for depression level
let depression_level = '';

// determines depression level and CSS
rubric(total_score);

// displays depression severity
const mood_name = document.querySelector('#mood_name');
mood_name.textContent = depression_level;

// function for determining depression level and CSS
function rubric (score) {
    const result = document.querySelector('#result'); // selects result CSS link
    if (score == 0) {
        depression_level = 'no depression'; // score 0: no depression
        result.href = "./assets/css/result1.css"; // applies result1 CSS to HTML - blue theme
    } else if (score >= 1 && score <= 4) {
        depression_level = 'minimal depression'; // score 1-4: minimal depression
        result.href = "./assets/css/result1.css"; // applies result1 CSS to HTML - blue theme
    } else if (score >= 5 && score <= 9) {
        depression_level = 'mild depression'; // score 5-9: mild depression
        result.href = "./assets/css/result2.css"; // applies result2 CSS to HTML - green theme
    } else if (score >= 10 && score <= 14) {
        depression_level = 'moderate depression'; // score 10-14: moderate depression
        result.href = "./assets/css/result3.css"; // applies result3 CSS to HTML - yellow theme
    } else if (score >= 15 && score <= 19) {
        depression_level = 'moderately severe depression'; // score 15-19: moderately severe depression
        result.href = "./assets/css/result4.css"; // applies result4 CSS to HTML - red theme
    } else if (score >= 20 && score <= 27) {
        depression_level = 'severe depression'; // score 20-27: severe depression
        result.href = "./assets/css/result5.css"; // applies result5 CSS to HTML - gray theme
    }
}
