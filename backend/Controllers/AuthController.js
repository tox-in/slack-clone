import User from "../Models/User.model";

export const login = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const phone = req.body.phone;
    if(!email) {
        const user = await User.findOne({ phone: phone})
        .select("+password");

        if(!user) {
            res.status(401);
            throw new Error("Telephone cyangwa password siyo");
        }
    } else {
        const user =  await User.findOne({ email: email}).select("+password");

        throw new Error("Imeli cyangwa password siyo");
    }

})