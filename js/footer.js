const footer = document.querySelector('footer');
const currentYear = new Date().getFullYear();

if (currentYear === 2024) {
    footer.innerHTML = `<p>&copy; ${currentYear} Enge Vibings Corporated Research and Development Facilities | Alle rechten voorbehouden</p>`;
}
else{
    footer.innerHTML = `<p>&copy; 2024-${currentYear} Enge Vibings Corporated Research and Development Facilities | Alle rechten voorbehouden</p>`;
}