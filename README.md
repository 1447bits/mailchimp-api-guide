# Mailchimp Integration API Documentation

This documentation covers three main modules for interacting with Mailchimp's API: creating audiences, adding contacts, and managing email campaigns.

## install

`bun install @mailchimp/mailchimp_marketing`

(or)

`npm install @mailchimp/mailchimp_marketing`

## Common Parameters

These parameters are used across multiple functions:

- `API_KEY` (string): Your Mailchimp API key
- `SERVER` (string): Your Mailchimp server prefix (e.g., "us20")

## Module 1: Create Audience

### `createAudience(API_KEY, SERVER, campaignDetails)`

Creates a new audience list in Mailchimp.

#### Parameters

- `campaignDetails` (object): Configuration for the new audience
  - `name` (string): Name of the audience list
  - `permission_reminder` (string): Permission reminder text
  - `contact` (object): Contact information for the list
  - `campaign_defaults` (object): Default campaign settings

#### Returns

- Success: `{ id: string }` - Object containing the new audience list ID
- Error: `null`

#### Example Usage

```javascript

const campaignDetails = {
    name: string,
    permission_reminder: string,
    contact: {
        company: string,
        address1: string,
        city: string,
        country: string,
        state: string,
        zip: number
    },
    campaign_defaults: {
        from_name: string,
        from_email: string, // use default email
        subject: string, 
        language: string,
    },
}


createAudience(API_KEY, SERVER, campaignDetails);
```

## Module 2: Add Contacts to Audience

### `addContactsToAudience(API_KEY, SERVER, listId, subscribingUser)`

Adds a single contact to an existing audience list.

#### Parameters

- `listId` (string): The ID of the audience list
- `subscribingUser` (object): User information
  - `email` (string): User's email address
  - `firstName` (string): User's first name
  - `lastName` (string): User's last name

#### Returns

- Success: `{ id: string }` - Object containing the new member ID
- Error: `null`

#### Example Usage

```javascript
const listId: string;
const subscribingUserList = [{
    firstName: string,
    lastName: string,
    email: string, 
}];


subscribingUserList.forEach(async (subscribingUser) => { await addContactsToAudience(API_KEY, SERVER, listId, subscribingUser) })
```

## Module 3: Create Campaign and Send Email

### `createCampaignAndSendEmail(API_KEY, LIST_ID, TEMPLATE_ID , SERVER, template_variables, emailInfo)`

Creates an email campaign using a template and sends it immediately.

#### Parameters

- `template_variables` (object): Variables to populate the email template
  - `meeting_title` (string): Title of the meeting
  - `meeting_date_and_time` (string): Date and time in format "DD/MM/YYYY HH:mm"
  - `recap_link` (string): URL for the meeting recap
  - `people` (string): People involved
  - `offers` (string): Offers information
  - `Jargons` (string): Jargon definitions
  - `product_image_one` (string): URL of first product image
  - `product_url_one` (string): URL for first product
  - `product_image_two` (string): URL of second product image
  - `product_url_two` (string): URL for second product
  - `claimOffers_link` (string): URL for claiming offers
  - `winner_one` (string): First winner information
  - `winner_two` (string): Second winner information
  - `winner_one_offers` (string): First winner's offers count
  - `winner_two_offers` (string): Second winner's offers count
  - `meet_summary` (string): Meeting summary text
  - `meetingSummary_link` (string): URL for full meeting summary

- `emailInfo` (object): Email campaign settings
  - `subject` (string): Email subject line
  - `prevText` (string): Preview text
  - `campaignTitle` (string): Campaign title

- `LIST_ID` (string): Target audience list ID
- `TEMPLATE_ID` (string): Mailchimp template ID to use

#### Returns

- Success: `{ success: true, message: "campaign created and email sent successfully!" }`
- Error: `{ success: false, message: string }` with specific error message

#### Example Usage

```javascript
const emailInfo = {
  subject: string,
  prevText: string,
  campaignTitle: string,
}

template_variables = {
  product_url_one: string,
  product_url_two: string,
  meeting_title: string,
  meeting_date_and_time: Date,
  recap_link: string, // url
  people: number,
  offers: number,
  Jargons: number,
  product_image_one: string, // url
  product_image_two: string, // url
  claimOffers_link: string, // url
  winner_one: string, // name
  winner_one_offers: number,
  winner_two: string,// name
  winner_two_offers: number, 
  meet_summary: string,
  meetingSummary_link: string, // url
}

LIST_ID: string
TEMPLATE_ID: string
API_KEY: string
SERVER: string


createCampaignAndSendEmail(API_KEY, LIST_ID, TEMPLATE_ID , SERVER, template_variables, emailInfo)

```

## Error Handling

All modules include error handling and will:
- Log errors to the console
- Return `null` or an error object with `success: false` and an error message
- Not throw exceptions to the calling code

## Notes

- The email campaign module uses a predefined template with specific sections
- All image URLs in the template must be accessible
- The "from_name" is set to "flipkart minutes" and reply-to email is fixed
- Date formatting is handled automatically for the meeting date and time