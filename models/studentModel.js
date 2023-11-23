const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Uno studente deve avere un nome'],
    },
    cognome: {
      type: String,
      required: [true, 'Uno studente deve avere un cognome'],
    },
    dataDiNascita: {
      type: Date,
      required: [true, 'Uno studente deve avere un data di nascita'],
    },
    nazioneDiNascita: {
      type: String,
      required: [true, 'Uno studente deve avere un nazione di nascita'],
    },
    cittadinanza: {
      type: String,
      required: [true, 'Uno studente deve avere una cittadinanza'],
    },
    cittàDiResidenza: {
      type: String,
      required: [true, 'Uno studente deve avere una città di residenza'],
    },
    via: {
      type: String,
      required: [true, 'Uno studente deve avere un via'],
    },
    telefono: {
      type: Number,
      required: [true, 'Uno studente deve avere un telefono'],
    },
    mail: {
      type: String,
      required: [true, 'Uno studente deve avere un mail'],
    },
    sitoWeb: {
      type: String,
      required: false,
    },
    linguaMadre: {
      type: String,
      require:  [true, 'Uno studente deve avere un lingua madre'],
    },
    lingue: [String],
    patente: {
      type: String,
      require: false,
      enum: {
        values: ['A', 'B', 'C', 'D', 'E'],
        message: ''
      }
    }, 
    patenteMuletto: Boolean,
    disponibilitàAlTrasferimento: Boolean,
    disponibilitàALavoroSuTurni: Boolean,
    TitoloDiStudio: String,
    AltraFormazione: String 
  }
)

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
