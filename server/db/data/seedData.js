const users = [
  {
    email: "jordidiaz2020@gmail.com",
    username: "jordi",
    password: "1234",
    role: "Admin",
  },
  {
    email: "maria.rodriguez@example.com",
    username: "maria_r",
    password: "securePass2023",
    role: "User",
  },
  {
    email: "alex.chen@techmail.com",
    username: "alexc",
    password: "coding123",
    role: "Moderator",
  },
  {
    email: "sarah.johnson@outlook.com",
    username: "sarahj",
    password: "travel2024",
    role: "User",
  },
  {
    email: "michael.smith@gmail.com",
    username: "mikesmith",
    password: "sports456",
    role: "User",
  },
  {
    email: "emily.wong@company.com",
    username: "emily_w",
    password: "design789",
    role: "Admin",
  },
  {
    email: "david.lee@network.com",
    username: "davidl",
    password: "network2022",
    role: "Moderator",
  },
  {
    email: "lisa.park@education.edu",
    username: "lisap",
    password: "learn2learn",
    role: "User",
  },
  {
    email: "carlos.martinez@business.com",
    username: "carlosm",
    password: "finance2025",
    role: "User",
  },
  {
    email: "anna.kim@startup.io",
    username: "annak",
    password: "startup123",
    role: "User",
  },
];

const posts = [
  {
    userId: 1,
    type: "Lost",
    title: "Lost Dog - Copo",
    description: "Have not been able to find my dog Copo",
    userEmail: "jordidiaz2020@gmail.com",
    contactPhone: "9145367125",
    petName: "Copo",
    location: "1234 Jarvis Ave",
    latitude: 20.0,
    longitude: 20.0,
  },
  {
    userId: 2,
    type: "Found",
    title: "Found Cat Near Park",
    description: "White and gray cat found wandering in Central Park",
    userEmail: "maria.rodriguez@example.com",
    contactPhone: "7862341590",
    petName: "Whiskers",
    location: "Central Park, New York",
    latitude: 40.7829,
    longitude: -73.9654,
  },
  {
    userId: 3,
    type: "Lost",
    title: "Missing Parrot",
    description: "Blue and yellow macaw escaped from home",
    userEmail: "alex.chen@techmail.com",
    contactPhone: "4158762345",
    petName: "Rio",
    location: "San Francisco, CA",
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    userId: 4,
    type: "Found",
    title: "Friendly Puppy Found",
    description: "Young golden retriever with no collar",
    userEmail: "sarah.johnson@outlook.com",
    contactPhone: "6175551212",
    petName: "Buddy",
    location: "Boston Common",
    latitude: 42.3551,
    longitude: -71.0656,
  },
  {
    userId: 5,
    type: "Lost",
    title: "Missing Tabby Cat",
    description: "Orange tabby cat with white paws",
    userEmail: "michael.smith@gmail.com",
    contactPhone: "3105559876",
    petName: "Tiger",
    location: "Santa Monica, CA",
    latitude: 34.0195,
    longitude: -118.4912,
  },
  {
    userId: 6,
    type: "Found",
    title: "Small Dog in Neighborhood",
    description: "Tiny white dog found near community center",
    userEmail: "emily.wong@company.com",
    contactPhone: "2125554321",
    petName: "Snowball",
    location: "Upper West Side, NYC",
    latitude: 40.787,
    longitude: -73.9754,
  },
  {
    userId: 7,
    type: "Lost",
    title: "German Shepherd Disappeared",
    description: "Large black and tan dog went missing during walk",
    userEmail: "david.lee@network.com",
    contactPhone: "8185550101",
    petName: "Max",
    location: "Pasadena, CA",
    latitude: 34.1478,
    longitude: -118.1445,
  },
  {
    userId: 8,
    type: "Found",
    title: "Rabbit Found in Backyard",
    description: "Brown and white rabbit, seems domesticated",
    userEmail: "lisa.park@education.edu",
    contactPhone: "6505557890",
    petName: "Hoppy",
    location: "Palo Alto, CA",
    latitude: 37.4419,
    longitude: -122.143,
  },
  {
    userId: 9,
    type: "Lost",
    title: "Missing Siamese Cat",
    description: "Blue-eyed Siamese cat with distinctive markings",
    userEmail: "carlos.martinez@business.com",
    contactPhone: "3035556789",
    petName: "Luna",
    location: "Denver, CO",
    latitude: 39.7392,
    longitude: -104.9903,
  },
  {
    userId: 10,
    type: "Found",
    title: "Friendly Chihuahua",
    description: "Small tan chihuahua found near shopping center",
    userEmail: "anna.kim@startup.io",
    contactPhone: "4155553456",
    petName: "Tiny",
    location: "San Jose, CA",
    latitude: 37.3382,
    longitude: -121.8863,
  },
];

