
class Auth {
  async verify(req, res, next) {
    next();
  };

  async adminVerify(req, res, next) {
    next();
  };
}

module.exports = new Auth();