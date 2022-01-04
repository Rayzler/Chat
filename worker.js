let windows = [];

addEventListener("activate", () => windows =[]);

addEventListener("message", (msg) => {
    if (msg.data === "REGISTRAR") {
        if (windows.find((window) => window.id === msg.source.id) === undefined)
            windows.push(msg.source);
    }
    else {
        for (let window of windows) {
            if (window.id === msg.source.id)
                continue;
            window.postMessage(msg.data);
        }
    }
});