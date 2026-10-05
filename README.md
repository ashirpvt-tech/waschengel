# WaschEngel — Von der Straße in die Luft

Static, self-contained presentation site. Source and deployable assets are in dist/. GSAP 3.13 and ScrollTrigger are vendored locally. No install or build step required. Native sticky scenes, GSAP scroll scrubbing, mobile touch service controls, reduced-motion fallback, semantic navigation, native dialog controls.

## Content provenance
- https://www.waschengel.de/ — locations, experience, handwork, insurance and FAQs. Retrieved 2026-10-03 UTC.
- https://www.waschengel.de/impressum — company, phone, email, headquarters.
- https://www.waschengel.de/downloads/waschengel-leistungsuebersicht.pdf — service scope. Current home-page locations take precedence over older brochure locations. No prices reproduced.
- User supplied official logo, partnerships, aviation scope and Express concept.

## Before official launch
- Express address supplied by the user on 2026-10-04: Äußere Bayreuther Str. 128, 90411 Nürnberg. Alterlangen removed. Confirm Express operating hours and availability before public visits.
- Replace illustrative generated media with company photography if desired. The before/after comparison was removed.
- Genuine partner logo files from official brand websites are included. Exact source URLs are in partner-logo-sources.json.
- Booking prepares a mailto request, with a telephone fallback; it does not create or confirm a reservation. No customer data is stored by this site.
- Legal links currently point to the existing official website. Adapt legal documents for the final hosting and booking setup before public launch.
- The existing official domain has not been changed.

## Verification
JavaScript syntax, local asset references, section links and duplicate HTML IDs checked. Original and added car/aircraft images inspected and converted to WebP. Official logo assets checked for validity. Browser rendering and real-device performance were not verified because the managed static-site browser preview is unavailable.

## Mobile scroll update
Hero lateral motion and both service/gallery scroll timelines run on mobile. Vertical scrolling remains native; horizontal flicks advance the same timeline. Reduced-motion mode keeps static scenes and a native gallery. The official McLaren black SVG is displayed in white using CSS for dark-background contrast.
