// ==UserScript==
// @name         Auto Login
// @namespace    auto
// @version      3.0
// @description  Auto login khi site đổi domain
// @match        *://*/*
// @grant        GM_log
// ==/UserScript==

(function () {
'use strict';

// 🔹 Chỉ chạy nếu đúng domain damconuong
if (!location.hostname.includes("damconuong")) {
    return;
}

GM_log("🌐 Domain hợp lệ:", location.hostname);

// 🔹 Lấy CSRF token
function getToken() {

    const meta = document.querySelector('meta[name="csrf-token"]');
    const input = document.querySelector('input[name="_token"]');

    if (meta) return meta.content;
    if (input) return input.value;

    return null;
}

// 🔹 Check login bằng API
async function isLoggedIn() {

    try {

        const r = await fetch("/api/v1/user/notifications/count", {
            method: "GET",
            credentials: "include",
            headers: {
                "accept": "application/json"
            }
        });

        GM_log("📡 Check API status:", r.status);

        if (r.status === 200) return true;
        if (r.status === 401) return false;

        return true;

    } catch (e) {

        GM_log("❌ API lỗi:", e);
        return false;

    }

}

// 🔹 Login
async function autoLogin() {

    const logged = await isLoggedIn();

    if (logged) {
        GM_log("✅ Đã login → bỏ qua");
        return;
    }

    GM_log("❌ Chưa login → tiến hành login");

    const token = getToken();

    if (!token) {

        GM_log("⏳ Chưa có token → đợi...");
        setTimeout(autoLogin, 2000);
        return;

    }

    GM_log("🔑 Token:", token);
    GM_log("🌐 Domain:", location.origin);

    const body = new URLSearchParams({
        _token: token,
        email: "tempmail2k9@livinitlarge.net",
        password: "thanh2009",
        remember: "on"
    });

    try {

        const res = await fetch("/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "accept": "*/*",
                "origin": location.origin,
                "referer": location.href
            },
            body: body
        });

        GM_log("📡 Login status:", res.status);

        if (res.ok || res.redirected) {

            GM_log("✅ Login thành công");

            setTimeout(() => {
                location.reload();
            }, 1200);

        } else {

            const text = await res.text();
            GM_log("❌ Login fail:", text);

        }

    } catch (err) {

        GM_log("❌ Lỗi:", err);

    }

}

window.addEventListener("load", () => {

    GM_log("🚀 Script chạy trên:", location.href);

    setTimeout(autoLogin, 2000);

});

})();
