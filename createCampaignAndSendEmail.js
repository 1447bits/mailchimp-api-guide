export async function createCampaignAndSendEmail(API_KEY, LIST_ID, TEMPLATE_ID , SERVER, template_variables, emailInfo) {

  const client = require("@mailchimp/mailchimp_marketing");

  client.setConfig({
    apiKey: API_KEY,
    server: SERVER,// e.g., us19
  });

  function formatDateString(input) {
    const [datePart, timePart] = input.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    const date = new Date(year, month - 1, day, hours, minutes);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    return formattedDate;
  }

  try {

    const response = await client.campaigns.create({
      type: "regular",
      recipients: {
        list_id: LIST_ID,
      },
      settings: {
        subject_line: emailInfo.subject,
        preview_text: emailInfo.prevText,
        title: emailInfo.campaignTitle,
        template_id: TEMPLATE_ID,
        from_name: "flipkart minutes",
        reply_to: "team@minutesofthemeeting.ai"
      },
      tracking: {
        opens: true,
        html_clicks: true,
        text_clicks: true,
        goal_tracking: true,
      },
      content_type: "template"

    });
    const CAMPAIGN_ID = response.id
    console.log("response.id", CAMPAIGN_ID);

    try {
      await client.campaigns.setContent(CAMPAIGN_ID, {
        template: {
          sections: {
            meeting_title: template_variables.meeting_title,
            meeting_date_and_time: formatDateString(template_variables.meeting_date_and_time),
            recap_link: `<a href="${template_variables.recap_link}"><img width="180px" src="https://mcusercontent.com/aade6b52d844cf110c8b13a78/images/4950e439-739e-8d15-bfa5-13545ee82b04.png" alt="view recap"></a>`,
            people: template_variables.people,
            offers: template_variables.offers,
            Jargons: template_variables.Jargons,
            product_image_one: `<a href="${template_variables.product_url_one}"><img src="${template_variables.product_image_one}" alt="Product" style="width: 100%; max-width: 150px;"></a>`,
            product_image_two: `<a href="${template_variables.product_url_two}"><img src="${template_variables.product_image_two}" alt="Product" style="width: 100%; max-width: 150px;"></a>`,
            claimOffers_link: `<a href="${template_variables.claimOffers_link}"><img width="180px" style="margin: 30px 0" src="https://mcusercontent.com/aade6b52d844cf110c8b13a78/images/fe91d698-2cd5-4351-9113-4b1f27567aea.png" alt="claim offers"></a>`,
            winner_one: template_variables.winner_one,
            winner_two: template_variables.winner_two,
            winner_one_offers: `${template_variables.winner_one_offers} offers`,
            winner_two_offers: `${template_variables.winner_two_offers} offers`,
            meet_summary: template_variables.meet_summary,
            meetingSummary_link: `<a href="${template_variables.meetingSummary_link}" aria-label="meeting summary"><img width="180px" src="https://mcusercontent.com/aade6b52d844cf110c8b13a78/images/09e98133-f1d2-9208-4e94-7b69861d1333.png" alt="see more"></a>`,
          },
          id: TEMPLATE_ID
        }
      });
    } catch {
      return { success: false, message: "some error occurred while setting content of template" }
    }


    try {
      await client.campaigns.send(response.id);
    } catch {
      return { success: false, message: "some error occurred while sending email" }
    }
  }

  catch {
    return { success: false, message: "some error occurred while creating campaign" }
  }
  return { success: true, message: "campaign created and email sent successfully!" }

};


// // example usage
// const emailInfo = {
//   subject: "subject",
//   prevText: "prev test",
//   campaignTitle: "new campaign for test api",
// }

// template_variables = {
//   product_url_one: "#",
//   product_url_two: "#",
//   meeting_title: "title example",
//   meeting_date_and_time: "20/20/20 22:00",
//   recap_link: "#",
//   people: "2",
//   offers: "2",
//   Jargons: "2",
//   product_image_one: "#",
//   product_image_two: "#",
//   claimOffers_link: "#",
//   winner_one: "sam",
//   winner_one_offers: "12",
//   winner_two: "sam",
//   winner_two_offers: "100",
//   meet_summary: "summary",
//   meetingSummary_link: "#",
// }

// const LIST_ID = 'xxxxxxxx';
// const TEMPLATE_ID = 000000000;
// const API_KEY = 'xxxxxxxx'
// const SERVER = 'us00'


// createCampaignAndSendEmail(API_KEY, LIST_ID, TEMPLATE_ID , SERVER, template_variables, emailInfo)