/* Middleware : locals 전역변수 */
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn); // 로그인 T/F
  res.locals.siteName = "WeTube";
  res.locals.loggedInUser = req.session.user;
  console.log(res.locals);
  next();
};
