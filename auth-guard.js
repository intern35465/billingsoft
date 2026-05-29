// auth-guard.js
(function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");
    const currentPath = window.location.pathname.toLowerCase();

    // If we are currently on the login page, STOP running immediately so the page doesn't freeze
    if (currentPath.includes("login.html")) {
        return; 
    }

    // If user is completely unauthenticated, boot them back to the login gateway
    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
        return;
    }

    // Explicitly lock down admin dashboards from standard accounts
    const adminPages = ["setup.html", "stockinbound.html"];
    const isTryingToAccessAdminPage = adminPages.some(page => currentPath.includes(page));

    if (isTryingToAccessAdminPage && userRole !== "admin") {
        alert("Access Denied: Administrative credentials required.");
        window.location.href = "index.html";
    }
})();
