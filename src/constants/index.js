import foodImg from "../assets/images/food.png";
import artisanImg from "../assets/images/artsian.png";
import fashionImg from "../assets/images/fashion.png";
import cleaningImg from "../assets/images/cleaning.png";
import beautyImg from "../assets/images/beauty.png";
import personImg from "../assets/images/person.png";

import heroCook2 from "../assets/images/cook-2.jpg"
import heroBaker1 from "../assets/images/baker-1.jpg"
import heroBaker2 from "../assets/images/baker-2.jpg"
import heroBaker3 from "../assets/images/baker-3.jpg"
import heroBaker4 from "../assets/images/baker-4.jpg"
import constructor from "../assets/images/constructor.jpg"
import cosmetics from "../assets/images/cosmetics.jpeg"
import crochet from "../assets/images/crochet.jpg"
import fashion1 from "../assets/images/fashion1.avif"
import fashion2 from "../assets/images/fashion2.jpg"
import fashion3 from "../assets/images/fashion3.avif"
import hairstylist1 from "../assets/images/hairstylist-1.jpg"
import hairstylist2 from "../assets/images/hairstylist-2.jpg"
import makeup from "../assets/images/makeup.jpg"
import makeup2 from "../assets/images/makeup-2.jpg"
import nail1 from "../assets/images/nail-1.avif"
import nail2 from "../assets/images/nail-3.jpg"
import nail3 from "../assets/images/nail-tech.jpg"
import pedicure from "../assets/images/pedicure.avif"

// categories
export const categoriesHero = [
  {
    id: 1,
    imgUrl: heroCook2,
  },
  {
    id: 2,
    imgUrl: heroBaker1,
  },
  {
    id: 3,
    imgUrl: heroBaker2,
  },
  {
    id: 4,
    imgUrl: heroBaker3,
  },
  {
    id: 5,
    imgUrl: heroBaker4,
  },
  {
    id: 6,
    imgUrl: constructor,
  },
  {
    id: 7,
    imgUrl: cosmetics,
  },
  {
    id: 8,
    imgUrl: crochet,
  },
  {
    id: 9,
    imgUrl: fashion1,
  },
  {
    id: 10,
    imgUrl: fashion2,
  },
  {
    id: 11,
    imgUrl: fashion3,
  },
  {
    id: 12,
    imgUrl: hairstylist1,
  },
  {
    id: 13,
    imgUrl: hairstylist2,
  },
  {
    id: 14,
    imgUrl: makeup,
  },
  {
    id: 15,
    imgUrl: makeup2,
  },
  {
    id: 16,
    imgUrl: nail1,
  },
  {
    id: 17,
    imgUrl: nail2,
  },
  {
    id: 18,
    imgUrl: nail3,
  },
  {
    id: 19,
    imgUrl: pedicure,
  },

];

export const categoriesHome = [
  {
    id: 1,
    imgUrl: beautyImg,
    imgAlt: "spa image",
    text: "Beauty and wellness",
  },
  {
    id: 2,
    imgUrl: foodImg,
    imgAlt: "pizza image",
    text: "Food",
  },
  {
    id: 3,
    imgUrl: cleaningImg,
    imgAlt: "cleaning spray image",
    text: "Cleaning Soluy",
  },
  {
    id: 4,
    imgUrl: fashionImg,
    imgAlt: "cloths image",
    text: "Fashion",
  },
  {
    id: 5,
    imgUrl: artisanImg,
    imgAlt: "artist image",
    text: "Artsians",
  },

];

// testimonial items
export const testimonials = [
  {
    id: 1,
    name: "faith martins",
    testimony: "We are really impressed with the Real Estate value and paying method in Particular.",
    imgUrl: personImg,
    imgAlt: "client's photo",
  },
  {
    id: 2,
    name: "faith martins",
    testimony:
    "We are really impressed with the Real Estate value and paying method in Particular.",
    imgUrl: personImg,
    imgAlt: "client's photo",
  },
  {
    id: 3,
    name: "faith martins",
    testimony:
      "We are really impressed with the Real Estate value and paying method in Particular.",
    imgUrl: personImg,
    imgAlt: "client's photo",
  },
];

