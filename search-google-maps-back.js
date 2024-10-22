// ==UserScript==
// @name         Search Google Maps Back
// @namespace    http://tampermonkey.net/
// @version      2024-10-22
// @description  This script bring google maps button back, makes search maps (big/mini and micro one) clickable and adds Open in Maps button back. It might not work anymore in a few months and need an update so feel free to update it whenever you want.
// @author       Mimouy | Mimo (Mohamed) Bouyakhlef
// @match        https://www.google.com/search*
// @include      https://www.google.tld/search*
// @icon         https://i.ibb.co/RcMNxV3/gmback.jpg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addMapsButton() {

        // Find the list container of existing tabs
        const tabsContainer = document.querySelector('.crJ18e');

        //Get the search query
        const searchQuery = new URLSearchParams(window.location.search).get('q');

        //Use the search query as a link
        const mapsLink = `//maps.google.com/maps?q=${searchQuery}`;


        // Adding the Maps button to the tab if not already in
        if (tabsContainer) {

            // Check if already has a Maps button
            let hasGoogleMapsLink = false;
            tabsContainer.querySelectorAll('a').forEach(link => {
                if (link.href.includes('google.com/maps')) {
                    hasGoogleMapsLink = true;
                }
            });
            if (hasGoogleMapsLink) {
                //Already has a Maps button
            } else {

                // Create the Maps button elements (updated)
                const mapsListItem = document.createElement('div');
                mapsListItem.jsname = 'VIftV';
                // mapsListItem.classList.add('Ap1Qsc');
                mapsListItem.setAttribute('role', 'listitem');

                // Replace this entire section with the provided <a> element
                const mapsButton = document.createElement('a');
                mapsButton.href = mapsLink;
                mapsButton.jsname = "ONH4Gc";
                mapsButton.classList.add("LatpMc");
                mapsButton.classList.add("nPDzT");
                mapsButton.classList.add("T3FoJb");
                mapsButton.dataset.navigation = "server";
                mapsButton.dataset.hveid = "CAEQCA";


                //mapsButton.textContent = "Maps"; // Set the inner text if need to
                const mapsButtonText = document.createElement('div');
                mapsButtonText.jsname = "bVqjv";
                mapsButtonText.classList.add("YmvwI");
                mapsButtonText.textContent = "Maps";
                mapsButton.appendChild(mapsButtonText);

                // Append the mapsButton to the list item
                mapsListItem.appendChild(mapsButton);

                // Insert the Maps button after the All button
                const firstTabsChild = tabsContainer.firstElementChild;
                firstTabsChild.insertBefore(mapsButton, firstTabsChild.children[1]);

            }

        }




        // Find the small map element if any, to map it clickable
        const smallMapElement = document.querySelector('.KY6ERe');

        if (smallMapElement) {
            // Look for the links (or div) parent
            const targetElement = smallMapElement.querySelector('.ZqGZZ.xP81Pd');

            //Look for the micro map image
            if (targetElement) {

                    //Is the mini map image a link ?
                if (targetElement.tagName.toLowerCase() === 'a') {
                    //Mini map is already a link, nothing to do
                }else{

                    //Create a new Map image which will be a link
                    let newMapImage = document.createElement('a');
                    let parent = targetElement.parentNode;
                    let children = targetElement.childNodes;
                    // Copy all attributes and childs to the newMapImage
                    Array.prototype.forEach.call(targetElement.attributes, function (attr) {
                        newMapImage.setAttribute(attr.name, attr.value);
                    });
                    Array.prototype.forEach.call(children, function (elem) {
                        newMapImage.appendChild(elem);
                    });
                    newMapImage.href = mapsLink;
                    //Replace old image by the new (link) one
                    parent.replaceChild(newMapImage, targetElement);

                }

            } else {
                //
            }
        } else {
            //No small map
        }


                // Find the micro map element if any, to make it clickable
        const microMapElement = document.querySelector('.Ggdpnf.kno-fb-ctx');

        if (microMapElement) {
            // Look for the link's (which is a div if none) parent
            const microTargetElement = microMapElement.querySelector('* > * > a');

            if (microTargetElement) {

                if (microTargetElement.tagName.toLowerCase() === 'a' && microTargetElement.hasAttribute('href')) {
                    //Micro map is already a link, nothing to do

                }else{
                    //Micro map is not a link (do not have a href)
                    microTargetElement.href = mapsLink;

                    // Create the Zoom icon div
                    const newDiv = document.createElement('div');
                    newDiv.setAttribute('jscontroller', 'hnlzI');
                    newDiv.setAttribute('class', 'sEtYzd duf-h TUOsUe BSRXQc sxd9Pc');
                    newDiv.setAttribute('jsaction', 'KQB0gd;rcuQ6b:npT2md');
                    newDiv.setAttribute('data-ved', '2ahUKEwjo44_p66CJAxXtFFkFHcHlDIUQkNEBegQIUxAJ');

                    // Create img element (zoom icon) inside the div
                    const img = document.createElement('img');
                    img.setAttribute('class', 'kf0xcf oYQBg FIfWIe Tbiej u60jwe');
                    img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAgMAAAAog1vUAAAACVBMVEUAAACaoKaaoKZGj4K4AAAAA3RSTlMA/58J4rd5AAAAdUlEQVR4AeXPAQaEYBgG4RGLDhJ7nIVJgI7SJdrzBsA/ABF6AYPH9/GufVRvSsCZNJk0Ny2roTZD7YY6DIWhMBSGwlAYCkMlHYz7k315er2gd+YbYW5aVsZ0bmOa3IcUCkNhKAyFoTAUhsJQGApDofq7Ib1hF4lkK+5yFPqsAAAAAElFTkSuQmCC');
                    img.setAttribute('alt', '');
                    img.setAttribute('height', '24');
                    img.setAttribute('width', '24');
                    img.setAttribute('data-csiid', 'nQAXZ6ihIe2p5NoPwcuzqAg_9');
                    img.setAttribute('data-atf', '0');
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
                    `;

                    // Append the img to the Zoom div
                    newDiv.appendChild(img);
                    // Find the gImg element
                    const gImgElement = microTargetElement.querySelector('g-img');

                    // Insert the zoom icon right after the gImh element so it shows on it (top right)
                    if (gImgElement) {
                        gImgElement.parentNode.insertBefore(newDiv, gImgElement.nextSibling);
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




        //Big expandable map change direction to open in maps

        // Wait for the page to load entirely
        window.addEventListener('load', () => {

            // Find the big map's buttons div class="EeWPwe", which contains Direction and Open in maps
            const bigMapButtonsElement = document.querySelector('.EeWPwe');

            if (bigMapButtonsElement) {
                // Find all bigMapButtonsElement a childs (which are Direction and Open in Maps buttons)
                const aElements = bigMapButtonsElement.querySelectorAll('a');




                // If there is only one <a> = No Open in maps button, only Direction one
                if (aElements.length === 1) {
                    // Clone it
                    const clonedAElement = aElements[0].cloneNode(true);

                    // Change the link for Direction to Maps one
                    if (clonedAElement.href.includes('maps/dir/')) {
                        clonedAElement.href = mapsLink;
                    }

                    // Add the clone
                    aElements[0].parentNode.insertBefore(clonedAElement, aElements[0].nextSibling);

                    // Find the element with "m0MNmc" which contains text "Direction" and change it to Open in Maps (Sorry for ppl who have their google in other langages)
                    const m0MNmcSpan = clonedAElement.querySelector('.m0MNmc');
                    if (m0MNmcSpan) {
                        m0MNmcSpan.textContent = 'Open in Maps'; //You can put whatever you want here, if you want it to show in another langage
                    }

                    // Find the "POUQwd WN4Zxc" span in the clone, which is the icon one, and change it to Maps icon
                    const pouqwdElement = clonedAElement.querySelector('.POUQwd.WN4Zxc');
                    if (pouqwdElement) {
                        // Create maps icon
                        const newDiv = document.createElement('div');
                        newDiv.className = 'POUQwd WN4Zxc';
                        newDiv.innerHTML = `
                <span>
                    <span style="height:20px;line-height:20px;width:20px" class="z1asCe Y5lOv">
                        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"></path>
                        </svg>
                    </span>
                </span>
            `;
                        // Replace it
                        pouqwdElement.parentNode.replaceChild(newDiv, pouqwdElement);
                    }

                } else if (aElements.length > 1) {
                    //There are two elements so I think there's no need to do anything, as the second one must be "Open in Maps" button
                } else {
                    //No <a> found ?
                }


            }else {
                //No "EeWPwe" found ?
            }

        });


    }


    // Call the function to add the button
    addMapsButton();
})();