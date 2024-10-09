// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

// Add an event listener to the contact form for form validation
document.querySelector('form').addEventListener('submit', function(e) {
    let email = document.querySelector('input[type="email"]').value;
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        e.preventDefault();  // Prevent form submission if email is invalid
    }
});

// Helper function to validate email format using regular expressions
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;  // Basic email format check
    return re.test(String(email).toLowerCase());
}

// Function to fetch GitHub repositories and display them in the projects section
function fetchGitHubRepos() {
    const username = "johnzama"; // Replace with your GitHub username
    const url = `https://api.github.com/users/${username}/repos?sort=updated`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let projectsDiv = document.querySelector('#projects .project-grid');
            projectsDiv.innerHTML = '';  // Clear existing content if any

            data.forEach(repo => {
                // Only show repositories with a description
                if (repo.description) {
                    // Create a project card for each repo
                    let projectCard = `
                        <div class="project-card">
                            <h3>${repo.name}</h3>
                            <p>${repo.description}</p>
                            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                        </div>
                    `;
                    projectsDiv.innerHTML += projectCard;
                }
            });
        })
        .catch(error => console.error('Error fetching repos:', error));
}

// Call the function to fetch and display GitHub repos on page load
fetchGitHubRepos();
