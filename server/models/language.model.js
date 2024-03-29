const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    name: { type: String},
    icon: { type: String},
})

LanguageSchema.virtual('developer', {
    ref: 'DevLanguage',
    localField: '_id',
    foreignField: 'languageId',
  });
  LanguageSchema.virtual('position', {
    ref: 'DevLanguage',
    localField: '_id',
    foreignField: 'languageId',
  });

const Language = mongoose.model('Language',LanguageSchema );
module.exports = Language