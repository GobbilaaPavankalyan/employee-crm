// =========================
// FUNCTIONS
// =========================

// Pass/Fail
function isPassed(score){
    return score >= 50;
}

// Percentage
function calculatePercentage(score, total){
    if (total === 0) return 0; // safety
    return Math.round((score / total) * 100);
}

// Grade
function getGrade(percentage){
    if (percentage >= 80) return "A";
    else if (percentage >= 60) return "B";
    else if (percentage >= 50) return "C";
    else return "Fail";
}

// =========================
// TEST CASES
// =========================

// ✅ Pass/Fail Tests
test("Pass condition", () => {
    expect(isPassed(60)).toBe(true);
});

test("Fail condition", () => {
    expect(isPassed(30)).toBe(false);
});

test("Boundary pass condition (50)", () => {
    expect(isPassed(50)).toBe(true);
});

// ✅ Percentage Tests
test("Percentage calculation", () => {
    expect(calculatePercentage(2, 4)).toBe(50);
});

test("Zero total edge case", () => {
    expect(calculatePercentage(5, 0)).toBe(0);
});

// ✅ Grade Tests
test("Grade A", () => {
    expect(getGrade(85)).toBe("A");
});

test("Grade B", () => {
    expect(getGrade(65)).toBe("B");
});

test("Grade C", () => {
    expect(getGrade(50)).toBe("C");
});

test("Grade Fail", () => {
    expect(getGrade(40)).toBe("Fail");
});