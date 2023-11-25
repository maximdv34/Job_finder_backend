const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Un\'azienda deve avere un nome'],
    },
    indirizzio: {
        type: String,
        required: [true, 'Un\'azienda deve avere un indirizzio'],
    },
    mail: {
        type: String,
        required: [true, 'Un\'azienda deve avere un mail'],
    },
    telefono: {
        type: Number,
        required: [true, 'Un\'azienda deve avere un telefono'],
    },
    professione: {
        type: String,
        required: [true, 'Un\'azienda deve avere un professione'],
    },
    tecniche: [{type: mongoose.Schema.Types.ObjectId, ref: "technicalSkill"}],
    trasversali: [{type: mongoose.Schema.Types.ObjectId, ref: "softSkill"}],
});

const Vacancy = mongoose.model('vacancy', vacancySchema);

module.exports = Vacancy;