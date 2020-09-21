const {Customer, TukangCukur, Transaction, Varian, TransactionDetail}= require("../models")
const userToken = require('../helpers/jwt')
const {comparePassword} = require('../helpers/hashPassword')

//mainController's responsible are divided in:
// -Login Process and sending Token to client
// -Checking token owner, (checking its role) and sending role to client
// -Creating the transactions form and complete with its status and Detail(Type, Price, Amount)

class MainController {
  // login
  static async login(req,res,next) {
    // req.params.role: 'customer'/'tukangcukur'
    // req.body: {telepon, password}
    try {
      const {telepon,password} = req.body
      if (!telepon || !password) {
        next({
          status: 400,
          message: "Wrong telepon/password!"
        });
      }
      const role = req.params.role
      let user
      if (role === 'customer') user = await Customer.findOne({where: {telepon}})
      else if (role === 'tukangcukur') user = await TukangCukur.findOne({where: {telepon}})
      else {
        next({
          status: 400,
          message: "Unidentifed Role!"
        });
      }
      if (!user) {
        next({
          status: 400,
          message: "Wrong telepon/password!"
        });
      } else {
        if (comparePassword(password, user.password)) res.status(200).json({'access_token': userToken({id: user.id, role: req.params.role})})
        else next({
          status: 400,
          message: "Wrong telepon/password!"
        });
      }
    } catch (error) {
      next({
        status: 500,
        message: "Internal server error"
      });
    }
  }
  // login ends


  // Checking Token Credential
  static appVerify (req,res,next) {
    res.status(200).json({
      role: req.role
    })
  }
  // Checking Token Credential ends

  // Getting Variant Menu (Menu potong rambut)
  static async getVarian(req,res,next) {
    try {
      const varian = await Varian.findAll()
      res.status(200).json(varian)
    } catch (error) {
      next({
        status: 500,
        message: "Internal server error"
      });
    }
  }
  // Getting Variant Menu ends

  // Transactions
  static async getTransaksi(req, res, next) {
    try {
      const id = req.access_id
      let transaction
      if (req.role === 'customer') {
        transaction = await Transaction.findAll({
          where: { CustomerId: id },
          order: [['createdAt','ASC']],
          include:[Customer, TukangCukur,{
            model: TransactionDetail,
            order: [['VarianId','ASC']],
            include: Varian
        }]})
      }
      else if (req.role === 'tukangcukur') {
        transaction = await Transaction.findAll({
          where: { TukangCukurId: id },
          order: [['createdAt','ASC']],
          include:[Customer, TukangCukur,{
            model: TransactionDetail,
            order: [['VarianId','ASC']],
            include: Varian
        }]})
      }
      res.status(200).json(transaction)
    } catch(error) {
      next({
        status: 500,
        message: "Internal server error"
      });
    }
  }

  static async getTransaksiById(req, res, next) {
    try {
      const id = req.params.id
      const transaction = await Transaction.findOne({
        where: { id },
        include:[Customer, TukangCukur,{
          model: TransactionDetail,
          order: [['VarianId','ASC']],
          include: Varian
      }]})
      res.status(200).json(transaction)
    } catch(error) {
      next({
        status: 500,
        message: "Internal server error"
      });
    }
  }

  static async postTransaksi(req,res,next) {
    // req.body: {customerLatitude, customerLongitude, servis: [{jenisCukur: 'string', hargaCukur: int, jumlah: int}]}
    // req.body.tukangCukurId - OPTIONAL if without long/lat
    try {
      const {servis} = req.body
      const TukangCukurId = req.body.TukangCukurId || req.TukangCukurId
      if (!servis || !servis.length) {
        next({
          status: 400,
          message: "Bad servis request"
        });
      }
      servis.forEach(el=>{
        if (el.jumlah < 1) {
          next({
            status: 400,
            message: "Bad jumlah request"
          });
        }
      })
      const transaction = await Transaction.create({
        CustomerId: req.access_id,
        TukangCukurId,
        status: 'ongoing'
      })
      const varian = await Varian.findAll()
      servis.forEach(el=>{ if (!varian.filter((vari)=>{return el.jenisCukur === vari.jenisCukur}).length) {
        next({
          status: 404,
          message: "Varian not found"
        });
      }})
      const detail = servis.map(el=>{return {
        TransactionId: transaction.id,
        VarianId: varian.filter(vari=>{return vari.jenisCukur === el.jenisCukur})[0].id,
        hargaKetikaOrder: varian.filter(vari=>{return vari.jenisCukur === el.jenisCukur})[0].hargaCukur,
        jumlah: el.jumlah
      }})
      const transactionDetail = await TransactionDetail.bulkCreate(detail)
      const tukangCukurStatus = await TukangCukur.update({status: false},{where: {id: TukangCukurId}})
      const updatedTransaction = await Transaction.findOne({
        where: { id: transaction.id },
        include:[Customer, TukangCukur,{
          model: TransactionDetail,
          order: [['VarianId','ASC']],
          include: Varian
      }]})
      res.status(201).json(updatedTransaction)
    } catch (error) {
      next({
        status: 500,
        message: "Internal server error"
      });
    }
  }

  static async patchTransaksi(req, res, next) {
    // req.body: {status:'cancelled'/'completed'}
    try {
      const {status} = req.body
      const transaction = await Transaction.update({
        status
      },
      {
        where: { id: req.params.id },
        returning: true,
      })
      res.status(200).json(transaction[1][0]);
    } catch (error) {
      next({
        status: 500,
        message: "Internal server error"
      });
    }
  }
  // Transactions ends
}

module.exports = MainController