package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/OnlineBankingSystem"; 
    private static final String USER = "root";
    private static final String PASSWORD = "mysql1234"; 

    public static Connection initializeDatabase() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.cj.jdbc.Driver"); 
        return DriverManager.getConnection(URL, USER, PASSWORD); 
    }

    public void insertUser(String username, String password, String role) {
        String query = "INSERT INTO Users (username, password, role) VALUES (?, ?, ?)";
        try (Connection conn = initializeDatabase();
                PreparedStatement pstmt = conn.prepareStatement(query)) {
            pstmt.setString(1, username);
            pstmt.setString(2, password);
            pstmt.setString(3, role);
            pstmt.executeUpdate();
            System.out.println("User inserted successfully.");
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public void getUsers() {
        String query = "SELECT * FROM Users";
        try (Connection conn = initializeDatabase();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                System.out.println("User ID: " + rs.getInt("user_id"));
                System.out.println("Username: " + rs.getString("username"));
                System.out.println("Role: " + rs.getString("role"));
                System.out.println("-----------");
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public void createAccount(int userId, double initialBalance) {
        String query = "INSERT INTO Accounts (user_id, balance) VALUES (?, ?)";
        try (Connection conn = initializeDatabase();
                PreparedStatement pstmt = conn.prepareStatement(query)) {
            pstmt.setInt(1, userId);
            pstmt.setDouble(2, initialBalance);
            pstmt.executeUpdate();
            System.out.println("Account created successfully for User ID: " + userId);
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public void getAccounts() {
        String query = "SELECT * FROM Accounts";
        try (Connection conn = initializeDatabase();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                System.out.println("Account ID: " + rs.getInt("account_id"));
                System.out.println("User ID: " + rs.getInt("user_id"));
                System.out.println("Balance: " + rs.getDouble("balance"));
                System.out.println("-----------");
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public void deposit(int accountId, double amount) {
        String query = "UPDATE Accounts SET balance = balance + ? WHERE account_id = ?";
        try (Connection conn = initializeDatabase();
                PreparedStatement pstmt = conn.prepareStatement(query)) {
            pstmt.setDouble(1, amount);
            pstmt.setInt(2, accountId);
            pstmt.executeUpdate();
            System.out.println("Deposited " + amount + " to Account ID: " + accountId);
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public void withdraw(int accountId, double amount) {
        String query = "UPDATE Accounts SET balance = balance - ? WHERE account_id = ?";
        try (Connection conn = initializeDatabase();
                PreparedStatement pstmt = conn.prepareStatement(query)) {
            pstmt.setDouble(1, amount);
            pstmt.setInt(2, accountId);
            pstmt.executeUpdate();
            System.out.println("Withdrew " + amount + " from Account ID: " + accountId);
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        DatabaseConnection dbConnection = new DatabaseConnection();
        dbConnection.insertUser("Shivam Kumar", "password123", "Customer");
        dbConnection.getUsers();
        dbConnection.createAccount(1, 1000.00); 
        dbConnection.getAccounts();
        dbConnection.deposit(1, 500.00); 
        dbConnection.withdraw(1, 200.00); 

    }
}
