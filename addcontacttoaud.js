export async function addContactsToAudience(API_KEY, SERVER, listId, subscribingUser) {

    const client = require("@mailchimp/mailchimp_marketing");

    client.setConfig({
        apiKey: API_KEY,
        server: SERVER,
    });

    try {
        const response = await client.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });

        return { id: response.id }
    }
    catch (err) {
        console.error(err)
        return null
    }
}

// // example usage
// const listId = "xxxxxxxx";
// const subscribingUserList = [{
//     firstName: "username",
//     lastName: "userlastaname",
//     email: "your-email"
// }];

// const API_KEY = 'xxxxxxxx';
// const SERVER = 'us19';

// subscribingUserList.forEach(async (subscribingUser) => { await addContactsToAudience(API_KEY, SERVER, listId, subscribingUser) })