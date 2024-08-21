// Function to extract phone numbers from the div
function extractPhoneNumbers() {
  const phoneNumbers = [];
  const divs = document.querySelectorAll(
    "div.x78zum5.x1cy8zhl.xisnujt.x1nxh6w3.xcgms0a.x16cd2qt"
  );

  divs.forEach((div) => {
    const text = div.textContent;
    const matches = text.match(
      /(\+?\d{1,4}[.\s-]?)?(\(?\d{1,4}\)?[\s.-]?)?[\d\s.-]{7,}/g
    );
    if (matches) {
      matches.forEach((number) => phoneNumbers.push(number));
    }
  });

  return phoneNumbers;
}

// Function to scroll down and load more content
function scrollAndExtract() {
  return new Promise((resolve) => {
    let lastHeight = document.body.scrollHeight;

    function scroll() {
      window.scrollBy(0, window.innerHeight);
      setTimeout(() => {
        let newHeight = document.body.scrollHeight;
        if (newHeight === lastHeight) {
          resolve(extractPhoneNumbers());
        } else {
          lastHeight = newHeight;
          scroll();
        }
      }, 1000);
    }

    scroll();
  });
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extract") {
    scrollAndExtract().then((phoneNumbers) => sendResponse(phoneNumbers));
    return true; // Indicate that response will be sent asynchronously
  }
});
