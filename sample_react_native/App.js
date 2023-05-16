import { WebView } from 'react-native-webview';
import React, { Component } from 'react';

const KRYPTON_URL = '{{KRYPTON_PATH}}'
const WEB_EKYC_URL = 'https://web-ekyc.e1ement.com/latest'
const COMPANY_ID = '{{YOUR_COMPANY_ID}}'

export default class WebEkyc extends Component {
  state = { token: "" };

  render() {
    return (
      <WebView
        source={{ uri: `${WEB_EKYC_URL}/ekyc.html?t=${encodeURIComponent(this.state.token)}` }}
        allowsInlineMediaPlayback
        onMessage={(event) => {
          if (event.nativeEvent.data) {
            console.log(JSON.parse(event.nativeEvent.data))
          }
        }}
      />
    );
  }

  componentDidMount() {
    this.fetchToken()
  }

  async fetchToken() {
    try {
      const payload = {
        "companyId": COMPANY_ID,
        "sessionTypes": ["ENROLL"],
        "extra": {
          "userId": "1_1673871980784",
          "action": "ENROLL",
          "flow": "selfie_only",
          "model": "gaze"
        }
      }
      const response = await fetch(`${KRYPTON_URL}/api/v3/ekyc`, {
        method: 'POST',
        body: JSON.stringify(payload),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const token = await response.text()
      this.setState({ token });
    } catch (e) {
      console.log(e)
    }
  }
}