export const sidebarItems = [
  {
    id: 1,
    name: "edit profile",
  },
  {
    id: 2,
    name: "add service/product",
  },
  {
    id: 3,
    name: "active services",
  },
  {
    id: 4,
    name: "All Requests",
  },
  {
    id: 5,
    name: "change password",
  },
  {
    id: 6,
    name: "Change availability status",
  },
  {
    id: 7,
    name: "change location",
  },
  {
    id: 8,
    name: "billing",
  },
  {
    id: 9,
    name: "help",
  },
  {
    id: 10,
    name: "delete account",
  },
]

// billing details
export const subscription = [
  {
    id: 'month',
    price: '1000',
    text: 'No duration commitment. Renew monthly'
  },
  {
    id: 'year',
    price: '8000',
    text: 'Save over 30%, Renew yearly'
  }
]

// gains from subscribing
export const gains = [
  {
    id: 'visibilty',
    text: 'Your ads will be featured prominently among the top listings!'
  },
  {
    id: 'Customers',
    text: 'Drive more traffic to your ads and attract larger customer base!'
  },
  {
    id: 'Statistics',
    text: 'Access valuable statistics on your listings to enhance your performance!'
  }
]

// // All categories page
// export const categoriesTag = [
//   {
//     id: 1,
//     name: "fashion",
//   },
//   {
//     id: 2,
//     name: "food",
//   },
//   {
//     id: 3,
//     name: "Appliance Repair",
//   },
//   {
//     id: 4,
//     name: "Cleaning Solution",
//   },
//   {
//     id: 5,
//     name: "Moving",
//   },
//   {
//     id: 6,
//     name: "artsain",
//   },
//   {
//     id: 7,
//     name: "event planner",
//   },
//   {
//     id: 8,
//     name: "beauty and wellness",
//   },
//   {
//     id: 9,
//     name: "fashion",
//   },
//   {
//     id: 10,
//     name: "hair stylist",
//   },
// ];

// export const providers = [
//   {
//     imgUrl: fashion3,
//     id: 1,
//     name: "Zee thrift",
//     phone: '+234810045893',
//     email: 'Zeethrift@gmail.come',
//     avaliabilty: 'available',
//     location: 'No. 25 Lawanson Street, Adefarati, Futa Akure',
//     rating: 3.5,
//     item: 'T shirts',
//     cat: 'fashion',
//     subcat: 'Personal Styling Consultation',
//     itemDesc: 'Girls Sweat Pant Cargo Pants Available in colors and sizes. ',
//     intro:
//       "Explore our diverse collection of thrifted fashion for men and women, all available at your fingertips! From stylish male and female attire to trendy selections for every age, our curated range brings affordable fashion straight to your doorstep. With just a call, experience the convenience of shopping from the comfort of your home.",
//   },
//   {
//     imgUrl: fashion2,
//     id: 2,
//     name: "ife fashion hub",
//     intro:
//       "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//   },
//   {
//     imgUrl: fashion1,
//     id: 5,
//     name: "Zee thrift",
//     intro:
//       "Zee thrifts brings  affordable thrift wears to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//   },
//   {
//     imgUrl: fashion1,
//     id: 2,
//     name: "oladayo store",
//     intro:
//       "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//   },
//   {
//     imgUrl: fashion2,
//     id: 5,
//     name: "ife fashion hub",
//     intro:
//       "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//   },
//   {
//     imgUrl: fashion3,
//     id: 1,
//     name: "Zee thrift",
//     item: 'Cargo pants',
//     itemDesc:
//       "Quality Round Neck Unisex wears, Available in different colors",
//     subcat: "Alterations  and Tailoring",
//     intro:
//       "Zee thrifts brings  affordable thrift wears to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//   },
//   {
//     imgUrl: fashion1,
//     id: 2,
//     name: "oladayo store",
//     intro:
//       "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//   },
//   {
//     imgUrl: fashion2,
//     id: 5,
//     name: "ife fashion hub",
//     intro:
//       "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//   },
 
