 HEAD

# Online-Bank
 1011ff7b09b758cb722d1b8cd7c2fef51b28a068


## Overview

**Online Bank** is a web-based banking system that allows users to perform financial transactions such as transferring funds, viewing transaction history, and managing their accounts. The system features a clean, user-friendly interface built using **HTML**, **CSS**, and **Bootstrap** for the frontend. The backend is powered by **Node.js**, utilizing **Express**, **Handlebars**, and several other dependencies for full functionality. The application supports user authentication, data encryption, and real-time interactions using various technologies.

### Features:
- **User Authentication**: Secure login and signup with encryption.
- **Fund Transfers**: Send money between accounts.
- **Transaction History**: View all debits and credits.
- **Responsive Design**: Mobile-friendly with a Bootstrap-based UI.
- **Session Management**: Uses **express-session** for handling user sessions securely.

---

## Technologies Used:
- **Frontend**: HTML, CSS, Bootstrap, JavaScript
- **Backend**: Node.js, Express, Handlebars (HBS)
- **Database**: MySQL
- **Authentication**: JWT, bcryptjs
- **Others**: dotenv, cookie-parser, nodemon

---

## Installation

### Prerequisites
Before getting started, ensure that you have the following software installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MySQL](https://www.mysql.com/) or another SQL-compatible database
- [Git](https://git-scm.com/)
### Steps to Clone and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MdShadil07/Online-Bank.git
   cd Online-Bank


## All the required dependecies to be installed 

use: npm install <dependecies_name>

- bcryptjs: For encrypting user passwords.
- bootstrap: For styling the front end.
- cookie-parser: Middleware for parsing cookies.
- dotenv: For environment variable management.
- express: Web framework for Node.js.
- express-session: For managing user sessions.
- hbs: Handlebars templating engine.
- jsonwebtoken: For generating and verifying JSON Web Tokens.
- mysql: MySQL driver for Node.js.
- nodemon: For automatic server restart during development.



## Set up environment variables: Create a .env file in the root directory and add your database credentials and any other secret keys you require:


DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=online_bank
JWT_SECRET=yourjwtsecret


replace above credential with your database and password;




Project Structure

/Online-Bank
├── /assets                # Static files (CSS, images, JS)
├── /controllers           # Express route controllers
├── /models                # Database models (MySQL)
├── /routes                # Express route definitions
├── /views                 # Handlebars templates
├── .env                   # Environment variables
├── README.md              # Project documentation
├── package.json           # Node.js dependencies and scripts
└── server.js              # Main server file


- How to Use


Login/Signup: Use the authentication feature to register and log into your account securely.
Transactions: Once logged in, you can view and transfer funds between accounts.
Transaction History: Check your recent transaction details in your account dashboard.
Contributing
We welcome contributions to improve this project! If you want to contribute, please follow these steps:

Fork the repository.

Create a new branch for your feature or bugfix:

git checkout -b feature/your-feature
Make your changes and commit them:

git commit -m "Add a feature"
Push your changes to your forked repository:

git push origin feature/your-feature
Create a pull request with a description of what you've done.



Dependencies
Here are the dependencies used in the project:

bcryptjs: ^2.4.3
bootstrap: ^5.3.3
cookie-parser: ^1.4.7
dotenv: ^16.4.5
express: ^4.21.1
express-session: ^1.18.1
hbs: ^4.2.0
jsonwebtoken: ^9.0.2
mysql: ^2.18.1
nodemon: ^3.1.7
Contact


For any inquiries or feedback, feel free to reach out via email (mdshadil62@gmail.com).