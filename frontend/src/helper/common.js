let currentProgress = 0;
let interval;
let timeCountIsOn = 0
let updateTimeout

const timeCount = function() {
    currentProgress += 1;

    interval = setTimeout(function() {
        timeCount();
    }, 20);

    if (currentProgress === 99) {
        clearTimeout(interval);
        timeCountIsOn = 0;
    }
}

export function showWaitBox (str) {
    // Check if the container already exists
    let container = document.getElementById("container-waitbox");
    if (!container) {
        // Create a container if it doesn't exist
        container = document.createElement("div");
        container.id = "container-waitbox";
        document.body.appendChild(container);
    }

    // Ensure the container is visible
    container.style.display = "block";

    // Check if the waitbox already exists
    let waitbox = document.getElementById("waitbox");
    if (waitbox) {
        const textLoading = document.getElementById("waitbox-text")
        textLoading.innerHTML = str
        return; // Exit after setting up the delayed update
    }

    // Create the waitbox
    waitbox = document.createElement("div");
    waitbox.id = "waitbox";
    waitbox.style.position = "fixed";
    waitbox.style.top = "0";
    waitbox.style.left = "0";
    waitbox.style.width = "100vw";
    waitbox.style.height = "100vh";
    waitbox.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    waitbox.style.display = "flex";
    waitbox.style.alignItems = "center";
    waitbox.style.justifyContent = "center";
    waitbox.style.zIndex = "9999";

    // Create the loading content container
    let loadingContent = document.createElement("div");
    loadingContent.id = "waitbox-content";
    loadingContent.style.textAlign = "center";
    loadingContent.style.padding = "20px";
    loadingContent.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    loadingContent.style.color = "white";
    loadingContent.style.borderRadius = "5px";

    // Add the Bootstrap spinner
    let spinner = document.createElement("div");
    spinner.className = "spinner-border text-light";
    spinner.setAttribute("role", "status");

    // Add screen-reader only text for accessibility
    let spinnerText = document.createElement("span");
    spinnerText.className = "sr-only";
    spinner.appendChild(spinnerText);

    // Add the loading message
    let textLoading = document.createElement("div");
    textLoading.id = "waitbox-text";
    textLoading.style.marginTop = "10px";
    textLoading.style.fontSize = "15px";
    textLoading.style.fontWeight = "bold";
    textLoading.innerHTML = str || "Loading...";

    // Append spinner and text to the content container
    loadingContent.appendChild(spinner);
    loadingContent.appendChild(textLoading);

    // Append the content container to the waitbox
    waitbox.appendChild(loadingContent);

    // Add the waitbox to the container
    container.appendChild(waitbox);

    // Start the time counter if not already running
    if (!timeCountIsOn) {
        timeCountIsOn = 1;
        timeCount();
    }
}


export function closeWaitBox () {
    const container = document.getElementById("container-waitbox");
    if (container) {
        clearTimeout(interval);
        clearTimeout(updateTimeout)
        currentProgress = 0;
        timeCountIsOn = 0;
        document.querySelector("#waitbox-text").innerHTML = ""
        container.style.display = "none"
    }
}