const express = require('express');
const router = express.Router();

router.get('/adminPanelUnterkunft', (req, res) => {
        res.render('adminPanelunterkunft.ejs', {
            pageTitle: 'Start',
        });
});
module.exports = router;