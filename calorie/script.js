const apiKey = 'aAqiokvWTjiC2fSMhoDLKw==aZylUJ8Qwe6sWZmU'; // Your CalorieNinjas API key
const apiUrl = 'https://api.calorieninjas.com/v1/nutrition?query=';

document.getElementById('add-meal').addEventListener('click', addMeal);

function addMeal() {
    const meal = document.getElementById('meal-input').value;
    fetch(apiUrl + meal, {
        headers: { 'X-Api-Key': apiKey }
    })
    .then(response => response.json())
    .then(data => {
        if (data.items.length > 0) {
            const mealData = data.items[0];
            addMealToTable(mealData);
            updateCalories(mealData.calories);
        } else {
            alert('No nutritional information found for this meal.');
        }
    })
    .catch(error => console.error('Error:', error));
}

function addMealToTable(mealData) {
    const table = document.getElementById('meal-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${mealData.name}</td>
        <td>${mealData.calories}</td>
        <td>${mealData.protein_g}</td>
        <td>${mealData.carbohydrates_total_g}</td>
        <td>${mealData.fat_total_g}</td>
        <td>${mealData.sodium_mg}</td>
        <td class="actions"><button onclick="deleteMeal(this, ${mealData.calories})">Delete</button></td>
    `;
}

function calgoal(){
    let goal = document.getElementById('calorie-goal').value;
    document.getElementById('calories-remaining').innerHTML =goal;
}

function updateCalories(calories) {
    const consumed = document.getElementById('calories-consumed');
  
    const goal = document.getElementById('calorie-goal').value;
    
    const remaining = document.getElementById('calories-remaining');
   
    const newConsumed = parseInt(consumed.textContent) + calories;
    consumed.textContent = newConsumed;

    const newRemaining = goal - newConsumed;
    remaining.textContent = newRemaining;
}

function deleteMeal(button, calories) {
    const row = button.parentNode.parentNode;
    row.remove();

    const consumed = document.getElementById('calories-consumed');
    const remaining = document.getElementById('calories-remaining');
    const goal = document.getElementById('calorie-goal').textContent;

    const newConsumed = parseInt(consumed.textContent) - calories;
    consumed.textContent = newConsumed;

    const newRemaining = goal - newConsumed;
    remaining.textContent = newRemaining;
}