// Post Images Array
const post_images = [
  {
    post_id: 1,
    img_name: "copo_lost.jpg",
    img_src: "images/copo_lost.jpg",
  },
  {
    post_id: 2,
    img_name: "whiskers_found.jpg",
    img_src: "images/whiskers_found.jpg",
  },
  {
    post_id: 3,
    img_name: "fluffy_adventure.jpg",
    img_src: "images/fluffy_adventure.jpg",
  },
  {
    post_id: 4,
    img_name: "mittens_playful.jpg",
    img_src: "images/mittens_playful.jpg",
  },
  {
    post_id: 5,
    img_name: "shadow_napping.jpg",
    img_src: "images/shadow_napping.jpg",
  },
  {
    post_id: 6,
    img_name: "luna_sunset.jpg",
    img_src: "images/luna_sunset.jpg",
  },
  {
    post_id: 7,
    img_name: "tiger_stripes.jpg",
    img_src: "images/tiger_stripes.jpg",
  },
  {
    post_id: 8,
    img_name: "oreo_curious.jpg",
    img_src: "images/oreo_curious.jpg",
  },
  {
    post_id: 9,
    img_name: "pepper_exploring.jpg",
    img_src: "images/pepper_exploring.jpg",
  },
  {
    post_id: 10,
    img_name: "snowball_winter.jpg",
    img_src: "images/snowball_winter.jpg",
  },
];
// Comments Array
const comments = [
  {
    user_id: 1,
    post_id: 1,
    content: "I hope you find Copo soon!",
    location_embed: "1234 Jarvis Ave",
    location_embed_latitude: 20.0,
    location_embed_longitude: 20.0,
  },
  {
    user_id: 2,
    post_id: 2,
    content: "Thanks for finding Whiskers!",
    location_embed: "Central Park",
    location_embed_latitude: 40.7829,
    location_embed_longitude: -73.9654,
  },
  {
    user_id: 3,
    post_id: 3,
    content: "Has anyone seen my tabby cat?",
    location_embed: "567 Maple Street",
    location_embed_latitude: 35.6762,
    location_embed_longitude: -95.5472,
  },
  {
    user_id: 4,
    post_id: 4,
    content: "Great news about finding the lost pet!",
    location_embed: "890 Oak Lane",
    location_embed_latitude: 37.7749,
    location_embed_longitude: -122.4194,
  },
  {
    user_id: 5,
    post_id: 5,
    content: "I'll keep an eye out in the neighborhood.",
    location_embed: "456 Pine Road",
    location_embed_latitude: 33.4484,
    location_embed_longitude: -112.074,
  },
  {
    user_id: 6,
    post_id: 6,
    content: "Does anyone recognize this cat?",
    location_embed: "222 Elm Street",
    location_embed_latitude: 42.3601,
    location_embed_longitude: -71.0589,
  },
  {
    user_id: 7,
    post_id: 7,
    content: "Hoping for a happy reunion!",
    location_embed: "789 Birch Avenue",
    location_embed_latitude: 39.9526,
    location_embed_longitude: -75.1652,
  },
  {
    user_id: 8,
    post_id: 8,
    content: "Check the local shelters!",
    location_embed: "345 Cedar Street",
    location_embed_latitude: 32.7157,
    location_embed_longitude: -117.1611,
  },
  {
    user_id: 9,
    post_id: 9,
    content: "Shared your post in the community group.",
    location_embed: "111 Willow Way",
    location_embed_latitude: 29.7604,
    location_embed_longitude: -95.3698,
  },
  {
    user_id: 10,
    post_id: 10,
    content: "Any updates on the missing pet?",
    location_embed: "666 Rosewood Drive",
    location_embed_latitude: 25.7817,
    location_embed_longitude: -80.2056,
  },
];

// Comment Images Array
const comment_images = [
  {
    comment_id: 1,
    img_name: "supportive_message.jpg",
    img_src: "images/supportive_message.jpg",
  },
  {
    comment_id: 2,
    img_name: "thank_you_message.jpg",
    img_src: "images/thank_you_message.jpg",
  },
  {
    comment_id: 3,
    img_name: "hopeful_search.jpg",
    img_src: "images/hopeful_search.jpg",
  },
  {
    comment_id: 4,
    img_name: "community_support.jpg",
    img_src: "images/community_support.jpg",
  },
  {
    comment_id: 5,
    img_name: "neighborhood_watch.jpg",
    img_src: "images/neighborhood_watch.jpg",
  },
  {
    comment_id: 6,
    img_name: "missing_pet_alert.jpg",
    img_src: "images/missing_pet_alert.jpg",
  },
  {
    comment_id: 7,
    img_name: "reunion_hope.jpg",
    img_src: "images/reunion_hope.jpg",
  },
  {
    comment_id: 8,
    img_name: "shelter_advice.jpg",
    img_src: "images/shelter_advice.jpg",
  },
  {
    comment_id: 9,
    img_name: "community_sharing.jpg",
    img_src: "images/community_sharing.jpg",
  },
  {
    comment_id: 10,
    img_name: "follow_up_inquiry.jpg",
    img_src: "images/follow_up_inquiry.jpg",
  },
];

// Saved Posts Array
const saved_posts = [
  {
    user_id: 1,
    post_id: 1,
  },
  {
    user_id: 2,
    post_id: 2,
  },
  {
    user_id: 3,
    post_id: 3,
  },
  {
    user_id: 4,
    post_id: 4,
  },
  {
    user_id: 5,
    post_id: 5,
  },
  {
    user_id: 6,
    post_id: 6,
  },
  {
    user_id: 7,
    post_id: 7,
  },
  {
    user_id: 8,
    post_id: 8,
  },
  {
    user_id: 9,
    post_id: 9,
  },
  {
    user_id: 10,
    post_id: 10,
  },
];

// Post Alerts Array
const post_alerts = [
  {
    user_id: 1,
    post_id: 1,
  },
  {
    user_id: 2,
    post_id: 2,
  },
  {
    user_id: 3,
    post_id: 3,
  },
  {
    user_id: 4,
    post_id: 4,
  },
  {
    user_id: 5,
    post_id: 5,
  },
  {
    user_id: 6,
    post_id: 6,
  },
  {
    user_id: 7,
    post_id: 7,
  },
  {
    user_id: 8,
    post_id: 8,
  },
  {
    user_id: 9,
    post_id: 9,
  },
  {
    user_id: 10,
    post_id: 10,
  },
];

module.exports = {
  users,
  posts,
  post_images,
  comments,
  comment_images,
  saved_posts,
  post_alerts,
};
