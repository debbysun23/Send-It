const Parcel = require('../model/parcel')
const Status = require('../model/status')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const getAllParcelOrders = async (req,res) => { 
    const parcels = await Parcel.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({ parcels, count:parcels.length })
    //try{
      //  const parcels = await Parcel.find({})
    //}catch(error) {
       // return  res.json({ status: 'error'})  
   // }
}
const getParcelOrder = async (req, res) => {
    const {
      user: { userId },
      params: { id: parcelId },
    } = req
  
    const parcel = await Parcel.findOne({
      _id: parcelId,
      createdBy: userId,
    })
    if (!parcel) {
      throw new NotFoundError(`No job with id ${parcelId}`)
    }
    res.status(StatusCodes.OK).json({ parcel })
  }
const createParcelOrder = async (req,res) =>{ 
    req.body.createdBy = req.user.userId
    const parcel = await Parcel.create(req.body)
    //const { itemDescription, price, pickupLocation, destination, recipientName, recipientNumber } = req.body
    //try{
        //const response = await Parcel.create({
       //  itemDescription,
       //  price,
       //  pickupLocation,
       //  destination,
       //  recipientName,
       //  recipientNumber   
       // })
    //}catch(error){
       // console.log(error)
       // return res.json({ status: 'error' })
    //}
    res.status(StatusCodes.CREATED).json({ parcel })
    //res.send('create parcel order')
}
const updateParcelDestination = async (req, res) => {
    const {
        body: { destination },
        user: { userId },
        params: { id: parcelId },
    } = req 

    if(destination=== ''){
        throw new BadRequestError('Destination field cannot be empty')
    }
    const parcel = await Parcel.findByIdAndUpdate(
        { _id: parcelId, createdBy: userId },
        req.body, 
        { new: true, runValidators: true }
    )
    if (!parcel) {
        throw new NotFoundError(`No job with id ${parcelId}`) 
    }      
    res.status(StatusCodes.OK).json({ parcel })
}

//const updateParcelStatus = async (req, res) => {
   // const {
    //    body: { status },
    //    user: { userId },
    //    params: { id: parcelId },
    //} = req

    //if(status=== ''){
    //    throw new BadRequestError('Destination field cannot be empty')
   // }

    //const parcel = await Parcel.findByIdAndUpdate(
    //    { _id: parcelId, createdBy: userId },
    //    req.body, 
    //    { new: true, runValidators: true } 
    //)

   // if (!parcel) {
    //    throw new NotFoundError(`No job with id ${parcelId}`)
    //}      
    //res.status(StatusCodes.OK).json({ parcel })
//}
//const updateParcelCurrentLocation = async (req, res) => {
 //   res.send('update parcel current location')
//}
const deleteParcelOrder = async (req, res) => {
    const {
        user: { userId },
        params: { id: parcelId },
    } = req 

    const parcel = await Parcel.findByIdAndRemove({
        _id:parcelId,
        createdBy:userId
    })
    if (!parcel) {
        throw new NotFoundError(`No job with id ${parcelId}`)
    }      
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllParcelOrders,
    getParcelOrder,
    createParcelOrder,
    updateParcelDestination,
    //updateParcelStatus,
    //updateParcelCurrentLocation,
    deleteParcelOrder,
}