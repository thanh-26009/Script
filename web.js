(function () {
    let host = location.hostname;
    let beforeCom = host.split(".")[0];

    if (beforeCom === "damconuong" && !document.cookie.includes("dam_co_nuong_session=")) {

        document.cookie = "dam_co_nuong_session=eyJpdiI6IjF0WDN6bzVsVHRNOW94dHRFRGNSeXc9PSIsInZhbHVlIjoiZllESWF2NGdoc1BiVEFMejlhSGRiakNEUmJHRlNGcTNMbG5tMWdGN09JY1g1aE9mZWFqSERrYk4xRFp3UDBxTFFSd25qS3RvbkhGQlBDM2xNajY0TFVpUG5zcDdPK01XN2w4Qk81NVFBODAwQU9ucDhBOXBRa2VRNVNVWStMSGkiLCJtYWMiOiI2NGFmZmNhNThlMjMzN2JkY2M3MTAxZTBmMWYzOGE1NzY1YmY3YjMyZTQ1OTE3MjJkZGU3Nzg2ZWYxMDMxNGIzIiwidGFnIjoiIn0%3D; path=/";

        location.reload();
    }
})();
