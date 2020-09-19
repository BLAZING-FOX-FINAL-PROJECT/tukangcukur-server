const {Transaction, Varian, TransactionDetail}= require("../models")

//mainController's responsible are divided in:
// -Login Process and sending Token to client
// -Checking token owner, (checking its role) and sending role to client
// -Creating the transactions form and complete with its status and Detail(Type, Price, Amount)


class MainController {
  // login

  // login ends


  // Checking Token Credential
  static appVerify (req,res,next) {
    res.status(200).json({
      id: req.access_id,
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

  // Transactions
  static async postTransaksi(req,res,next) {
    // req.body: {TukangCukurId: int, servis: [{jenisCukur: 'string', hargaCukur: int, jumlah: int}]}
    try {
      const {
        TukangCukurId,
        servis
      } = req.body

      const transaction = await Transaction.create({
        CustomerId: req.access_id,
        TukangCukurId,
        status: 'ongoing'
      })
      const varian = await Varian.findAll()
      const detail = servis.map(el=>{return {
        TransactionId: transaction.id,
        VarianId: varian.filter(vari=>{return vari.jenisCukur === el.jenisCukur})[0].id,
        jumlah: el.jumlah
      }})
      const transactionDetail = await TransactionDetail.bulkCreate(detail)
      res.status(201).json(transaction)
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
      res.status(201).json(transaction[1][0]);
    } catch (error) {
      next({
        status: 500,
        message: "Internal server error"
      });  //MISSING TEST SCRIPTS, GETSPECIFIC
    }
  }
  // Transactions ends
}

module.exports = MainController