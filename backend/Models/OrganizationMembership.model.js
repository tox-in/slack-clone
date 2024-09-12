const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationMembershipSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    displayName: { type: String },
    fullName: {type: String },
    status: {type: String }
  }, {
    timestamps: true
  });
  
  const OrganizationMembership = mongoose.model('OrganizationMembership', organizationMembershipSchema);
  
  module.exports = OrganizationMembership;