const mongoose = require('mongoose');

const TechnicalSkillsSchema = new mongoose.Schema({
    nome: { 
        type: [String],
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
    },
});

const SoftSkillsSchema = new mongoose.Schema({
    nome: {
        type: [String],
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
    }
});

const TechnicalSkills = mongoose.model('technicalSkills', TechnicalSkillsSchema);
const SolftSkills = mongoose.model('softSkills', SoftSkillsSchema);
module.exports = TechnicalSkills, SolftSkills;