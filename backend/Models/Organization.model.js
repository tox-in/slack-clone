const { Schema } = require("mongoose");

const OrganizationSchema = new Schema({
    organizationName: {
        type: String,
        required: true,
        unique: true,
    },
    organizationId: {
        type: 
    }
});




