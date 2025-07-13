// ==UserScript==
// @name         Search Google Maps Back
// @name:fr      Retour de Google Maps Dans Recherche
// @namespace    http://tampermonkey.net/
// @version      202507131
// @description  This script bring google maps button back, makes search maps (big/mini and micro one) clickable and adds Open in Maps button back. It might not work anymore in a few months and need an update so feel free to update it whenever you want, I'll try to do it whenever I can.
// @description:fr Ce script remet le bouton google maps, rend les cartes de recherche (grandes/mini et micro) cliquables et ajoute le bouton Open in Maps (Ouvrir sur Maps) aux grandes cartes. Il se peut qu'il ne fonctionne plus dans quelques mois et qu'une mise à jour soit nécessaire, alors n'hésitez pas à le mettre à jour quand vous le souhaitez, pour ma part je le ferai dès que possible.
// @author       Mimouy | Mimo (Mohamed) Bouyakhlef : https://github.com/mimouy
// @match        https://www.google.com/search*
// @include      https://www.google.tld/search*
// @icon         https://i.ibb.co/RcMNxV3/gmback.jpg
// @grant        none
// @license MIT

// @downloadURL https://update.greasyfork.org/scripts/513482/Search%20Google%20Maps%20Back.user.js
// @updateURL https://update.greasyfork.org/scripts/513482/Search%20Google%20Maps%20Back.meta.js
// ==/UserScript==
//Link to the git repo : https://github.com/mimouy/Search-Google-Maps-Back

