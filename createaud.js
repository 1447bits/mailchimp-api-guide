const client = require("@mailchimp/mailchimp_marketing");

export async function createAudience (API_KEY, SERVER, campaignDetails) {

    client.setConfig({
        apiKey: API_KEY,
        server: SERVER,
    });

    try {
        const response = await client.lists.createList({
            name: campaignDetails.name,
            permission_reminder: campaignDetails.permission_reminder,
            email_type_option: true,
            contact: campaignDetails.contact,
            campaign_defaults: campaignDetails.campaign_defaults
        });

        return { id: response.id }
    }
    catch (err) {
        console.log(err)
        return null
    }
};


// // example usage
// const API_KEY = 'xxxxxxxx';
// const SERVER = 'us19';

// const campaignDetails = {
//     name: "xxxxxxxx",
//     permission_reminder: "You are receiving this email because you opted in via our website.",
//     contact: {
//         company: "flipkart minutes",
//         address1: "address1",
//         city: "mumbai",
//         country: "India",
//         state: "maharashtra",
//         zip: "00000"
//     },
//     campaign_defaults: {
//         from_name: "xxxxxxxx",
//         from_email: "your-email", // default email
//         subject: "subject", 
//         language: "language",
//     },
// }


// createAudience(API_KEY, SERVER, campaignDetails);
