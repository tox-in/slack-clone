const Organization = require("../Models/Organization.model")
const { v4: uuidv4 } = require('uuid');

createOrganization = async (req, res) => {
    const { organizationName } = req.body;
    const ownerId = req.user?.id;

    console.log(ownerId);
    
  
    try {
      const organizationId = uuidv4();
  
      const newOrganization = new Organization({
        organizationName,
        organizationId,
        ownerId,
        admins: [ownerId],
        members: [ownerId],
      });
  
      await newOrganization.save();
  
      return res.status(201).json({
        message: "Organization created successfully",
        organization: newOrganization,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create organization" });
    }
  };

  module.exports = {createOrganization}