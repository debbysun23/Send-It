const mongoose = require('mongoose')

const statusSchema =  new mongoose.Schema (
    {
        status: {
            type: String,
            enum: ['pending', 'in transit', 'delivered', 'cancelled'],
            default: 'pending', 
        }
    }    
)  

const model = mongoose.model('status', statusSchema)
module.exports = model  
