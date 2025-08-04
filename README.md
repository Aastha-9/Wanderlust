# 🧳 Wanderlust - Airbnb Clone

Wanderlust is a full-stack web application inspired by Airbnb. It allows users to browse vacation listings, view listing details, and manage their own listings. This project is built using the **MEN** stack — **MongoDB**, **Express.js**, and **Node.js** — with **EJS** templating on the frontend.

---

## 🚀 Features

- 🏡 Create, read, update, and delete vacation listings
- 📸 Upload images for listings (supports both direct links and cloud storage)
- 🔍 Search and filter listings by location and price
- 👤 User authentication and authorization
- 🌍 View listing locations on an interactive map
- 📱 Responsive design for all devices

---

## 🛠️ Tech Stack

| Layer        | Technology               |
|--------------|---------------------------|
| Frontend     | HTML, CSS, Bootstrap, EJS |
| Backend      | Node.js, Express.js       |
| Database     | MongoDB, Mongoose         |
| Other Tools  | Mapbox API, Cloudinary    |
| Auth         | Passport.js (optional)    |


## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust


2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   DB_URL=mongodb://localhost:27017/wanderlust
   MAP_TOKEN=your_mapbox_token
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   ```

4. **Run the application**

   ```bash
   npm start
   ```

5. Visit `http://localhost:3000` in your browser.

---

## 🌐 Deployment

You can deploy this project using platforms like **Render**, **Heroku**, or **Railway**. Make sure to set your environment variables properly on the deployment platform.

---

## 🔐 Authentication (Optional)

This app supports basic authentication using Passport.js:

* Signup/Login
* Only logged-in users can create or edit listings
* Only listing owners can delete their own listings

---

## 📸 Image Upload

Images are stored using **Cloudinary**. Make sure to sign up and get your API keys from [cloudinary.com](https://cloudinary.com/).

---

## 🗺️ Map Integration

Uses **Mapbox** to display dynamic maps on each listing page. You’ll need to sign up at [mapbox.com](https://mapbox.com) and get an access token.

---

## 📦 Dependencies

* express
* mongoose
* ejs
* dotenv
* method-override
* body-parser
* mapbox
* cloudinary
* multer
* express-session
* passport (optional)

---

## 🧑‍💻 Author

Made with ❤️ by [Aastha Bisen](https://github.com/Aastha-9)


