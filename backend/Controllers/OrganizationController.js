const Channel = require("../models/Channel.model");
const Organization = require("../Models/Organization.model")
const { v4: uuidv4 } = require('uuid');

createOrganization = async (req, res) => {
    const { organizationName } = req.body;
    const ownerId = req.user;

    console.log(req.user);
    
  
    try {
      const organizationId = uuidv4();

      const channelData = [
        { name: 'random', ownerId: ownerId, isPrivate: false, members: [ownerId] },
        { name: 'general', ownerId: ownerId, isPrivate: false, members: [ownerId] }
      ];

      const createdChannels = await Channel.insertMany(channelData);

      const channelIds = createdChannels.map(channel => channel._id);
  
      const newOrganization = new Organization({
        organizationName,
        organizationId,
        ownerId,
        admins: [ownerId],
        members: [ownerId],
        channels: channelIds
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