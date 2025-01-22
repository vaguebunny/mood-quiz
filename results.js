// separate JavaScript file for results.html (i.e., Results page)
// otherwise, using DOM (i.e., document) won't work

// display total score
const final_score = document.querySelector('#final_score');
final_score.textContent = `${localStorage.getItem('total_score')}`;
