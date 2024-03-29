const { TechnicalSkill } = require('../models/skillsModel');
const { SoftSkill } = require('../models/skillsModel');
const Student = require('../models/studentModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllStudents = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Student.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const students = await features.query;

    const findTechnicalSkills = await Promise.all(students.map((i) => TechnicalSkill.find({ _id: { $in: i.tecniche }})));
    const findSoftSkills = await Promise.all(students.map((i) => SoftSkill.find({ _id: { $in: i.trasversali }})));
    const response = students.map((student, i) => {
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
        return Object.assign(student.toObject(), {    
          tecniche: tecniche,
          trasversali: trasversali
      })
      }
    }).filter(function (el) {
      return el != null;
    });

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: response.length,
      data: {
        students: response
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const findTechnicalSkill = await TechnicalSkill.find({ _id: { $in: student.tecniche }});
    const findSoftSkill = await SoftSkill.find({ _id: { $in: student.trasversali }});
    res.status(200).json({
      status: 'success',
      data: Object.assign(student.toObject(), {      
        tecniche: findTechnicalSkill.map((i)=>i.nome),
        trasversali: findSoftSkill.map((i)=>i.nome),
        
    })
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const findTechnicalSkills = await TechnicalSkill.find({ nome: { $in: req.body.tecniche }});
    const findSoftSkills = await SoftSkill.find({ nome: { $in: req.body.trasversali }});
    const newStudent = await Student.create(Object.assign(req.body, {
        tecniche: findTechnicalSkills.map((i)=>i._id),
        trasversali: findSoftSkills.map((i)=>i._id)
    }));

    res.status(201).json({
      status: 'success',
      data: {
        students: newStudent
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    // TODO
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        student
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

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
