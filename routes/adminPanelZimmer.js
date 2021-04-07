const express = require('express');
const router = express.Router();

router.get('/adminPanelZimmer', (req, res) => {
        res.render('adminPanelZimmer.ejs', {
            pageTitle: 'Start',
        });
});
module.exports = router;