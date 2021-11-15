const Schedule = require('../models/Schedule');

exports.getSchedule = async (req, res) => {
  try {
    // Si el Usuario existe o no
    let schedule = await Schedule.findOne({});

    if (!schedule) {
      return res.status(200).json({ schedule: null });
    }

    res.json({ schedule });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    let schedule = await Schedule.findOne({});

    const { hourFrom, hourTo, minuteFrom, minuteTo } = req.body;
    if (schedule) {
      schedule.hourFrom = hourFrom;
      schedule.hourTo = hourTo;
      schedule.minuteFrom = minuteFrom;
      schedule.minuteTo = minuteTo;
      await schedule.save();
    } else {
      schedule = new Schedule({
        hourFrom,
        hourTo,
        minuteFrom,
        minuteTo,
      });
      await schedule.save();
    }

    res.json({ schedule: schedule });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar el horario');
  }
};
