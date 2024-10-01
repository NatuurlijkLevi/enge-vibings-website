// Initialize variables
const footer = document.querySelector('footer');
const currentYear = new Date().getFullYear();

// Check if the current year is 2024
// If it is, display the footer with the current year only
if (currentYear === 2024) {
    footer.innerHTML = `<p>&copy; ${currentYear} Enge Vibings Corporated Research and Development Facilities | Alle rechten voorbehouden</p>`;
}
// If it is not, display the footer with the range of years from 2024 to the current year
else{
    footer.innerHTML = `<p>&copy; 2024-${currentYear} Enge Vibings Corporated Research and Development Facilities | Alle rechten voorbehouden</p>`;
}