const fs = require('fs').promises;
const mongoose = require('mongoose');
const Language = require('./models/language.model');

async function preloadLanguages() {
  try {
    // Fetch all existing languages from the database
    const existingLanguages = await Language.find();

    // Define default languages
    const defaultLanguages = [
      {name:'C'},
      {name:'C++'},
      {name:'Java'},
      {name:'C#'},
      {name:'Swift'},
      {name:'HTML'},
      {name:'CSS'},
      {name:'JavaScript'},
      {name:'PHP'},
      {name:'Ruby on Rails'},
      {name:'ASP.NET'},
      {name:'TypeScript'},
      {name:'Kotlin'},
      {name:'Python'},
      {name:'Ruby'},
      {name:'F#'},
      {name:'SQL'},
      {name:'PL/SQL'},
      {name:'Assembly'},
      {name:'R'},
      {name:'XML'},
      {name:'JSON'},
      {name:'YAML'},
      
      // Add more default languages as needed
    ];

    // Filter out languages that already exist in the database
    const newLanguages = defaultLanguages.filter((defaultLang) => {
      return !existingLanguages.some((existingLang) => existingLang.name === defaultLang.name);
    });

    if (newLanguages.length > 0) {
      // Insert only the new languages
      await Language.insertMany(newLanguages);
      console.log('New languages inserted into the database:', newLanguages);

      // Touch a temporary file to trigger nodemon
      await fs.writeFile('nodemon-restart.tmp', '');
    } else {
      console.log('No new languages to insert.');
    }

    console.log('Languages preloaded successfully.');
  } catch (error) {
    console.error('Error preloading languages:', error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/DevsonDeck', {});

// Run the function to preload languages
preloadLanguages();