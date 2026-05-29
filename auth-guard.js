// auth-guard.js
(function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");
    const currentPage = window.location.pathname.split("/").pop();

    // Force redirection to login portal if completely unauthenticated
    if (isLoggedIn !== "true" && currentPage !== "login.html") {
        window.location.href = "login.html";
        return;
    }

    // Explicitly defend administrative modules from standard tier users
    const adminOnlyPages = ["setup.html", "stockinbound.html"];
    if (adminOnlyPages.includes(currentPage) && userRole !== "admin") {
        alert("Access Denied: Administrative credentials required.");
        window.location.href = "index.html";
    }
})();
