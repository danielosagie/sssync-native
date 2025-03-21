Okay, let's create a comprehensive PRD for the expanded React Native app, incorporating all the features you've described and focusing on Sssync's purpose and target audience. We'll still aim for rapid development, but we'll increase the scope slightly to reflect the core value proposition.

**Product Requirements Document: Sssync React Native App (Expanded MVP)**

**1. Introduction**

*   **Project Name:** Sssync React Native App (Expanded MVP)
*   **Mission:** Millions of businesses sell online, but it's complicated and hard to grow into more, especially for newcomers. Sssync makes it easier for them to get started where they are, expand their sales on new platforms, and even create their own online marketplaces & fulfillment networks.
*   **Tagline:** Sync, Partner, & Fulfill
*   **Target Audience:**
    *   Small to medium-sized online businesses selling across multiple platforms.
    *   Businesses looking to expand their sales channels and partner with other local merchants.
    *   Sellers struggling with inventory management and cross-platform synchronization.
*   **Value Proposition:**
    *   Multi-Platform Inventory Sync: Migrate & sync simultaneously between Square, Shopify, Clover, and coming soon Amazon (adding more soon).
    *   Partner Store Collaboration: Team up with other local merchants to share inventory and fulfill orders, avoiding overbuying inventory & increasing product availability.
    *   Sell Excess Inventory: Easily list surplus stock for other retailers to buy/route demand to you, helping you recoup that inventory cost.
    *   Automated Documents/Payouts: We deal with the boring stuff by setting up fair documents for everyone involved, and making sure everyone gets paid appropriately.
    *   Simple & Clean: No complicated setup/maintenance. Track all your transactions, orders, and inventory across all platforms in one easy-to-use spot.
*   **Monetization:** Simple & competitive monthly subscriptions and a small fee (1.5%) when stores sell products through the partner network.
*   **Core Tenets:** Make money by helping customers make more money
*   **Inspiration:** Craft Writing App,Sellraze app, Facebook Marketplace, Public Stock Trading App
*   **Success Metrics:**
    *   Number of successful listings created.
    *   Number of active users.
    *   Number of product sales through the partner network.
*   **Non-Goals:**
    *   Advanced analytics or reporting.
    *   Highly customizable settings.
    *   Complex partnership agreements.
*   **Timeframe:** 2 weeks (slightly longer than the initial "spike")

**2. High-Level Overview**

The app should allow a user to:

*   **(Same):** Create a new product listing with a title, description, image, and price.
*   **(Same):** View a list of existing products (fetched from Gadget.dev).
*   **(Same):** Edit the title, description, image, and price of an existing product.
*   **Sell Items on:** Send product to Shopify, Square, eBay, Facebook Marketplace, Depop, Whatnot, and Etsy
*   **Manage Inventory:** All items sync with your account, and across partner account
*   **(NEW):** View a marketplace of products listed by other sellers.
*   **(NEW):** Browse products listed by other sellers and contact them about buying.
*   **(NEW):** Select platforms on which to list a product (Shopify, Square, eBay, etc.).
*   **(NEW):** Manage their inventory across connected platforms.
## Sell Items on
*    UI: A list of checkboxes/toggles will be below the "List It On" section of your items that will appear on the site, when these boxes are tapped, there will be logic that goes to specific accounts connected
**(NEW):** Link to sell products on (Shopify, Square, eBay, Facebook Marketplace, Depop, Whatnot, and Etsy.)
*   **(NEW):** Create Product on the "Shopify API" - This must be done for each product

**3. Detailed Requirements**

**3.1. Core Features**

