const mongoose = require('mongoose');

const TechnicalSkillSchema = new mongoose.Schema({
    nome: { 
        type: String,
        required: [true, 'Un competenze tecniche deve avere un nome'],
    },
});

const SoftSkillSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Un competenze trasversali deve avere un nome'],
    }
});

exports.TechnicalSkill = mongoose.model('technicalSkill', TechnicalSkillSchema);
exports.SoftSkill = mongoose.model('softSkill', SoftSkillSchema);