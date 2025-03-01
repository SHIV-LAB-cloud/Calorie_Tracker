const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/calorie_tracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the Meal schema and model
const mealSchema = new mongoose.Schema({
    meal: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    sugar:Number,
});

const Meal = mongoose.model('Meal', mealSchema);

// Route to add a meal
app.post('/api/addMeal', async (req, res) => {
    const { meal } = req.body;

    // API key and URL for CalorieNinjas
    const apiKey = 'aAqiokvWTjiC2fSMhoDLKw==aZylUJ8Qwe6sWZmU';  // Your CalorieNinjas API key
    const apiUrl = `https://api.calorieninjas.com/v1/nutrition?query=${meal}`;

    try {
        // Fetch nutrition data from CalorieNinjas API
        const response = await fetch(apiUrl, {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const nutritionalData = data.items[0];

            // Create a new Meal entry
            const newMeal = new Meal({
                meal,
                calories: nutritionalData.calories,
                protein: nutritionalData.protein_g,
                carbs: nutritionalData.carbohydrates_total_g,
                fat: nutritionalData.fat_total_g,
            });

            // Save the meal to MongoDB
            await newMeal.save();
            res.send(newMeal);
        } else {
            res.status(404).send({ error: 'Meal not found' });
        }
    } catch (error) {
        console.error('Error fetching data from CalorieNinjas:', error);
        res.status(500).send({ error: 'Failed to retrieve data' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
