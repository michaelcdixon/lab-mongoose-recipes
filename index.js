const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"

mongoose
	.connect(MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`);
		// Before adding any recipes to the database, let's remove all existing ones
		return Recipe.deleteMany();
	})
	.then(() => {
		// Run your code here, after you have insured that the connection was made
		updateDatabase();
	})
	.catch((error) => {
		console.error("Error connecting to the database", error);
	});

async function updateDatabase() {
	//Creating my recipe
	try {
		const createdRecipe = await Recipe.create({
			title: "Fried Rice",
			level: "Easy Peasy",
			ingredient: [
				"rice",
				"eggs",
				"soy sauce",
				"oyster sauce",
				"chicken",
				"green onion",
			],
			cuisine: "Asian",
			dishType: "main_course",
			duration: 10,
			creator: "Michael Dixon",
		});
		console.log(createdRecipe.title);

		//Creating many recipes using json file
		const manyRecipes = await Recipe.insertMany(data);
		console.log(manyRecipes.title);

		//Updating recipes
		await Recipe.findByIdAndUpdate("6130db6ed2a44585b3b26024", {
			duration: 100,
		});
		console.log("Recipe successfully updated");

		//Deleting recipes
		await Recipe.deleteOne({ title: "Carrot Cake" });
		console.log("Recipe successfully deleted");
	} catch (e) {
		console.log("error occurred", e);
	} finally {
		mongoose.connection.close(); //Closing the database connection
	}
}
