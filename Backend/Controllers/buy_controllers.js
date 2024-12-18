const userModel = require('../Models/userModel');
const listingModel = require('../Models/listingModel');


async function getAllListings(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const listings = await listingModel.find().skip((page - 1) * limit).limit(limit);
        const totalListings = await listingModel.countDocuments();
        res.status(200).json({ success: true, listings, totalListings, totalPages: Math.ceil(totalListings / limit),  currentPage: page});
    } catch (error) {
        console.error('Error fetching all listings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function getTopThree(req, res) {
    const { category = 'selling', order = 1 } = req.query; // Default values

    try {
        const listings = await listingModel
            .find({ category })
            .sort({ price: parseInt(order) })
            .limit(3);

        res.status(200).json({
            success: true,
            listings,
            message: 'Listings fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}



async function handleFilters(req, res) {
    try {
        const { price, location, area, bedrooms, bathrooms, category } = req.body;
        const page = parseInt(req.query.page) || 1;
        const limit = 6;

        let filter = {};
        if (price) filter.price = { $lte: parseInt(price) };
        if (bedrooms) filter.bedrooms = { $lte: parseInt(bedrooms) };
        if (bathrooms) filter.bathrooms = { $lte: parseInt(bathrooms) };
        if (location) filter.location = { $regex: new RegExp(location, 'i') };
        if (area) filter.area = { $lte: parseInt(area) };
        if (category) {
            filter.category = category === 'buying' ? 'selling' : category;
        }

        const totalListings = await listingModel.countDocuments(filter);
        const filteredListings = await listingModel.find(filter).skip((page - 1) * limit).limit(limit);

        res.status(200).json({
            success: true,
            message: "Listings filtered successfully",
            filteredListings,
            totalListings,
            totalPages: Math.ceil(totalListings / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
}



async function updateListing(req, res) {
    try {
        const { id } = req.params;
        const { location, bedrooms, bathrooms, price, area, category } = req.body;
        console.log(req.body);
        // Find the listing by ID
        const listing = await listingModel.findById(id);
        if (!listing) {
            return res.status(404).json({ 
                success: false, 
                message: "Listing not found. Please provide a valid ID." 
            });
        }

        if (location) listing.location = location;
        if (bedrooms) listing.bedrooms = bedrooms;
        if (bathrooms) listing.bathrooms = bathrooms;
        if (price) listing.price = parseInt(price, 10);
        if (area) listing.area = area;
        if (category) listing.category = category;

        const isUpdated = location || bedrooms || bathrooms || price || area || category;
        if (isUpdated) {
            await listing.save();
        } else {
            return res.status(400).json({ 
                success: false, 
                message: "No fields to update. Please provide valid fields." 
            });
        }

        return res.status(200).json({
            success: true,
            message: `Listing with id ${id} successfully updated.`,
            updated_listing: listing,
        });
    } catch (error) {
        console.error('Error updating listing:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}


async function getListingById(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ success: false, message: "Invalid ID" });

        const listing = await listingModel.findById(id).populate('createdBy');
        if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

        const user = await userModel.findById(listing.createdBy);

        return res.status(200).json({ success: true, listing });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function deleteListing(req, res) {
    try {
        const { email } = req.body;
        const id = req.params.id;

        if (!id || !email) {
            return res.status(400).json({ success: false, message: "Invalid details" });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the listing is in the user's listings
        if (!user.listings.includes(id)) {
            return res.status(404).json({ success: false, message: "Listing not found in user's listings" });
        }

        // Delete the listing from the listings collection
        await listingModel.deleteOne({ _id: id });

        // Update the user's listings by removing the listing
        const updatedListings = user.listings.filter(listingId => listingId.toString() !== id);
        user.listings = updatedListings;
        await user.save();

        // Fetch the full details of all remaining listings
        const fullUpdatedListings = await listingModel.find({ _id: { $in: updatedListings } });

        return res.status(200).json({ success: true, updatedListings: fullUpdatedListings });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}


module.exports = {getAllListings,handleFilters,updateListing,getListingById,deleteListing,getTopThree};