(function () {
    "use strict";
    let addedButton = false;

    function addBigMapButton() {
        if (addedButton) {
            return null;
        }

        //Get the search query
        const searchQuery = new URLSearchParams(window.location.search).get("q");
        const mapsLink = `https://www.google.com/maps?q=${searchQuery}`;

        // Find the big map's buttons div class="EeWPwe"
        const bigMapButtonsElement = document.querySelector(".EeWPwe");

        if (bigMapButtonsElement) {
            // If there are no <a> children, create both buttons from scratch
            let aElements = bigMapButtonsElement.querySelectorAll("a");
            if (aElements.length === 0) {
                // Create Direction button
                const directionA = document.createElement("a");
                directionA.href = `https://www.google.com/maps/dir//${searchQuery}`;
                directionA.style.cursor = "pointer";
                directionA.className = "XaCzsb";
                directionA.tabIndex = 0;
                // You can set data-url, ping, etc. if needed

                const directionDiv = document.createElement("div");
                directionDiv.className = "la4Yvb ZkkK1e yUTMj k1U36b";

                // Icon
                const directionIconDiv = document.createElement("div");
                directionIconDiv.className = "POUQwd WN4Zxc";
                directionIconDiv.innerHTML = `<span style="height:20px;line-height:20px;width:20px" class="z1asCe QoWzUe"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"></rect></g><g><g><path d="m21.41 10.59-7.99-8a1.993 1.993 0 00-2.83 0l-8.01 8c-.78.78-.78 2.05 0 2.83l8.01 8c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.99-8c.8-.79.8-2.05.01-2.83zM12.01 20 4 12l8-8 8 8-7.99 8z"></path><path d="M8 11v4h2v-3h3.5v2.5L17 11l-3.5-3.5V10H9c-.55 0-1 .45-1 1z"></path></g></g></svg></span>`;

                // Text
                const directionTextDiv = document.createElement("div");
                directionTextDiv.className = "xlY4q VDgVie VIZLse";
                const directionSpan = document.createElement("span");
                directionSpan.className = "m0MNmc";
                directionSpan.textContent = "Directions";
                directionTextDiv.appendChild(directionSpan);

                directionDiv.appendChild(directionIconDiv);
                directionDiv.appendChild(directionTextDiv);
                directionA.appendChild(directionDiv);

                // Create Open in Maps button
                const mapsA = document.createElement("a");
                mapsA.href = mapsLink;
                mapsA.style.cursor = "pointer";
                mapsA.className = "XaCzsb";
                mapsA.tabIndex = 0;

                const mapsDiv = document.createElement("div");
                mapsDiv.className = "la4Yvb ZkkK1e yUTMj k1U36b";

                // Icon
                const mapsIconDiv = document.createElement("div");
                mapsIconDiv.className = "POUQwd WN4Zxc";
                mapsIconDiv.innerHTML = `<span><span style="height:20px;line-height:20px;width:20px" class="z1asCe Y5lOv"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"></path></svg></span></span>`;

                // Text
                const mapsTextDiv = document.createElement("div");
                mapsTextDiv.className = "xlY4q VDgVie VIZLse";
                const mapsSpan = document.createElement("span");
                mapsSpan.className = "m0MNmc";
                mapsSpan.textContent = "Open in Maps";
                mapsTextDiv.appendChild(mapsSpan);

                mapsDiv.appendChild(mapsIconDiv);
                mapsDiv.appendChild(mapsTextDiv);
                mapsA.appendChild(mapsDiv);

                // Append both buttons to the container
                bigMapButtonsElement.appendChild(directionA);
                bigMapButtonsElement.appendChild(mapsA);
                addedButton = true;
            } else if (aElements.length === 1) {
                // ...existing code for single <a> (clone and modify)...
                const clonedAElement = aElements[0].cloneNode(true);
                if (clonedAElement.href.includes("maps/dir/")) {
                    clonedAElement.href = `https://www.google.com/maps/dir//${searchQuery}`;
                }
                aElements[0].parentNode.insertBefore(clonedAElement, aElements[0].nextSibling);
                const m0MNmcSpan = clonedAElement.querySelector(".m0MNmc");
                if (m0MNmcSpan) {
                    m0MNmcSpan.textContent = "Open in Maps";
                }
                const pouqwdElement = clonedAElement.querySelector(".POUQwd.WN4Zxc");
                if (pouqwdElement) {
                    const newDiv = document.createElement("div");
                    newDiv.className = "POUQwd WN4Zxc";
                    newDiv.innerHTML = `<span><span style="height:20px;line-height:20px;width:20px" class="z1asCe Y5lOv"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"></path></svg></span></span>`;
                    pouqwdElement.parentNode.replaceChild(newDiv, pouqwdElement);
                    addedButton = true;
                }
            } else if (aElements.length > 1) {
                // There are two elements so I think there's no need to do anything, as the second one must be "Open in Maps" button
            } else {
                //No <a> found ?
            }
        } else {
            //No "EeWPwe" found ?
        }
    }

    function addMapsButton() {
        if (addedButton) {
            return null;
        }

        // Find the tab bar container
        const tabsContainer = document.querySelector(".beZ0tf.O1uzAe");
        const searchQuery = new URLSearchParams(window.location.search).get(
            "q"
        );
        const mapsLink = `https://www.google.com/maps?q=${searchQuery}`;

        if (tabsContainer) {
            // Prüfe, ob Maps-Button schon existiert
            let hasMaps = false;
            tabsContainer.querySelectorAll("a.C6AK7c").forEach((a) => {
                if (a.href.includes("google.com/maps")) hasMaps = true;
            });
            if (!hasMaps) {
                // Erstelle neuen Button
                const listItem = document.createElement("div");
                listItem.setAttribute("role", "listitem");

                const mapsA = document.createElement("a");
                mapsA.className = "C6AK7c";
                mapsA.href = mapsLink;
                mapsA.setAttribute("jsname", "pxBnId");

                const innerDiv = document.createElement("div");
                innerDiv.setAttribute("jsname", "xBNgKe");
                innerDiv.className = "mXwfNd";

                const span = document.createElement("span");
                span.className = "R1QWuf";
                span.textContent = "Maps";

                innerDiv.appendChild(span);
                mapsA.appendChild(innerDiv);
                listItem.appendChild(mapsA);

                // Add the Maps button after the "All" tab (second position)
                const allItems = tabsContainer.querySelector(
                    'div[role="listitem"]'
                );
                if (allItems && allItems.nextSibling) {
                    tabsContainer.insertBefore(listItem, allItems.nextSibling);
                } else {
                    tabsContainer.appendChild(listItem);
                }
            }
        }

        const smallMapElement = document.querySelector(".KY6ERe");

        if (smallMapElement) {
            // Look for the links (or div) parent
            const targetElement =
                smallMapElement.querySelector(".ZqGZZ.xP81Pd");

            //Look for the small map image
            if (targetElement) {
                //Is the mini map image a link ?
                if (targetElement.tagName.toLowerCase() === "a") {
                    //Mini map is already a link, nothing to do
                } else {
                    //Create a new Map image which will be a link
                    let newMapImage = document.createElement("a");
                    let parent = targetElement.parentNode;
                    let children = targetElement.childNodes;
                    // Copy all attributes and childs to the newMapImage
                    Array.prototype.forEach.call(
                        targetElement.attributes,
                        function (attr) {
                            newMapImage.setAttribute(attr.name, attr.value);
                        }
                    );
                    Array.prototype.forEach.call(children, function (elem) {
                        newMapImage.appendChild(elem);
                    });
                    newMapImage.href = mapsLink;
                    //Replace old image by the new (link) one
                    parent.replaceChild(newMapImage, targetElement);
                    addedButton = true;
                }
            } else {
                //
            }
        } else {
            //No small map
        }

        // Find the micro map element if any, to make it clickable
        const microMapElement = document.querySelector(".luibr");

        if (microMapElement) {
            // Look for the link's (which is a div if none) parent
            const microTargetElement =
                microMapElement.querySelector(".rhsmap4col > a") ||
                microMapElement.querySelector(".rhsmap5col > a");

            if (microTargetElement) {
                if (
                    microTargetElement.tagName.toLowerCase() === "a" &&
                    microTargetElement.hasAttribute("href")
                ) {
                    //Micro map is already a link, nothing to do
                } else {
                    //Micro map is not a link (do not have a href)

                    microTargetElement.href = mapsLink;
                    addedButton = true;

                    // Create the Zoom icon div
                    const newDiv = document.createElement("div");

                    newDiv.setAttribute("jscontroller", "hnlzI");
                    newDiv.setAttribute(
                        "class",
                        "sEtYzd duf-h TUOsUe BSRXQc sxd9Pc"
                    );
                    newDiv.setAttribute("jsaction", "KQB0gd;rcuQ6b:npT2md");
                    newDiv.setAttribute(
                        "data-ved",
                        "2ahUKEwjo44_p66CJAxXtFFkFHcHlDIUQkNEBegQIUxAJ"
                    );

                    // Create img element (zoom icon) inside the div
                    const img = document.createElement("img");

                    img.setAttribute(
                        "class",
                        "kf0xcf oYQBg FIfWIe Tbiej u60jwe"
                    );
                    img.setAttribute(
                        "src",
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAgMAAAAog1vUAAAACVBMVEUAAACaoKaaoKZGj4K4AAAAA3RSTlMA/58J4rd5AAAAdUlEQVR4AeXPAQaEYBgG4RGLDhJ7nIVJgI7SJdrzBsA/ABF6AYPH9/GufVRvSsCZNJk0Ny2roTZD7YY6DIWhMBSGwlAYCkMlHYz7k315er2gd+YbYW5aVsZ0bmOa3IcUCkNhKAyFoTAUhsJQGApDofq7Ib1hF4lkK+5yFPqsAAAAAElFTkSuQmCC"
                    );
                    img.setAttribute("alt", "");
                    img.setAttribute("height", "24");
                    img.setAttribute("width", "24");
                    img.setAttribute("data-csiid", "nQAXZ6ihIe2p5NoPwcuzqAg_9");
                    img.setAttribute("data-atf", "0");
                    newDiv.style.cssText = `
                    background-color: rgba(48, 49, 52, 0.8);
                    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
                    height: 32px;
                    width: 32px;
                    display: block;
                    outline: 0;
                    position: absolute;
                    top: 4px;
                    vertical-align: middle;
                    right: 4px;
                    ;`;

                    // Append the img to the Zoom div
                    newDiv.appendChild(img);
                    // Find the gImg element
                    const gImgElement =
                        microTargetElement.querySelector("g-img");

                    // Insert the zoom icon right after the gImh element so it shows on it (top right)
                    if (gImgElement) {
                        gImgElement.parentNode.insertBefore(
                            newDiv,
                            gImgElement.nextSibling
                        );
                    } else {
                        //no gImg found !?
                    }
                }
            } else {
                //Didn't find the link !?
            }
        } else {
            //No small map
        }

        //lu map section (when yout type an exact address)
        const addressMapElement = document.querySelector(".lu_map_section");
        if (addressMapElement) {
            // Searching for the link containing "maps/dir/"
            const adirElement = document.querySelector('a[href*="maps/dir/"]');
            if (adirElement) {
                // Clone link
                const clonedAElement = adirElement.cloneNode(true);

                clonedAElement.href = mapsLink;

                // Insert the clone which will become a Map button
                adirElement.parentNode.insertBefore(
                    clonedAElement,
                    adirElement.nextSibling
                );

                // Searching the "Direction" text
                const targetDiv =
                    clonedAElement.querySelector(".QuU3Wb.sjVJQd");

                if (targetDiv) {
                    // Changing "Direction" to "Map"
                    const newDiv = document.createElement("div");

                    newDiv.textContent = "Map";
                    targetDiv.innerHTML = "";
                    targetDiv.appendChild(newDiv);

                    // Creating Map SVG element
                    const svgElement = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg"
                    );
                    svgElement.setAttribute("focusable", "false");
                    svgElement.setAttribute(
                        "xmlns",
                        "http://www.w3.org/2000/svg"
                    );
                    svgElement.setAttribute("viewBox", "0 0 24 24");
                    svgElement.style.width = "60%";
                    svgElement.style.fill = "#8ab4f8";

                    const pathElement = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );
                    pathElement.setAttribute(
                        "d",
                        "M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"
                    );
                    svgElement.appendChild(pathElement);

                    //Searching the icon div
                    const svgDiv = clonedAElement.querySelector(".kHtcsd");
                    if (svgDiv) {
                        svgDiv.innerHTML = "";
                        svgDiv.appendChild(svgElement);
                    }
                    addedButton = true;
                }
            } else {
                //No direction link found ?
            }
        } else {
            //No lu_map_section found
        }
    }

    window.addEventListener("load", () => {
        addMapsButton();
        addBigMapButton();
    });

    // Call the function to add the button
})();
