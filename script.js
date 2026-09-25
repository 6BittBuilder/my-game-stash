document.addEventListener("DOMContentLoaded", () => {

    fetch("games.json")
        .then(response => response.json())
        .then(games => {

            const container = document.getElementById("games-container");

            games.forEach(game => {

                const button = document.createElement("button");

                button.className = "game-btn";
                button.innerText = game.name;

                button.onclick = () => {
                    launchGame(game.url);
                };

                container.appendChild(button);
            });

        })
        .catch(error => {
            console.error("Could not load games:", error);
        });

});


function launchGame(gameUrl) {

    const newTab = window.open("about:blank", "_blank");

    if (!newTab) {
        alert("Pop-up blocked! Please allow pop-ups for this site.");
        return;
    }

    const doc = newTab.document;

    doc.body.style.margin = "0";
    doc.body.style.height = "100vh";
    doc.body.style.overflow = "hidden";
    doc.body.style.backgroundColor = "black";

    const iframe = doc.createElement("iframe");

    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.style.height = "100%";

    iframe.src = gameUrl;

    doc.body.appendChild(iframe);
}