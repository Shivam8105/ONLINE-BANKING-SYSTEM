CREATE DATABASE OnlineBankingSystem;
USE OnlineBankingSystem;

-- user table --
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Customer') NOT NULL
);
 
-- accounts table
CREATE TABLE Accounts (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    balance DECIMAL(10, 2) DEFAULT 0.0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- transactions table

CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT,
    amount DECIMAL(10, 2),
    transaction_type ENUM('Deposit', 'Withdrawal'),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);




