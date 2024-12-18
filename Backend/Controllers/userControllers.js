const userModel = require('../Models/userModel');

async function getUserData(req,res) {
    try{
        const { email } = req.query;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success:false , message: 'User not found' });
        }

        return res.status(200).json({ success:true , userData:user});
    } catch(err){
        console.error(err);
        return res.status(500).json({ success:false , message: 'Server error' });
    }
}

async function editUserData(req, res) {
    try {
        const { email } = req.query;
        const { username, contactNumber } = req.body;

        console.log(email);
        console.log(req.body);

        // Find the user with the provided email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (username) {
            user.username = username;
        }
        if (contactNumber) {
            user.contactNumber = contactNumber;
        }

        if (username || contactNumber) {
            await user.save();
            return res.status(200).json({ success: true, message: "User details updated", user });
        } else {
            return res.status(400).json({ success: false, message: "No valid fields to update" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}


async function getMyListings(req, res) {
    try {
        const { email } = req.query;
        const user = await userModel.findOne({ email }).populate('listings');

        if (!user) {
            return res.status(404).json({ success:false , message: 'User not found' });
        }

        return res.status(200).json({ success:true , listings: user.listings });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success:false , message: 'Server error' });
    }
}

async function addToFavorites(req, res) {
    try {
        const { email, id } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.favorites.includes(id)) {
            user.favorites.push(id);
            await user.save();
        }

        await user.populate('favorites');

        return res.status(200).json({ 
            success: true, 
            favorites: user.favorites
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function deleteFromFavorites(req, res) {
    try {
        const { email, id } = req.query; 
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const updated_favorites = user.favorites.filter(ID => ID != id);
        user.favorites = updated_favorites;
        await user.save();
        await user.populate('favorites');

        return res.status(200).json({ 
            success: true, 
            favorites: user.favorites
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}



async function getFavorites(req, res) {
    try {
        const { email } = req.query;
        const user = await userModel.findOne({ email }).populate('favorites');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({
            success: true,
            favorites: user.favorites
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function setProfilePhoto(req,res) {
    try{
        const {email} = req.body;
        const file = req.file;

        if (!email) {
            return res.status(400).json({ success: false, message: 'incorrect email' });
        }
        if (!file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const user = await userModel.findOne({ email });

        const imageUrl = file.path;
        user.URL = imageUrl

        await user.save();

        return res.status(200).json({
            success: true,
            updatedUser: user
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}



module.exports = { getMyListings , getFavorites , addToFavorites , deleteFromFavorites , getUserData ,setProfilePhoto , editUserData};