//   {
//     imgUrl: fashion2,
//     id: 1,
//     item: "Men Shirts",
//     subcat: 'Wardrobe Clear-Out Services',
//     itemDesc:
//       "Quality Round Neck Unisex wears, Available in different colors",
//   },
//   {
//     imgUrl: fashion1,
//     id: 2,
//     name: "oladayo store",
//     intro:
//       "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//   },
//   {
//     imgUrl: fashion3,
//     id: 1,
//     name: "Zee thrift",
//     item: "gowns",
//     subcat: 'Clothing Repair an Workshops',
//     intro:
//       "Zee thrifts brings  affordable thrift wears to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//   },
//   {
//     imgUrl: fashion2,
//     id: 5,
//     name: "ife fashion hub",
//     intro:
//       "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//   },
//   {
//     imgUrl: fashion3,
//     id: 6,
//     name: "Zee thrift",
//     intro:
//       "Zee thrifts brings  affordable thrift wears to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//   },
//   {
//     imgUrl: fashion1,
//     id: 8,
//     name: "oladayo store",
//     intro:
//       "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//   },
//   {
//     imgUrl: fashion2,
//     id: 5,
//     name: "ife fashion hub",
//     intro:
//       "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//   },
//   {
//     imgUrl: fashion3,
//     id: 1,
//     name: "Zee thrift",
//     item: "women tops",
//     subcat: 'Online Shopping and Shipping Services',
//     intro:
//       "Zee thrifts brings  affordable thrift wears to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//   },
//   {
//     imgUrl: fashion3,
//     id: 1,
//     name: "Zee thrift",
//     item: "tops",
//     subcat: 'Fashion Events and Pop up Shots',
//     intro:
//       "Zee thrifts brings  affordable thrift wears to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//   },
// ];

