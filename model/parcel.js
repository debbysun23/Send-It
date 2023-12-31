const mongoose = require('mongoose')
var pickupLocation = pickupLocation
const parcelSchema = new mongoose.Schema(
    {
        item_description: {
            type: String,
            required:true,
        },
        price: {
            type: Number,
            required: true
        },
        pickup_location: {
            type: String,
            required: true
        },
        destination: {
            type : String,
           required: true
        },
        recipient_name: {
            type: String,
            required: true
        },
        recipient_number: {
            type: String,
            required: true
        }, 
        current_location:{
            type:String,
            required:true,
            default: function () {
                return this.pickup_location; 
            },
        },
        weight: {
            type: Number,
            required: true
        },
        amount: {
            type: String,
            required: true,
            default:'330',
        },
        status: {
            type: String,
            enum: ['pending', 'in-transit', 'delivered', 'cancelled'], 
            default: 'pending', 
        },
        createdBy: {
            type:mongoose.Types.ObjectId,
            ref: 'User', 
            required:true, 
        }
    },{timestamps: true}
)
 
const model = mongoose.model('parcel', parcelSchema)
module.exports = model  