const mongoose = require('mongoose');

const TechnicalSkillSchema = new mongoose.Schema({
    nome: { 
        type: String,
        required: [true, 'Un competenze tecniche deve avere un nome'],
        /*
        enum: {
            values: [
                'Disegno meccanico (Conoscenza e capacità di lettura)',
                'Linguaggi di programmazione della produzione (conoscenza)', 
                'Strumenti di misura (conoscenza e abilità)', 
                'Progettazione (con strumenti CAD)',
                'Controllare la qualità degli utensili prodotti (capacità)'
                ],
            message: ''
        }
        */
    },
});

const SoftSkillSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Un competenze trasversali deve avere un nome'],
        /*
        enum: {
            values: [
                'Competenze organizzative',
                'Manualità e precisione', 
                'Capacità di lavorare per obiettivi', 
                'Capacità di lavorare in Team',
                'Capacità di cooperazione e di coordinazione',
                'Conoscenze informatiche ',
                'Flessibilità e adattamento'
                ],
            message: ''
        }
        */
    }
});

exports.TechnicalSkill = mongoose.model('technicalSkill', TechnicalSkillSchema);
exports.SoftSkill = mongoose.model('softSkill', SoftSkillSchema);