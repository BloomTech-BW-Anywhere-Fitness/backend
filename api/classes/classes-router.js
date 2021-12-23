const router = require('express').Router();
const { checkClassExists, restricted, validateClass } = require('../auth/auth-middleware');
const Classes = require('./classes-model');

router.get('/', restricted, (req, res, next) => {
    Classes.getAllClasses()
        .then(classes => {
            res.status(200).json(classes)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', restricted, validateClass, (req, res, next) => {
    Classes.insertClass(req.body)
        .then(newClass => {
            res.status(201).json(newClass)
        })
        .catch(err => {
            next(err)
        })
  })

router.get('/:id', restricted, checkClassExists, (req, res, next) => {
    Classes.getClassById(req.params.id)
        .then(theClass => {
            res.status(200).json(theClass)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id', restricted, checkClassExists, (req, res, next) => {
    Classes.updateClass(req.params.id, req.body)
        .then(updatedClass => {
            res.status(200).json(updatedClass)
        })
        .catch(next)
})

router.delete('/:id', restricted, checkClassExists, (req, res, next) => {
    Classes.deleteClass(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'the fitness class has been nuked' })
        })
        .catch(next)
})

module.exports = router;