// // all categories with details backend info should replace this
// export const categories = [
//   {
//     id: "Fashion",
//     providers: [
//       {
//         imgUrl: fashion1,
//         id: 1,
//         name: "Zee thrift",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: fashion2,
//         id: 2,
//         name: "ife fashion hub",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: fashion3,
//         id: 3,
//         name: "Zee thrift",
//         intro:
//           "Zee thrifts brings  affordable thrift wears to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//       },
//       {
//         imgUrl: fashion1,
//         id: 2,
//         name: "oladayo store",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: fashion2,
//         id: 5,
//         name: "ife fashion hub",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: fashion3,
//         id: 1,
//         name: "Zee thrift",
//         intro:
//           "Zee thrifts brings  affordable thrift wears to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//       },
//       {
//         imgUrl: fashion1,
//         id: 2,
//         name: "oladayo store",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: fashion2,
//         id: 5,
//         name: "ife fashion hub",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: fashion3,
//         id: 1,
//         name: "Zee thrift",
//         intro:
//           "Zee thrifts brings  affordable thrift wears to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//       },
//       {
//         imgUrl: fashion1,
//         id: 2,
//         name: "oladayo store",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: food1,
//          id: 1,
//         name: "mama's kitchen",
//         intro:
//           "Are you tired after a hectic day at work, we cook all meals and dishes that you can share with your family for weekend, parties and all, home services included.",
//       },
//       {
//         imgUrl: food2,
//          id: 2,
//         name: "k catering services",
//         intro:
//           "K Catering service is involve in cooking for events, baking and planning your events. No worries we are here to serve you ",
//       },
//       {
//         imgUrl: food3,
//          id: 3,
//         name: "your fruits",
//         intro:
//           "Get us deliver all varieties of fruits to your house, our fruits are fresh and affordable.",
//       },
//       {
//         imgUrl: food4,
//          id: 3,
//         name: "salad and veggies",
//         intro:
//           "Are you tired after a hectic day at work, we cook all meals and dishes that you can share with your family for weekend, parties and all, home services included.",
//       },
//       {
//         imgUrl: food5,
//         name: "ife food hub",
//          id: 1,
//         intro:
//           "K Catering service is involve in cooking for events, baking and planning your events. No worries we are here to serve you ",
//       },
//       {
//         imgUrl: food6,
//          id: 4,
//         name: "zee delicacy",
//         intro:
//           "Zee Delicacy  brings  affordable meals to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//       },
//       {
//         imgUrl: food7,
//          id: 1,
//         name: "manny's grills",
//         intro:
//           "Are you tired after a hectic day at work, we cook all meals and dishes that you can share with your family for weekend, parties and all, home services included.",
//       },
//       {
//         imgUrl: food8,
//          id: 5,
//         name: "sedeeysbakes",
//         intro:
//           "K Catering service is involve in cooking for events, baking and planning your events. No worries we are here to serve you ",
//       },
//       {
//         imgUrl: food9,
//          id: 3,
//         name: "ammie's snacks",
//         intro:
//           "Get us deliver all varieties of fruits to your house, our fruits are fresh and affordable.",
//       },
//       {
//         imgUrl: fashion2,
//         id: 5,
//         name: "ife fashion hub",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: fashion3,
//         id: 6,
//         name: "Zee thrift",
//         intro:
//           "Zee thrifts brings  affordable thrift wears to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//       },
//       {
//         imgUrl: fashion1,
//         id: 8,
//         name: "oladayo store",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: fashion2,
//         id: 5,
//         name: "ife fashion hub",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: fashion3,
//         id: 1,
//         name: "Zee thrift",
//         intro:
//           "Zee thrifts brings  affordable thrift wears to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//       },
//     ],
//   },
//   {
//     id: "Food",
//     providers: [
//       {
//         imgUrl: food1,
//         name: "mama's kitchen",
//         intro:
//           "Are you tired after a hectic day at work, we cook all meals and dishes that you can share with your family for weekend, parties and all, home services included.",
//       },
//       {
//         imgUrl: food2,
//         name: "k catering services",
//         intro:
//           "K Catering service is involve in cooking for events, baking and planning your events. No worries we are here to serve you ",
//       },
//       {
//         imgUrl: food3,
//         name: "your fruits",
//         intro:
//           "Get us deliver all varieties of fruits to your house, our fruits are fresh and affordable.",
//       },
//       {
//         imgUrl: food4,
//         name: "salad and veggies",
//         intro:
//           "Are you tired after a hectic day at work, we cook all meals and dishes that you can share with your family for weekend, parties and all, home services included.",
//       },
//       {
//         imgUrl: food5,
//         name: "ife food hub",
//         intro:
//           "K Catering service is involve in cooking for events, baking and planning your events. No worries we are here to serve you ",
//       },
//       {
//         imgUrl: food6,
//         name: "zee delicacy",
//         intro:
//           "Zee Delicacy  brings  affordable meals to the comfort of your home. No more searching for thrift sellers, that’s why we are here",
//       },
//       {
//         imgUrl: food7,
//         name: "manny's grills",
//         intro:
//           "Are you tired after a hectic day at work, we cook all meals and dishes that you can share with your family for weekend, parties and all, home services included.",
//       },
//       {
//         imgUrl: food8,
//         name: "sedeeysbakes",
//         intro:
//           "K Catering service is involve in cooking for events, baking and planning your events. No worries we are here to serve you ",
//       },
//       {
//         imgUrl: food9,
//         name: "ammie's snacks",
//         intro:
//           "Get us deliver all varieties of fruits to your house, our fruits are fresh and affordable.",
//       },
//       {
//         imgUrl: food10,
//         name: "biggie burger",
//         intro:
//           "Are you tired after a hectic day at work, we cook all meals and dishes that you can share with your family for weekend, parties and all, home services included.",
//       },
//       {
//         imgUrl: food11,
//         name: "k's pizza",
//         intro:
//           "K Catering service is involve in cooking for events, baking and planning your events. No worries we are here to serve you ",
//       },
//       {
//         imgUrl: food12,
//         name: "your snack",
//         intro:
//           "Get us deliver all varieties of fruits to your house, our fruits are fresh and affordable.",
//       },
//       {
//         imgUrl: food13,
//         name: "mama's kitchen",
//         intro:
//           "Are you tired after a hectic day at work, we cook all meals and dishes that you can share with your family for weekend, parties and all, home services included.",
//       },
//       {
//         imgUrl: food14,
//         name: "pasta greatness",
//         intro:
//           "K Catering service is involve in cooking for events, baking and planning your events. No worries we are here to serve you ",
//       },
//       {
//         imgUrl: food15,
//         name: "k catering services",
//         intro:
//           "Get us deliver all varieties of fruits to your house, our fruits are fresh and affordable.",
//       },
//       {
//         imgUrl: food1,
//         name: "mama's kitchen",
//         intro:
//           "Are you tired after a hectic day at work, we cook all meals and dishes that you can share with your family for weekend, parties and all, home services included.",
//       },
//       {
//         imgUrl: food2,
//         name: "k catering services",
//         intro:
//           "K Catering service is involve in cooking for events, baking and planning your events. No worries we are here to serve you ",
//       },
//       {
//         imgUrl: food3,
//         name: "your fruits",
//         intro:
//           "Get us deliver all varieties of fruits to your house, our fruits are fresh and affordable.",
//       },
//     ],
//   },
//   {
//     id: "Appliance Repair",
//     providers: [
//       {
//         imgUrl: repairs1,
//         name: "k repairs",
//         intro: "We handle all electronic appliances in the house",
//       },
//       {
//         imgUrl: repairs2,
//         name: "b furnitures",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: repairs3,
//         name: "home repairs",
//         intro:
//           "in need of setting or repairing faulty appliances .search no more.season proffesionals at your disposal",
//       },
//       {
//         imgUrl: repairs1,
//         name: "k repairs",
//         intro: "We handle all electronic appliances in the house",
//       },
//       {
//         imgUrl: repairs2,
//         name: "b furnitures",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: repairs3,
//         name: "home repairs",
//         intro:
//           "in need of setting or repairing faulty appliances .search no more.season proffesionals at your disposal",
//       },
//       {
//         imgUrl: repairs1,
//         name: "k repairs",
//         intro: "We handle all electronic appliances in the house",
//       },
//       {
//         imgUrl: repairs2,
//         name: "b furnitures",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: repairs3,
//         name: "home repairs",
//         intro:
//           "in need of setting or repairing faulty appliances .search no more.season proffesionals at your disposal",
//       },
//       {
//         imgUrl: repairs1,
//         name: "k repairs",
//         intro: "We handle all electronic appliances in the house",
//       },
//       {
//         imgUrl: repairs2,
//         name: "b furnitures",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: repairs3,
//         name: "home repairs",
//         intro:
//           "in need of setting or repairing faulty appliances .search no more.season proffesionals at your disposal",
//       },
//       {
//         imgUrl: repairs1,
//         name: "k repairs",
//         intro: "We handle all electronic appliances in the house",
//       },
//       {
//         imgUrl: repairs2,
//         name: "b furnitures",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: repairs3,
//         name: "home repairs",
//         intro:
//           "in need of setting or repairing faulty appliances .search no more.season proffesionals at your disposal",
//       },
//       {
//         imgUrl: repairs1,
//         name: "k repairs",
//         intro: "We handle all electronic appliances in the house",
//       },
//       {
//         imgUrl: repairs2,
//         name: "b furnitures",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: repairs3,
//         name: "home repairs",
//         intro:
//           "in need of setting or repairing faulty appliances .search no more.season proffesionals at your disposal",
//       },
//     ],
//   },
//   {
//     id: "moving",
//     providers: [
//       {
//         imgUrl: moving1,
//         name: "movers",
//         intro:
//           "Are you tired after a hectic day at work, we cook all meals and dishes that you can share with your family for weekend, parties and all, home services included. ",
//       },
//       {
//         imgUrl: moving2,
//         name: "we can move",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: moving1,
//         name: "g moves",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: moving1,
//         name: "movers",
//         intro:
//           "Are you tired after a hectic day at work, we cook all meals and dishes that you can share with your family for weekend, parties and all, home services included. ",
//       },
//       {
//         imgUrl: moving2,
//         name: "we can move",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: moving1,
//         name: "g moves",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: moving1,
//         name: "movers",
//         intro:
//           "Are you tired after a hectic day at work, we cook all meals and dishes that you can share with your family for weekend, parties and all, home services included. ",
//       },
//       {
//         imgUrl: moving2,
//         name: "we can move",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//       {
//         imgUrl: moving1,
//         name: "g moves",
//         intro:
//           "Get all kind of wears within your reach and get it delivered to you, get to select and buy in the comfort of your house ",
//       },
//     ],
//   },
// ];
