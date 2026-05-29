// auth-guard.js
(function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");
    const currentPath = window.location.pathname.toLowerCase();

    // 1. If we are currently on the login page, STOP running so we don't loop endlessly
    if (currentPath.includes("login.html")) {
        return; 
    }

    // 2. If someone is trying to access ANY other dashboard page without being logged in, KICK THEM OUT!
    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
        return;
    }

    // 3. Keep standard users away from Admin-Only pages
    const adminPages = ["setup.html", "stockinbound.html"];
    const isTryingToAccessAdminPage = adminPages.some(page => currentPath.includes(page));

    if (isTryingToAccessAdminPage && userRole !== "admin") {
        alert("Access Denied: Administrative credentials required.");
        window.location.href = "index.html";
    }
})();
