<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/19T05ILw_aap-MJWGa0Bub2E327XjUwmW

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev` 

---

To access the different portals in the MobiTech Elite system, use the following credentials:
## 🛠️ Admin Dashboard

To see the inventory management and sales analytics, you first need to trigger the Secret Admin Terminal:

    Go to the Top-Right Corner of your browser window.

    Click 4 times rapidly in that empty corner.

    On the red terminal screen, enter:

       ``` Email: admin@mobitech.com

        Password: admin123 ```

## 👤 User (Customer) Portal

To view order history and profile settings, use the regular Sign In button in the navbar:

    Email: user@example.com (or any email)

    Password: any_password ```

    Note: Since this is an industry-level simulation, the customer login accepts any credentials to allow for easy testing of the checkout flow, or you can create a unique account via the Register page.

🛒 Checkout Flow

If you want to test the Secure Checkout, simply add items to your cart and click "Secure Checkout". You can enter any mock data for the credit card (e.g., 4242 4242 4242 4242) to complete the "Order Confirmed" experience.
