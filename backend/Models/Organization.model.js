const { Schema, default: mongoose } = require("mongoose");

const OrganizationSchema = new Schema({
    organizationName: {
        type: String,
        required: true,
        unique: true,
    },
    organizationId: {
        type: mongoose.Types.UUID,
        required: true,
        unique: true
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    admins: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ],
    members: [
        {
        type: mongoose.Types.ObjectId,
        ref: "OrganizationMembership",
        required: true
        }
    ],
    channels: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Channel"
        }
    ],
},
{
    timestamps: true
});

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = Organization;

