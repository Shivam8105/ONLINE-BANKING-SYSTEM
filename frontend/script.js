document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value; 
    const role = document.getElementById('role').value; 

 
    fetch('http://localhost:8080/api/users', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, role }) 
    })
    .then(response => response.json()) 
    .then(data => {
        alert('User created successfully'); 
        loadUsers(); 
    })
    .catch(error => console.error('Error:', error)); 
});
function loadUsers() {
    fetch('http://localhost:8080/api/users')
        .then(response => response.json()) 
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = ''; 
            data.forEach(user => {
                const userDiv = document.createElement('div'); 
                userDiv.innerText = `User ID: ${user.user_id}, Username: ${user.username}, Role: ${user.role}`;
                userList.appendChild(userDiv);
            });
        })
        .catch(error => console.error('Error loading users:', error)); 
}
document.addEventListener('DOMContentLoaded', loadUsers);
