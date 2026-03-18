document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // GET DATA FROM STORAGE
    // =========================
    let score = localStorage.getItem("employeeScore");
    let grade = localStorage.getItem("employeeGrade");

    let bar = document.getElementById("scoreBar");

    if (!bar) return; // safety check

    // =========================
    // DEFAULT STATE (NO DATA)
    // =========================
    if (!score) {
        bar.style.width = "0%";
        bar.innerText = "No Data";
        bar.classList.add("bg-secondary");
        return;
    }

    // convert to number
    score = parseFloat(score);

    // =========================
    // UPDATE PROGRESS BAR
    // =========================
    bar.style.width = score + "%";
    bar.innerText = score + "%";

    // =========================
    // COLOR BASED ON SCORE
    // =========================
    if (score >= 80) {
        bar.classList.add("bg-success"); 
    } 
    else if (score >= 50) {
        bar.classList.add("bg-warning");
    } 
    else {
        bar.classList.add("bg-danger");
    }

});