# Endpoints

---

### eKYC
POST `{{KRYPTON_URL}}/api/v3/ekyc`

| Parameter | Type   | Required | Description             |
|-----------|--------|----------|-------------------------|
| companyId | string | Yes      | The uniq company id |
| action    | string | Yes      | The ekyc action. Allowed values: |
|           |        |          | - `ENROLL`                       |
|           |        |          | - `AUTH`                         |
|           |        |          | - `LIVENESS`                     |
| flow      | string | No(?)    | The ekyc flow. Required if need to do OCR on action ENROLL. Allowed values: |
|           |        |          | - `card_first`                |
|           |        |          | - `face_first`                |
| userId    | string | Yes      | A user id |
| model     | string | Yes      | The ekyc model. Allowed values: |
|           |        |          | - `gaze`                   |
|           |        |          | - `passive`                |
| krPath    | string | No       | The specific krypton server path for ekyc data exchange |
| sessionTypes | string_array | Yes       | SessionTypes Array |

Example:
```bash
$curl --location --request POST '{{krypton}}/api/v3/ekyc' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "companyId": "{{YOUR_COMPANY_ID}}",
          "extra": {
              "action": "ENROLL",
              "userId": "{{user_id}}",
              "model": "gaze"
          },
          "sessionTypes": ["ENROLL", "OCR"]
      }'
```

javascript example:
```javascript
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

// !!! WARNING !!! For the data security issue, we strongly not recommend to call this api on frontend side.
fetch(ekycEndpoint, requestOptions)
    .then(response => response.text())
    .then(data => {
        // Do the next step
    })
    .catch(error => reject(error));
```