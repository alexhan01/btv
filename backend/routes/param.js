const router = require('express').Router();
let Param = require('../models/param.model');

router.route('/').get((req, res) => {
    Param.find()
        .then(param => res.json(param))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const symbol = req.body.symbol;
    const starttime = Date.parse(req.body.starttime);
    const endtime = Date.parse(req.body.endtime);
    const strategy = req.body.strategy;

    const newParam = new Param({
        symbol,
        starttime,
        endtime,
        strategy,
    });

    newParam.save()
    .then(() => res.json('Param added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Param.findById(req.params.id)
    .then(param => res.json(param))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Param.findByIdAndDelete(req.params.id)
    .then(() => res.json('Param deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Param.findById(req.params.id)
    .then(param => {
      param.symbol = req.body.symbol;
      param.starttime = Date.parse(req.body.starttime);
      param.endtime = Date.parse(req.body.endtime);
      param.strategy = req.body.strategy;

      param.save()
        .then(() => res.json('Param updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;