const httpError = require("./../models/http-error");
const Fresher = require("./../models/fresher");
const jwt = require("jsonwebtoken");

// FOR GETTING ALL DATA RELATED TO FRESHERS
exports.getFreshers = async (req, res, next) => {
  let currFresher;
  try {
    currFresher = await Fresher.find();
  } catch (err) {
    return next(new httpError("Something went wrong", 500));
  }
  if (currFresher.length === 0 || !currFresher) {
    return next(new httpError("Freshers not found", 500));
  }

  currFresher.map((curr) => {
    curr.password = "*";
  });

  res.status(201).json({
    user: currFresher.map((curr) => curr.toObject({ getters: true })),
  });
};

// FOR GETTING FRESHER WITH SPECIFIC ID
exports.getFreshersById = async (req, res, next) => {
  let currFresher;
  try {
    currFresher = await Fresher.findById(req.params.uid);
  } catch (err) {
    return next(new httpError("Something went wrong", 500));
  }
  if (!currFresher) {
    return next(new httpError("Freshers not found", 500));
  }

  currFresher.password = "*";

  res.status(201).json({ user: currFresher.toObject({ getters: true }) });
};

exports.login = async (req, res, next) => {
  const rollid = req.body.rollid;
  const password = req.body.password;
  let currFresher;
  try {
    [currFresher] = await Fresher.find({ rollid: rollid });
  } catch (err) {
    return next(new httpError("Something went wrong", 500));
  }

  if (!currFresher) {
    return next(new httpError("Freshers not found", 500));
  }

  if (currFresher.password !== password) {
    return next(new httpError("WRONG PASSWORD", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: currFresher.rollid, password: currFresher.password },
      process.env.PRIVATE_KEY,
      { expiresIn: "6h" }
    );
  } catch (err) {
    return next(new httpError("Something went wrong. Log in failed!", 500));
  }

  res
    .status(201)
    .json({ userId: currFresher.rollid, token: token, uid: currFresher.id });
};

exports.addFresher = async (req, res, next) => {
  const body = req.body;
  const newFresher = new Fresher(body);
  try {
    await newFresher.save();
  } catch (err) {
    return next(new httpError("Something went wrong !", 500));
  }
  res.status(201).json({ user: newFresher.toObject({ getters: true }) });
};
