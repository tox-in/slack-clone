const User = require("../Models/User.model");
const Organization = require("../Models/Organization.model");
const OrganizationMembership = require("../Models/OrganizationMembership.model");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken")
const bcrypt = require("bcryptjs");

const login = asyncHandler(async (req, res) => {
    const { emailOrPhone, password } = req.body;

    let user;
    if (/\S+@\S+\.\S+/.test(emailOrPhone)) {
        user = await User.findOne({ email: emailOrPhone }).select("+password");
    } else {
        user = await User.findOne({ phone: emailOrPhone }).select("+password");
    }

    if (!user) {
        res.status(401);
        throw new Error("Email cyangwa telephone cyangwa password siyo");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(401);
        throw new Error("Email cyangwa telephone cyangwa password siyo");
    }

    const token = generateToken(user.id);

    const data = {
        id: user.id,
        name: user.username,
        email: user.email,
        phone: user.phone,
        token,
      };

      res.status(201).json({ success: true, data });
});

const signup = asyncHandler(async (req, res) => {
    const { emailOrPhone, name, password } = req.body;
    

    if (!name || !password) {
        res.status(400);
        throw new Error("Izina cyangwa password ntabwo byuzuye.");
    }

    let user;
    let isEmail = /\S+@\S+\.\S+/.test(emailOrPhone);

    if (isEmail) {
        user = await User.findOne({ email: emailOrPhone });
        if (user) {
            res.status(400);
            throw new Error("Imeli iramaze gufatwa.");
        }
    } else {
        user = await User.findOne({ phone: emailOrPhone });
        if (user) {
            res.status(400);
            throw new Error("Telephone iramaze gufatwa.");
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email: isEmail ? emailOrPhone : undefined,
        phone: isEmail ? undefined : emailOrPhone,
        globalUsername: name,
        password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
        success: true,
        message: "Umukoresha mushya yashyizweho.",
        user: {
            id: newUser._id,
            globalUsername: newUser.globalUsername,
            email: newUser.email,
            phone: newUser.phone,
        },
    });
});

const signupInOrganization = asyncHandler( async( req, res) => {
    const {username, displayName, password, emailOrPhone, organizationId } = req.body;

    if (!username || !password || !emailOrPhone || !organizationId) {
        return res.status(400).json({ error: 'All fields are required' });
      }
    
    try {
        let user;
        let isEmail = /\S+@\S+\.\S+/.test(emailOrPhone);
        
        if (isEmail) {
            
            user = await User.findOne({ email: emailOrPhone });
            if (user) {
                res.status(400);
                throw new Error("Imeli iramaze gufatwa.");
            }
        } else {
            user = await User.findOne({ phone: emailOrPhone });
            if (user) {
                res.status(400);
                throw new Error("Telephone iramaze gufatwa.");
            }
        }

        const existingUsername = await User.findOne({ 'globalProfile.username': username });
        if (existingUsername) {
        return res.status(400).json({ error: 'Username is already taken.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        
        
        const newUser = new User({
            email: isEmail ? emailOrPhone : undefined,
            phone: isEmail ? undefined : emailOrPhone,
            globalUsername: username,
            password: hashedPassword,
        });
        
    
        await newUser.save();
        
        const existingMembership = await OrganizationMembership.findOne({ userId: newUser._id, organizationId });
            if (existingMembership) {
                return res.status(400).json({ error: 'User already a member of this workspace' });
            }

        const membership = new OrganizationMembership({
            userId: newUser._id,
            organizationId,
            displayName: displayName || username
        });

        membership.save();

        const organization = await Organization.findById(organizationId);
            organization.members.push(membership._id);
            await organization.save();
        
        const userOrganization = await User.findById(newUser._id);
            userOrganization.organizations.push(membership._id);
            await userOrganization.save(); 

            res.status(201).json({ message: 'User registered and added to workspace', userOrganization, membership });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

const joinOrganization = asyncHandler(async (req, res) => {
    const { userId, displayName, organizationId} = req.body;

    try {
        const existingMembership = await OrganizationMembership.findOne({ userId: userId, organizationId });
            if (existingMembership) {
                return res.status(400).json({ error: 'User already a member of this workspace' });
            }

        const membership = new OrganizationMembership({
            userId: userId,
            organizationId,
            displayName: displayName
        });

        membership.save();

        const organization = await Organization.findById(organizationId);
            organization.members.push(membership._id);
            await organization.save();

        const userOrganization = await User.findById(newUser._id);
            userOrganization.organizations.push(membership._id);
            await userOrganization.save(); 

        res.status(201).json({ message: 'User registered and added to workspace', userOrganization, membership });

    } catch(err) {

    }

})


module.exports = { login, signup, signupInOrganization, joinOrganization}