const router = require('express').Router();

//import api routes
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
// no front end, but this is how we would link html
//router.use('/', htmlRoutes);

router.use((req, res) => {
    res.status(404).send('Uh Oh, Something went wonky??!!')
});

module.exports = router;
