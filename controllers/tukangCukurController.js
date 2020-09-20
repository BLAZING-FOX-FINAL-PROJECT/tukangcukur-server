"use strict"
const {TukangCukur}= require("../models")

class tukangCukurController{
  static async getTukangCukurs(req, res, next) {
    try {
      const tukangCukur = await TukangCukur.findAll()
      res.status(200).json(tukangCukur);
    } catch (error) {
      next({
        status: 500,
        message: "Internal server error",
      });
    }
  }

  static async postTukangCukur(req, res, next) {
    try {
      const {
        nama,
        telepon,
        urlPhoto,
        password
      } = req.body
      const newTukangCukur = await TukangCukur.create({
        nama,
        telepon,
        urlPhoto,
        password
      })
      res.status(201).json(newTukangCukur);
    } catch (error) {
      next({
        status: 400,
        message: error.message,
      });
    }
  }

  static async getTukangCukur(req, res, next) {
    try {
      const id = req.params.id
      const tukangCukur = await TukangCukur.findOne({
        where: { id },
      })
      if(!tukangCukur) throw err
      res.status(200).json(tukangCukur);
    } catch(err) {
      next({
        status: 404,
        message: "Data Tukang Cukur Not Found",
      });
    }
  }

  static async putTukangCukur(req, res, next) {
    try {
      const id = req.params.id;
      const {
        nama,
        telepon,
        urlPhoto,
      } = req.body
      const tukangCukur = await TukangCukur.update(
        {
          nama,
          telepon,
          urlPhoto,
        },
        {
          where: { id },
          returning: true,
        }
      );
      res.status(201).json(tukangCukur[1][0]);
    } catch (error) {
      next({
        status: 400,
        message: error.message,
      });
    }
  }

  static async patchTukangCukur(req, res, next) {
    try {
      const id = req.params.id
      const {
        status
      } = req.body
      const tukangCukur = await TukangCukur.update(
        {
          status
        },
        {
          where: { id },
          returning: true,
        }
      );
      res.status(201).json(tukangCukur[1][0]);
    } catch (error) {
      next({
        status: 400,
        message: error.message,
      });
    }
  }

  static async delTukangCukur(req, res, next) {
    try {
      const id = req.params.id
      const tukangCukur = await TukangCukur.destroy({
        where: { id },
      });
      if (!tukangCukur) throw error;
      res.status(200).json(tukangCukur);
    } catch (error) {
      next({
        status: 404,
        message: "Tukang Cukur not found",
      });
    }
  }
}

module.exports = tukangCukurController