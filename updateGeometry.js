const mongoose = require("mongoose");
const axios = require("axios");
const Listing = require("./models/listing"); // Adjust path as needed

const MAPBOX_TOKEN = 'your_mapbox_access_token_here'; // 🔁 Replace with your token

const dbUrl = "mongodb://127.0.0.1:27017/wanderlust"; // 🔁 Replace with your actual DB URL

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Connection error", err));

async function updateListingsWithGeometry() {
    try {
        const listings = await Listing.find({ geometry: { $exists: false } });

        console.log(`Found ${listings.length} listings without geometry.`);

        for (let listing of listings) {
            if (!listing.location) continue;

            const geoData = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(listing.location)}.json`,
                {
                    params: {
                        access_token: 'pk.eyJ1IjoiYWFzdGhhOSIsImEiOiJjbWRrN2hqdzcwcWNtMmtyYjF2eTlkOTYyIn0.mWKwrpfmjjEfP9pIH4HUuw',
                        limit: 1,
                    },
                }
            );

            if (geoData.data.features.length === 0) {
                console.warn(`No coordinates found for: ${listing.location}`);
                continue;
            }

            const [lng, lat] = geoData.data.features[0].geometry.coordinates;

            listing.geometry = {
                type: "Point",
                coordinates: [lng, lat],
            };

            await listing.save();
            console.log(`Updated: ${listing.title} -> [${lng}, ${lat}]`);
        }

        console.log("✅ All listings updated.");
        mongoose.connection.close();

    } catch (err) {
        console.error("Error updating listings:", err);
        mongoose.connection.close();
    }
}

updateListingsWithGeometry();
