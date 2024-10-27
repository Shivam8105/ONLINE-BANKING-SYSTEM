package dao;
import java.sql.Connection;
import java.sql.SQLException;

public class TestDatabaseConnection {
    public static void main(String[] args) {
        try {
            // Initialize the database connection
            Connection connection = DatabaseConnection.initializeDatabase();
            System.out.println("Database connected successfully!");

            // Close the connection
            connection.close();
        } catch (ClassNotFoundException e) {
            System.out.println("MySQL JDBC Driver not found. Include it in your library path.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Connection failed. Check your database URL, username, and password.");
            e.printStackTrace();
        }
    }
}
