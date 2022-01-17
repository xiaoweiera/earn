export default {
  title: "Project Application Form",
  description: "KingData New DApp Ranking is a curation of the best new dapp products, every day. Discover the latest DApps, websites, Games, DeFi and NFT that everyone's talking about. ",
  submit: "Submit",
  label: {
    logo: "Logo or Pictures",
    name: "Project Name",
    website: "Official Website",
    categories: "Project Type",
    chains: "Public Chain",
    description: "Project Introduction",
    comment: "Recommended reason",
    online_time: "Release Date",
    online_timezone: "Time Zone",
    telegram: "Telegram",
    discord: "Discord",
    twitter: "Twitter",
    username: "Your Name",
    contact: "Email or Tel",
    audit: {
      name: "Audit Website",
      url: "Audit Website"
    }
  },
  placeholder: {
    name: "", // Please enter the project name
    website: "", // Please enter the official website link
    description: "", // Please enter the project description
    comment: "", // The content will appear in the "Project Evaluation" area in the form of evaluation
    online_time: "", // Please select the online time
    online_timezone: "", // Please select a time zone
    telegram: "", // Please enter the project Telegram link
    discord: "", // Please enter the project Discord link
    twitter: "", // Please enter the project Twitter link
    username: "", // Your Name
    contact: "", // Email or Tel
    audit: {
      name: "Audit company's name ",
      url: "Link"
    }
  },
  rules: {
    required: "Required",
    checkbox: "Choose at least one",
    url: "Please fill in the platform link"
  },
  tips: {
    error: 'The server is abnormal, please try again later!',
    confirm: "OK",
    title: "Success",
    content: "The application will be reviewed within 1 working day. ",
    message: `My project is included by KingData! 
https://kingdata.com/dapp/{id} 
You take a look`,
  }
}
