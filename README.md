<!-- # 📘 SMART CAMPUS CONTROL- YOUR ACADEMIC COMPANION

Welcome to SMART CAMPUS CONTROL, the ultimate platform where students can easily access and contribute:

- CLASS NOTES  
- PREVIOUS YEAR QUESTION PAPERS (PYQs)

Whether you're prepping for exams or just revising, SMART CAMPUS CONTROL is designed to help you study smarter, not harder.

Run Live -https://smart-campus-control.onrender.com/
---

## 🚀 FEATURES

### 🔍 ACCESS NOTES & PYQs
- Browse well-organized notes and previous year question papers across subjects and semesters.
- Filter by subject, semester, or year for quick results.

### 📤 CONTRIBUTE CONTENT
- Share your handwritten notes, typed summaries, or question papers with others.
- All contributions are credited to the uploader, helping you build a strong learning community.

### 🧠 SMART SEARCH
- Built-in intelligent search lets you find the right content in seconds.

### 🔒 ACCOUNT SYSTEM
- Sign up or log in to manage your uploads and saved resources.

### 📈 MOST VIEWED & TRENDING
- Discover the most downloaded PYQs and notes — let the crowd guide your studies.

---

## 🌟 WHY USE SMART CAMPUS CONTROL?

FOCUSED ON WHAT MATTERS  
SMART is built for academic success — clean, focused, and free from distractions or ads.

POWERED BY STUDENTS  
A community-driven resource hub with relevant and real-world study materials.

TIME-SAVING  
Stop digging through chats or drives. Everything is just a search away.

---

## ✨ SNEAK PEEK

![Smart Screenshot](backend/src/public/smart-campus-control.png)  
COMING SOON: 
1. View Student details
2. Faculty Information
3. Dark Mode

---

## 🛠️ TECH STACK

- Frontend: React.js 
- Backend: Node.js / Express  
- Database: MongoDB  
<!-- - File Storage: Firebase or AWS S3   -->
- Authentication: JWT and PassportJs

---

## 💡 HOW TO USE

```bash
# Clone the repository
git clone https://github.com/Shaiksufiyan157/smart-campus-control.git

# Go into the project directory
cd smart campus control

# Install dependencies
npm install

# Run the app locally
npm run dev -->

Smart Campus Control
A collaborative platform for college students to share, find, and access subject materials and previous year question papers. Designed to foster academic growth and peer-to-peer support, Smart Campus Control makes it easy for students to get the resources they need—right when they need them.

Table of Contents
Project Description

Key Features

Technical Overview

Installation

Usage

Contributing

Credits



Project Description
Smart Campus Control serves as a central hub where students can:

Upload and share previous year question papers and subject notes.

Browse and download materials organized by subject, college, and academic year.

Search for specific papers or topics to quickly find what you need for exams or assignments.

This platform helps reduce study barriers, encourages collaboration, and promotes academic excellence within college communities through an easy-to-use web interface.

Key Features
Simple upload with categorization of papers and notes

Organized browsing by course, subject, year, or college

Powerful search functionality for fast resource retrieval

User authentication with secure login/signup

Cloud-based file storage and delivery for reliability and scale

Technical Overview
Technology Stack
Feature	Technology	Description
Backend	Node.js, Express.js	Server and API handling
Frontend	EJS (Embedded JavaScript Templates)	Dynamic server-rendered views
Database	MongoDB	Document-oriented data storage
Authentication	Passport.js	Secure user login, signup, and session management
File Upload	Multer	Handling multipart file uploads
Cloud Storage	Cloudinary	Cloud-based storage and CDN delivery for files
Authentication & File Storage
Passport.js manages user authentication with strategies for secure login and session management.

Multer processes file uploads in forms, allowing users to share question papers and notes.

Uploaded files are stored and delivered via Cloudinary, ensuring fast, reliable access and scalable storage.

Installation
Clone the Repository

bash
git clone <your_repo_url>
cd smart-campus-control
Install Dependencies

bash
npm install
Configure Environment Variables
Create a .env file in the root directory with the following variables:

text
MONGODB_URI=your_mongo_db_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret
PORT=3000
Start the Application

bash
npm start
Open http://localhost:3000 in your browser.

Usage
After registration/login, users can upload question papers and subject notes easily.

Users can browse by subject, academic year, or college to find specific resources.

The search bar helps quickly locate desired papers or topics.

Uploaded files are securely stored on the cloud, ensuring quick access anytime.

Contributing
Contributions are welcome! To contribute:

Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add new feature')

Push to the branch (git push origin feature-name)

Open a Pull Request describing your changes

Please ensure your code follows existing style conventions and is well-documented.

Credits
Developed by [Your Name or Team]

Uses open-source technologies and packages: Node.js, Express, MongoDB, Passport.js, Multer, Cloudinary, and EJS

Thanks to the contributors and the open-source community for support