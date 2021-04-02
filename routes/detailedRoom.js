const express = require('express');
const router = express.Router();

router.get('/detailedRoom', (req, res) => {
    res.render('detailedRoom.ejs', {
        pageTitle: 'Ansicht',
    });
});
module.exports = router;