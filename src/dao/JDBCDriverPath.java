package dao;

public class JDBCDriverPath {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("Driver loaded successfully.");
            System.out.println("Driver version: " + java.sql.DriverManager.getDrivers());
        } catch (ClassNotFoundException e) {
            System.out.println("JDBC Driver not found.");
        }
    }
}
