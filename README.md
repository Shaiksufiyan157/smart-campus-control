# Synapse 🎓📚

A collaborative platform for college students to share, find, and access subject materials and previous year question papers. Designed to foster academic growth and peer-to-peer support, **Smart Campus Control** makes it easy for students to get the resources they need—right when they need them.

---

## Table of Contents 📑
- Project Description
- Key Features
- Technical Overview
- Installation
- Usage
- Contributing
- Credits
- License

---

## Project Description 💡
**Smart Campus Control** serves as a central hub where students can:

- 📄 Upload and share previous year question papers and subject notes.
- 🔍 Browse and download materials organized by subject, college, and academic year.
- 📚 Search for specific papers or topics to quickly find what you need for exams or assignments.

This platform helps reduce study barriers, encourages collaboration, and promotes academic excellence within college communities through an easy-to-use web interface.

---

## Key Features ⚙️
- 📝 Simple upload with categorization of papers and notes.
- 📂 Organized browsing by course, subject, year, or college.
- 🔎 Powerful search functionality for fast resource retrieval.
- 🔐 User authentication with secure login/signup.
- ☁️ Cloud-based file storage and delivery for reliability and scale.

---

## Technical Overview 🖥️

### Technology Stack 🛠️
| Feature            | Technology             | Description                              |
|--------------------|------------------------|------------------------------------------|
| **Backend**        | Node.js, Express.js    | Server and API handling                  |
| **Frontend**       | EJS , React (Future) | Dynamic server-rendered views, React for future frontend |
| **Database**       | MongoDB                | Document-oriented data storage           |
| **Authentication** | Passport.js            | Secure user login, signup, and session management |
| **File Upload**    | Multer                 | Handling multipart file uploads          |
| **Cloud Storage**  | Cloudinary             | Cloud-based storage and CDN delivery for files |

### Authentication & File Storage 🔐
- **Passport.js** manages user authentication with strategies for secure login and session management.
- **Multer** processes file uploads in forms, allowing users to share question papers and notes.
- Uploaded files are stored and delivered via **Cloudinary**, ensuring fast, reliable access and scalable storage.

---
## Usage 📖

- After registration/login, users can upload question papers and subject notes easily.
- Users can browse by subject, academic year, or college to find specific resources.
- The search bar helps quickly locate desired papers or topics.
- Uploaded files are securely stored on the cloud, ensuring quick access anytime.

---

## Contributing 🤝

Contributions are welcome! To contribute:

1. 🍴 Fork the repository
2. 🌱 Create a feature branch (`git checkout -b feature-name`)
3. 📝 Commit your changes (`git commit -m 'Add new feature'`)
4. 📤 Push to the branch (`git push origin feature-name`)
5. 🔀 Open a Pull Request describing your changes

Please ensure your code follows existing style conventions and is well-documented.

---

## Credits 👏

Developed by Shaik Sufiyan

## Installation ⚙️

### Clone the Repository

git clone https://github.com/Shaiksufiyan157/smart-campus-control.git
cd smart-campus-control

## Install Dependencies

```bash
npm install
```
## Configure Environment Variables 🔑
### Please ensure you configure the following environment variables in your .env file:
### MongoDB URI for connecting to your database
### The port to run the application on (default is 3000)
```bash
PORT=3000
DB_URI=your_mongo_db_connection_string
Cloudinary credentials for file storage
CLOUD_NAME=your_cloud_name  
CLOUD_KEY=your_api_key  
CLOUD_SECRET=your_api_secret

```
Start the Application 🚀
```bash
npm run dev
```
Open http://localhost:3000 in your browser.