*   **Listing Creation:**
    *   **(Same):** UI: A "Create Listing" screen with the standard fields (title, description, image, price).
        *       *   **(NEW)**"List on" : Check Box that allows you to choose platforms to push listing to (Shopify, Square, eBay, Facebook Marketplace, Depop, Whatnot, and Etsy.)
                *        checkbox: if not activated there can be a lock beside it, that when activated, gives a message about integration (Shopify, Square, eBay, Facebook Marketplace, Depop, Whatnot, and Etsy)
                *           checkbox tapped: API pushes item to respective accounts
            * "Submit" button creates product,
           - **UI**: Check Boxes Below "List It On" section (See Figma Design that matches)
                **checkbox that pushes API to platforms, Shopify, Square, eBay, Facebook Marketplace, Depop, Whatnot, and Etsy, (checkboxes are not selected, message on tap says "Link [Ebay/Shopify] API here. To list it on the platform make sure it is also connected to the inventory.**

*   **Inventory List:**
    *   **(Same):** UI: A list of products, fetched from Gadget.dev (shadcn `DataTable` or a custom list with `Card` components)
    *        **(NEW)** A toggle on the top right, changes colors when you switch which are all available products
      " toggle switch" shows available other items to purchase from those merchants"

*   **Product Details:**
    *   **(Same):** UI: A screen displaying the details of a single product.
                **(NEW)** Below are all integrations and a checklist (Check means posted live on the page) (Shopify, Square, eBay, Facebook Marketplace, Depop, Whatnot, and Etsy.) Check means it's live and being listed.
*        **(NEW)** UI: Displays API Connections (Shopify, Square, eBay, Facebook Marketplace, Depop, Whatnot, and Etsy.) Check means its connected
*        **(NEW)** UI: At Top Right are Profile Details

*   **Edit Listing:**
    *   **(Same):** UI: Similar to the "Create Listing" screen, but pre-populated with the existing product data. (title, description, image, price, Shopify (Check Box, with details about API) , Square(Check Box, with details about API) , eBay(Check Box, with details about API), Facebook Marketplace(Check Box, with details about API) , Depop(Check Box, with details about API), Whatnot(Check Box, with details about API), and Etsy (Check Box, with details about API))
**(NEW)** UI on the edit menu and shop, shop items (Shopify, Square, eBay, Facebook Marketplace, Depop, Whatnot, and Etsy.)
  **(NEW)** API Link for each to activate.
*UI (for those shops a profile that can be used, and see integration status)

*   **Marketplace (Viewing Other Sellers' Products):**

    *   **UI:** A screen displaying a feed of products listed by other sellers (Facebook Marketplace Style Layout). Use Card Like Components.
        **(NEW)** Toggle on top to activate seller, or "I'm only here to buy" toggle at the top left
        **(NEW)**UI/UX with filters at the top
**(NEW)**  UI"A search bar with auto completion of sellers or names (just top line)
           *       **(NEW)**   * UI : On Tapping, it switches from buyer or seller view to buyer so they can find other items (this toggle should appear on list view also)
- **marketplace page UI
**
 *     A grid of items laid out by the sellers on the platform
           *
On Items you tap to view items in a shop.
      - UI on tapping shop view all items on a grid.
           *  When Tapped is navigates the user to the shop (like a vendor on Etsy that you can see everythign)
           *      - Button (on tapping sends message) with popup messages and fields to message with the name of item

*   **Messaging (Contacting Sellers):**

    *   **UI:** When tapping a product in the marketplace, a "Contact Seller" button should appear.
    *   **Functionality:**
        *   Tapping "Contact Seller" should open a modal or screen with a simple messaging interface (just text input and a send button).
        *   This MVP will *not* implement real-time messaging. Simply display a confirmation message that the message was sent.

    *This feature may be cut

**3.2. UI and UX**

*   **(Same):** Overall Style: Clean, minimal, and modern, heavily inspired by Sellraze's app design. Use shadcn-ui components as the foundation.
*** UI
 *    Dark Mode
 *   Tab Bottom Menu

*   **Navigation:** Bottom navigation as we discusse with Shadcn Like elements.

*   **Image Handling:**
-        **(Same):** Use `react-native-image-picker` or `expo-image-picker`

**(NEW)** Start to mirror the basic UI of FaceBook Marketplace

**(NEW)** Bottom Tab menu with create, store, dashboard/settings menu, (think face book market place)

**3.3. Technical Requirements**

**(SAME)** React Native: Use the latest stable version of React Native.

4.  **Gadget.dev Integration**

*        **(Same):** Use Gadget.Dev

5.  **Prioritization and Scope**

High Priority
*  *  Sell and Sync on Multiple platforms (Shopify, Square, eBay, Facebook Marketplace, Depop, Whatnot, and Etsy).
Low Priority (Do not implement for MVP, but important to keep in mind)
*       " Shopify Inventory Widget
 *         Inventory Sharing & Order Routing
         Automated Partnerships
    *   AI-powered autofill

6.  **Release Criteria**

To be released all "high priorities" must have functionality to be a released.

*To start with there's only two buttons (buy or sell) after authentication that you use.*

## Initial Implementation Strategy

This approach focuses on creating a functional, yet simplified mobile MVP. By using shadcn and the "facebook marketplace" look, we will make something quickly and easy to use.

By following these steps, you can set the stage for the future of your multi-platform service. Let me know any other details.
