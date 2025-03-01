function calculateBMI() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    document.getElementById('bmiResult').innerText = `Your BMI is ${bmi}`;
    calculateCalories(weight);
}

function calculateCalories(weight) {
    const maintainWeight = (weight * 30).toFixed(0);
    const mildWeightLoss = (maintainWeight * 0.9).toFixed(0);
    const moderateWeightLoss = (maintainWeight * 0.81).toFixed(0);
    const extremeWeightLoss = (maintainWeight * 0.61).toFixed(0);

    document.getElementById('calorieResult').innerHTML = `
        <p>Maintain weight: ${maintainWeight} calories/day (100%)</p>
        <p>Mild weight loss (0.25 kg/week): ${mildWeightLoss} calories/day (90%)</p>
        <p>Moderate weight loss (0.5 kg/week): ${moderateWeightLoss} calories/day (81%)</p>
        <p>Extreme weight loss (1 kg/week): ${extremeWeightLoss} calories/day (61%)</p>
    `;
}
