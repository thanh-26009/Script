// ==UserScript==
// @name         Auto Login
// @namespace    auto
// @version      2.0
// @description  Auto login khi site đổi domain
// @match        *://*/*
// @grant        GM_log
// ==/UserScript==

(function () {
  'use strict';
    // 🔹 Chỉ chạy nếu đúng domain damconuong
    if (!location.hostname.includes("damconuong")) {
        return; // thoát ngay
    } GM_log("🌐 Domain hợp lệ:", location.hostname);

  function getToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    const input = document.querySelector('input[name="_token"]');

    if (meta) return meta.content;
    if (input) return input.value;

    return null;
  }
    // 🔹 Check xem modal login có tồn tại không
    function isLoggedIn() {
        return !document.querySelector('form[action*="/login"]');
    }

  async function autoLogin() {

    // 🔹 nếu đã login thì bỏ qua
    if (isLoggedIn()) {
        GM_log("✅ Đã login → bỏ qua");
        return;
    }
     GM_log("❌ Chưa login → tiến hành login");

    const token = getToken();

    if (!token) {
      GM_log("❌ Không tìm thấy token");
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

      GM_log("📡 Status:", res.status);

      if (res.ok) {

        GM_log("✅ Login thành công");

        setTimeout(() => {
          location.reload();
        }, 1000);

      }

    } catch (err) {
      GM_log("❌ Lỗi:", err);
    }

  }

  window.addEventListener("load", () => {
    GM_log("🚀 Script chạy trên:", location.href);
    autoLogin();
  });

})();
