const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        enum: ["user", "admin"],
        type: String,
        default: "user",
       
    },

}
,
{
    timestamps: true,
});

module.exports = mongoose.model("Role", roleSchema);
