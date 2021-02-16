exports.welcome = (req, res) => {
  res.json({
    message: "Welcome to the api application",
    createdBy: "Jared Long",
  });
};
