const {TukangCukur, Customer} = require('../models')
const {distance} = require('../helpers/distanceMeasurer')

async function matcher(req,res,next) {
    // req.body: {customerLatitude, customerLongitude, servis: [{jenisCukur: 'string', hargaCukur: int, jumlah: int}]}
  try {
    if (req.body.TukangCukurId) next()
    else {
      const {customerLatitude, customerLongitude} = req.body
      const tukangCukurs = await TukangCukur.findAll({where: { status: true }})
      let distances = tukangCukurs.map(el => {return distance(
        customerLatitude,
        customerLongitude,
        el.latitude,
        el.longitude,
        el.id
      )})
      distances.sort( (dist1,dist2) => dist1.dist-dist2.dist )
      console.log(distances, "km")
      req.TukangCukurId = distances[0].id
      next()
    }
  } catch (error) {
    next({
      status: 500,
      message: "Internal server error"
    });
  }
}

module.exports = {matcher}