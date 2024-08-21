document.getElementById("extract").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extract" }, (response) => {
      const contactsTextArea = document.getElementById("contacts");
      contactsTextArea.value = response.join("\n");
    });
  });
});

document.getElementById("copy").addEventListener("click", () => {
  const contactsTextArea = document.getElementById("contacts");
  contactsTextArea.select();
  document.execCommand("copy");
});
