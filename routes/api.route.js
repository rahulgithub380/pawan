const router = require('express').Router();
const {user_signup,user_login,/*logout_user*/} = require('../handlers/handlers')
router.post('/create_user',user_signup)
router.post('/login_user',user_login)
// router.post('/logout_user',logout_user)
router.get('/ffd', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
