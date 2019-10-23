//crud.js
const PermissionMiddleware = require('../middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');
const config = require('../config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;


const express = require('express');

module.exports = (Collection) => {

  // ======
  // Create
  // ======
  const create = (req, res) => {
    const newEntry = req.body;
    Collection.create(newEntry, (e,newEntry) => {
      if(e) {
        console.log(e);
        res.sendStatus(500);
      } else {
        res.send(newEntry);
      }
    });
  };
  
  // =========
  // Read many
  // =========
  const readMany = (req, res) => {
    let query = req.query || {};
    const _collection = Collection
    Object.keys(query).map((key, index) => {
      query[key] = _collection.schema.obj[key] && Collection.schema.obj[key].name == 'String' ? { $regex : '.*' + query[key] + '.*' } : query[key];
    });
    Collection.find(query, (e,result) => {
      if(e) {
        res.status(500).send(e);
        console.log(e.message);
      } else {
        res.send(result);
      }
    });
  };

  // ========
  // Read one
  // ========
  const readOne = (req, res) => {
    const { _id } = req.params;
  
    Collection.findById(_id, (e,result) => {
      if(e) {
        res.status(500).send(e);
        console.log(e.message);
      } else {
        res.send(result);
      }
    });
  };
  
  // ======
  // Update
  // ======
  const update = (req, res) => {
    const changedEntry = req.body;
    Collection.update({ _id: req.params._id }, { $set: changedEntry }, (e) => {
      if (e)
        res.sendStatus(500);
      else
        res.sendStatus(200);
    });
  };
  
  // ======
  // Remove
  // ======
  const remove = (req, res) => {
    Collection.remove({ _id: req.params._id }, (e) => {
      if (e)
      res.status(500).send(e);
      else
        res.sendStatus(200);
    });
  };

  // ======
  // Routes
  // ======

  let router = express.Router();

  router.post('/', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    create
  ]);
  router.get('/', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    readMany
  ]);
  router.get('/:_id', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    readOne
  ]);
  router.put('/:_id', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    update
  ]);
  router.delete('/:_id', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    remove
  ]);
  return router;

}