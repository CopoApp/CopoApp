// Is the user logged in?
// Not specific user, just ANY user
const checkAuthentication = (req, res, next) => {
  const { userId } = req.session;
  if (!userId) return res.sendStatus(401); // Missing authentication token
  return next();
};

module.exports = checkAuthentication;
