const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { name, surName, dni, cuit, businessName, email, password } = req.body;

  try {
    // Revisar que el usuario registrado sea unico
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'El mail que intenta utilizar ya existe' });
    }

    // crea el nuevo usuario
    user = new User(req.body);
    user.points = 0;
    // Hashear el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // guardar usuario
    await user.save();

    // Crear y firmar el JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600, // 1 hora
      },
      (error, token) => {
        if (error) throw error;

        // Mensaje de confirmación
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(400).send('Hubo un error');
  }
};

exports.checkPassword = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json({ correctPassword: false });
  }
  const correctPassword = await bcryptjs.compare(password, user.password);
  return res.status(200).json({ correctPassword });
};

exports.getUsers = async (req, res) => {
  try {
    const { userType } = req.params;
    let users = [];
    if (userType) {
      users = await User.find({ type: userType }).sort({
        dataRegister: -1,
      });
    } else {
      users = await User.find().sort({
        dataRegister: -1,
      });
    }

    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener los usuarios');
  }
};

exports.getUser = async (req, res) => {
  try {
    const email = req.params.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'No existe ese Usuario' });
    }

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener los usuarios');
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Extraer el proyecto y comprobar si existe
    const { name, surName, dni, email, address, city, country, image, phoneNumber } = req.body;

    // Si el Usuario existe o no
    let user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(500).json({ msg: 'No existe el Usuario a editar' });
    }

    // Crear un objeto con la nueva información
    const newUser = {};
    newUser.name = name ? name : user.name;
    newUser.surName = surName ? surName : user.surName;
    newUser.dni = dni ? dni : user.dni;
    newUser.email = email ? email : user.email;
    newUser.password = user.password;
    newUser.address = address ? address : user.address;
    newUser.city = city ? city : user.city;
    newUser.country = country ? country : user.country;
    newUser.image = image ? image : user.image;
    newUser.phoneNumber = phoneNumber ? phoneNumber : user.phoneNumber;

    // Guardar el usuario (en caso de no existir lo crea)
    user = await User.findOneAndUpdate({ _id: req.params.id }, newUser, {
      new: true,
    });

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.updateUserPoints = async (req, res) => {
  try {
    // Extraer el proyecto y comprobar si existe
    const { points } = req.body;

    // Si el Usuario existe o no
    let user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(500).json({ msg: 'No existe el Usuario indicado' });
    }
    // Crear un objeto con la nueva información
    const newPoints = points ? user.points + points : user.points;
    const userEdited = user;
    userEdited.points = newPoints;
    user = await User.findOneAndUpdate({ _id: req.params.id }, {points: newPoints}, {
      new: false,
    });
    
    res.json({ user: userEdited });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ msg: 'No existe el usuario' });
    }

    await User.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Usuario Eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};
