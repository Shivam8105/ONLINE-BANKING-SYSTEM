#Online Banking Systen
Description
This project is a simple online banking dashboard application built using Java Servlets, JSP (JavaServer Pages), and MySQL. The application provides a basic framework for user authentication and account management, allowing both customers and admin users to log in and access their respective dashboards.

Features
User Authentication: Users can log in using their credentials. The application supports both customer and admin roles.
Dynamic Dashboard: Once logged in, users are redirected to a dashboard that displays their role and a welcome message.
Basic Account Management: The application sets the groundwork for integrating user account management and transaction history retrieval.
Session Management: User sessions are handled to maintain state during navigation.
Technologies Used
Java: The core programming language for the backend.
Servlets: Used to handle HTTP requests and responses.
JSP: JavaServer Pages for rendering dynamic web pages.
MySQL: Relational database management system for storing user credentials and data.
HTML/CSS: Basic frontend technologies for creating the user interface.
Setup Instructions
Clone the Repository:

bash
Copy code
git clone https://github.com/Shivam8105/online-banking-dashboard.git
cd online-banking-dashboard
Database Configuration:

Set up a MySQL database named bank with the provided SQL schema.
Insert sample data for users.
Java Environment:

Ensure you have a Java Development Kit (JDK) installed.
Set up a servlet container (like Apache Tomcat) for running the web application.
Run the Application:

Deploy the application to your servlet container.
Access the application at http://localhost:8080/online-banking-dashboard/index.jsp.
Future Improvements
Implement password hashing for enhanced security.
Add functionality for viewing account details and transaction history.
Implement user registration and profile management.
Enhance the user interface with modern frameworks (e.g., Bootstrap).
Expand support for admin functionalities, such as user management and reporting.
License
This project is licensed under the MIT License - see the LICENSE file for details.
