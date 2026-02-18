// ==UserScript==
// @name         Search Google Maps Back
// @name:fr      Retour de Google Maps Dans Recherche
// @namespace    http://tampermonkey.net/
// @version      202602181
// @description  This script bring google maps button back, makes search maps (big/mini and micro one) clickable and adds Open in Maps button back. It might not work anymore in a few months and need an update so feel free to update it whenever you want, I'll try to do it whenever I can.
// @description:fr Ce script remet le bouton google maps, rend les cartes de recherche (grandes/mini et micro) cliquables et ajoute le bouton Open in Maps (Ouvrir sur Maps) aux grandes cartes. Il se peut qu'il ne fonctionne plus dans quelques mois et qu'une mise à jour soit nécessaire, alors n'hésitez pas à le mettre à jour quand vous le souhaitez, pour ma part je le ferai dès que possible.
// @author       Morgan Bouyakhlef - https://github.com/mimoklef
// @match        https://www.google.com/search*
// @include      https://www.google.tld/search*
// @icon         https://i.ibb.co/RcMNxV3/gmback.jpg
// @grant        none
// @license MIT

// @downloadURL https://update.greasyfork.org/scripts/513482/Search%20Google%20Maps%20Back.user.js
// @updateURL https://update.greasyfork.org/scripts/513482/Search%20Google%20Maps%20Back.meta.js
// ==/UserScript==
//Link to the git repo : https://github.com/mimouy/Search-Google-Maps-Back

(function() {
    'use strict';
        let addedButton = false;




    function addBigMapButton() {


        if (addedButton){
            return null;
        }


        //Get the search query
        const searchQuery = new URLSearchParams(window.location.search).get('q');

        //Use the search query as a link
        const mapsLink = `https://www.google.com/maps?q=${searchQuery}`;

        //Big expandable map change direction to open in maps

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
                        newDiv.innerHTML = ` <span>
                        <span style="height:20px;line-height:20px;width:20px" class="z1asCe Y5lOv">
                        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"></path>
                        </svg>
                    </span>
                </span>`
            ;
                        // Replace it
                        pouqwdElement.parentNode.replaceChild(newDiv, pouqwdElement);
                        addedButton = true;
                    }

                } else if (aElements.length > 1) {
                    //There are two elements so I think there's no need to do anything, as the second one must be "Open in Maps" button
                } else {
                    //No <a> found ?
                }


            }else {
                //No "EeWPwe" found ?
            }






    }


function addMapsButton() {
  // --- 1) Select the container
  const possibleContainers = [
    document.querySelector('div[role="navigation"] div[role="list"]'),
    document.querySelector('.MUFPAc'),
    document.querySelector('.nfdoRb'),
    document.querySelector('.T47uwc'),
    document.querySelector('.NZmxZe'),
    document.querySelector('.crJ18e'),
  ];
  const tabsContainer = possibleContainers.find(Boolean);
  if (!tabsContainer) return;

  // --- 2) Verify if any maps button
  if (tabsContainer.querySelector('.gmaps-tab-custom')) return;

  // --- 3) Creating Maps Link
  const searchQuery = new URLSearchParams(location.search).get('q');
  if (!searchQuery) return;
  const mapsLink = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;

  // --- 4) Creating an item
  const anyTabLink =
    tabsContainer.querySelector('a.nPDzT') ||
    tabsContainer.querySelector('a[href*="tbm="]') ||
    tabsContainer.querySelector('a');

  if (!anyTabLink) return;

  const listItem = anyTabLink.closest('[role="listitem"]') || anyTabLink.parentElement;
  if (!listItem) return;

  const mapsListItem = listItem.cloneNode(true);
  mapsListItem.classList.add('gmaps-tab-custom');

  const mapsA = mapsListItem.querySelector('a') || mapsListItem;
  if (mapsA.tagName.toLowerCase() !== 'a') {
    // If the clone doesn't have an <a>
    mapsListItem.innerHTML = '';
    const a = document.createElement('a');
    a.href = mapsLink;
    a.className = 'nPDzT T3FoJb';
    const t = document.createElement('div');
    t.className = 'YmvwI';
    t.textContent = 'Maps';
    a.appendChild(t);
    mapsListItem.appendChild(a);
  } else {
    mapsA.href = mapsLink;

    // Updated Google selectors
    const label =
      mapsListItem.querySelector('.YmvwI') ||
      mapsListItem.querySelector('[aria-label]') ||
      mapsListItem.querySelector('span') ||
      mapsListItem;

    if (label) label.textContent = 'Maps';
  }

  // --- 5) Inserting button after All tab
  const allTab =
    tabsContainer.querySelector('[aria-current="page"]')?.closest('[role="listitem"]') ||
    tabsContainer.querySelector('[role="listitem"]') ||
    tabsContainer.firstElementChild;

  if (allTab && allTab.nextSibling) tabsContainer.insertBefore(mapsListItem, allTab.nextSibling);
  else tabsContainer.appendChild(mapsListItem);
}



            window.addEventListener('load', () => {
                addMapsButton();
                addBigMapButton();
            });

    // Call the function to add the button
})();