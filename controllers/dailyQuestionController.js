const DailyQuestion = require("../models/DailyQuestion");


exports.getAll = async (req, res) => {
  try {
    let dailyQuestions =  await DailyQuestion.find().sort({
      id: -1,
    });
    res.json({ dailyQuestions: dailyQuestions });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al obtener las preguntas diarias");
  }
};

exports.createDailyQuestion = async (req, res) => {
  try {
    let dailyQuestions = new DailyQuestion(req.body);
    await dailyQuestions.save();

    res.json({ dailyQuestions: dailyQuestions });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al crear la pregunta diaria");
  }
};

exports.deleteDailyQuestion = async (req, res) => {
  try {
    let dailyQuestion = await DailyQuestion.findOne({ _id: req.params.id });
    if (!dailyQuestion) {
      return res.status(404).json({ msg: 'No existe la pregunta diaria' });
    }

    await DailyQuestion.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Pregunta diaria Eliminada' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};