import * as WebEkycSDK from 'web-ekyc';

const kryptonUrl = "{{KRYPTON_URL}}";
const ekycEndpoint = kryptonUrl + "/api/v3/ekyc";

const CompanyId = "{{YOUR_COMPANY_ID}}";

function init() {
    let btnEnroll = document.getElementById("btnEnroll");
    btnEnroll.onclick = () => start("enroll");

    let btnAuth = document.getElementById("btnAuth");
    btnAuth.onclick = () => start("auth");

    let btnLiveness = document.getElementById("btnLiveness");
    btnLiveness.onclick = () => start("liveness");
}

function start(action) {
    let userId;
    if (action !== "liveness") {
        userId = document.getElementById("tUserId").value;
    }

    ekyc(
        CompanyId,
        userId,
        action,
        "card_first",
        "gaze",
    ).then(data => {
        let url = WebEkycSDK.getEkycUrl("sdk/ekyc.html", data);
        WebEkycSDK.generateIframe(url);
    })
}

// !!! WARNING !!! For the data security issue, we strongly NOT recommend calling this api on frontend side.
// This is just the sample code to show how to call the krypton, we do NOT recommend calling this API on the frontend side.
async function ekyc(companyId, userId, action, flow, model) {
    return new Promise((resolve, reject) => {
        let sessionTypes;
        switch (action) {
            case "ekyc":
                sessionTypes = ["ENROLL", "OCR"];
                break;
            case "enroll":
                sessionTypes = ["ENROLL"];
                break;
            case "auth":
                sessionTypes = ["AUTH"];
                break;
            case "liveness":
            default:
                sessionTypes = ["LIVENESS"];
        }
        let data = {
            companyId: companyId,
            sessionTypes: sessionTypes,
            extra: {
                "action": action,
                "flow": flow,
                "model": model,
                "userId": userId,
                "krPath": kryptonUrl,
            },
        };
        let requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            redirect: 'follow',
        };

        // !!! WARNING !!! For the data security issue, we strongly NOT recommend calling this api on frontend side.
        fetch(ekycEndpoint, requestOptions)
            .then(response => response.text())
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
}

document.addEventListener('DOMContentLoaded', init, false);
