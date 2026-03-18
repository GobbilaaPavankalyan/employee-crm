$(document).ready(function () {

    // =========================
    // QUESTIONS DATA
    // =========================
    const questions = [
        {
            question: "What does CRM stand for?",
            options: [
                "Customer Resource Manager",
                "Customer Relationship Management",
                "Client Response Management",
                "Corporate Record Management"
            ],
            answer: "Customer Relationship Management"
        },
        {
            question: "Which of the following is a CRM feature?",
            options: [
                "Customer data management",
                "Gaming system",
                "Operating system",
                "Compiler design"
            ],
            answer: "Customer data management"
        },
        {
            question: "Which language is used for web apps?",
            options: [
                "Python",
                "JavaScript",
                "C++",
                "Assembly"
            ],
            answer: "JavaScript"
        }
    ];

    // =========================
    // LOAD QUESTIONS (ASYNC SIMULATION)
    // =========================
    async function loadQuestions() {

        $("#quizContainer").html(`<div class="text-center">⏳ Loading questions...</div>`);

        // simulate async loading
        await new Promise(res => setTimeout(res, 500));

        let html = "";

        questions.forEach((q, index) => {
            html += `<div class="mb-4">
                        <h5>${index + 1}. ${q.question}</h5>`;

            q.options.forEach(option => {
                html += `
                <div class="form-check">
                    <input class="form-check-input" type="radio" required name="q${index}" value="${option}">
                    <label class="form-check-label">${option}</label>
                </div>`;
            });

            html += `</div>`;
        });

        $("#quizContainer").html(html);
    }

    loadQuestions();

    // =========================
    // SUBMIT QUIZ
    // =========================
    $("#submitQuiz").click(async function () {

        let allAnswered = true;

        questions.forEach((q, index) => {
            if (!$(`input[name='q${index}']:checked`).val()) {
                allAnswered = false;
            }
        });

        // validation
        if (!allAnswered) {
            $("#result").html(`
                <div class="alert alert-warning">
                    ⚠ Please answer all questions!
                </div>
            `);
            return;
        }

        // loading state
        $("#result").html(`
            <div class="alert alert-info">⏳ Evaluating...</div>
        `);

        await new Promise(res => setTimeout(res, 700));

        // =========================
        // CALCULATE SCORE
        // =========================
        let score = 0;

        questions.forEach((q, index) => {
            let selected = $(`input[name='q${index}']:checked`).val();
            if (selected === q.answer) {
                score++;
            }
        });

        let percentage = Math.round((score / questions.length) * 100);

        // =========================
        // GRADE LOGIC
        // =========================
        let grade;
        if (percentage >= 80) grade = "A";
        else if (percentage >= 60) grade = "B";
        else if (percentage >= 50) grade = "C";
        else grade = "Fail";

        // =========================
        // FEEDBACK (SWITCH)
        // =========================
        let feedback;

        switch (grade) {
            case "A":
                feedback = "Excellent 🎉";
                break;
            case "B":
                feedback = "Good 👍";
                break;
            case "C":
                feedback = "Average ⚠";
                break;
            default:
                feedback = "Try Again ❌";
        }

        // =========================
        // SAVE TO LOCAL STORAGE
        // =========================
        localStorage.setItem("employeeScore", percentage);
        localStorage.setItem("employeeGrade", grade);
        localStorage.setItem("employeeFeedback", feedback);

        // =========================
        // ACTIVITY TRACKING
        // =========================
        let activities = JSON.parse(localStorage.getItem("activities")) || [];

        activities.push({
            text: `Completed assessment with score ${percentage}%`,
            time: new Date().toLocaleString()
        });

        localStorage.setItem("activities", JSON.stringify(activities));

        // =========================
        // SHOW RESULT
        // =========================
        let type = percentage >= 50 ? "success" : "danger";

        $("#result").html(`
            <div class="alert alert-${type} mt-3 shadow">
                <h5>Result</h5>
                <p><strong>Score:</strong> ${percentage}%</p>
                <p><strong>Grade:</strong> ${grade}</p>
                <p><strong>Feedback:</strong> ${feedback}</p>

                <button class="btn btn-light mt-2" id="retryBtn">
                    Retry 🔄
                </button>
            </div>
        `);

    });

    // =========================
    // RETRY QUIZ
    // =========================
    $(document).on("click", "#retryBtn", function () {
        loadQuestions();
        $("#result").html("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

});