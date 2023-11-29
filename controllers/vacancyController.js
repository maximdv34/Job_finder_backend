const { TechnicalSkill, SoftSkill } = require('../models/skillsModel');
const Vacancy = require('../models/vacancyModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllVacancies = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Vacancy.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const vacancies = await features.query;
    
    const findTechnicalSkills = await Promise.all(vacancies.map((i) => TechnicalSkill.find({ _id: { $in: i.tecniche }})));
    const findSoftSkills = await Promise.all(vacancies.map((i) => SoftSkill.find({ _id: { $in: i.trasversali }})));
    const response = vacancies.map((vacancy, i) => {
      tecniche = findTechnicalSkills[i].map((s)=>s.nome);
      trasversali = findSoftSkills[i].map((s)=>s.nome);
      isValid = false;
      if (req.query.tecniche || req.query.trasversali) {
        if (req.query.tecniche && req.query.trasversali) {
          if (trasversali.includes(req.query.trasversali) &&
              tecniche.includes(req.query.tecniche)) {
              isValid = true;
            }
        } else if (trasversali.includes(req.query.trasversali)) {
          isValid = true;
        } else if (tecniche.includes(req.query.tecniche)) {
          isValid = true;
        }
      } else {
        isValid = true;
      }
      if (isValid) {
        return {
          nome: vacancy.nome,
          indirizzio: vacancy.indirizzio,
          mail: vacancy.mail,
          telefono: vacancy.telefono,
          professione: vacancy.professione,
          tecniche: tecniche,
          trasversali: trasversali
        }
      }
    }).filter(function (el) {
      return el != null;
    });

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: response.length,
      data: {
        vacancies: response
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
};

exports.getVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);
    const findTechnicalSkill = await TechnicalSkill.find({ _id: { $in: vacancy.tecniche }});
    const findSoftSkill = await SoftSkill.find({ _id: { $in: vacancy.trasversali }});
    res.status(200).json({
      status: 'success',
      data: {
        nome: vacancy.nome,
        indirizzio: vacancy.indirizzio,
        mail: vacancy.mail,
        telefono: vacancy.telefono,
        professione: vacancy.professione,
        tecniche: findTechnicalSkill.map((i)=>i.nome),
        trasversali: findSoftSkill.map((i)=>i.nome)
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createVacancy = async (req, res) => {
  try {
    const findTechnicalSkills = await TechnicalSkill.find({ nome: { $in: req.body.tecniche }});
    const findSoftSkills = await SoftSkill.find({ nome: { $in: req.body.trasversali }});
    const newVacancy = await Vacancy.create({
        nome: req.body.nome,
        indirizzio: req.body.indirizzio,
        mail: req.body.mail,
        telefono: req.body.telefono,
        professione: req.body.professione,
        tecniche: findTechnicalSkills.map((i)=>i._id),
        trasversali: findSoftSkills.map((i)=>i._id)
    });

    res.status(201).json({
      status: 'success',
      data: {
        vacancies: newVacancy
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateVacancy = async (req, res) => {
  try {
    // TODO
    const vacancy = await Vacancy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        vacancy
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteVacancy = async (req, res) => {
  try {
    await Vacancy.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
