// =====================================================
// REAL DATA - Sourced from [Raycon] Amazon Weekly Tracker
// Last updated: March 2, 2026
// =====================================================

export const products = [
  { sku: "O25", name: "Open Earbuds", amazonRating: 4.2, weeklyRating: 2.63, reviews: 635, bsr: 24, netNew: 9, ratingDelta: -19.0, avgDaily30d: 1.0, status: "WATCH", amazonsChoice: false },
  { sku: "O15", name: "Essential Open Earbuds", amazonRating: 4.1, weeklyRating: 3.43, reviews: 800, bsr: 3, netNew: 35, ratingDelta: -6.2, avgDaily30d: 3.5, status: "WATCH", amazonsChoice: true },
  { sku: "E25", name: "Everyday Earbuds Classic", amazonRating: 4.3, weeklyRating: 3.35, reviews: 4394, bsr: 40, netNew: 25, ratingDelta: -8.5, avgDaily30d: 3.0, status: "GREEN", amazonsChoice: true },
  { sku: "E75", name: "Impact Earbuds", amazonRating: 4.1, weeklyRating: 4.1, reviews: 1041, bsr: 481, netNew: 434, ratingDelta: null, avgDaily30d: null, status: "WATCH", amazonsChoice: true },
  { sku: "E45", name: "Fitness Earbuds", amazonRating: 4.1, weeklyRating: 4.0, reviews: 1844, bsr: 103, netNew: 12, ratingDelta: 20.8, avgDaily30d: 2.0, status: "WATCH", amazonsChoice: true },
  { sku: "E95", name: "Pro Earbuds", amazonRating: 4.0, weeklyRating: 3.0, reviews: 53, bsr: 789, netNew: 1, ratingDelta: -66.7, avgDaily30d: 0.3, status: "WATCH", amazonsChoice: true },
  { sku: "B42", name: "Bone Conduction HP", amazonRating: 4.2, weeklyRating: 4.29, reviews: 320, bsr: 8, netNew: 13, ratingDelta: 33.9, avgDaily30d: 1.5, status: "WATCH", amazonsChoice: false },
  { sku: "H10", name: "Bone Conduction HP Pro", amazonRating: 4.6, weeklyRating: 4.67, reviews: 75, bsr: 209, netNew: 4, ratingDelta: -7.1, avgDaily30d: 0.4, status: "GREEN", amazonsChoice: false },
  { sku: "H20", name: "Everyday Headphones", amazonRating: 4.5, weeklyRating: 3.25, reviews: 1128, bsr: 48, netNew: 4, ratingDelta: -15.4, avgDaily30d: 0.6, status: "GREEN", amazonsChoice: false },

];

export const weeklyRatings = [
  { week: "Jan 5",  E25: 4.73, E45: 3.47, E95: 4.00, O15: 4.11, O25: 4.20, B42: 4.14, H10: 4.71, H20: 4.36 },
  { week: "Jan 12", E25: 4.22, E45: 3.47, E95: 2.67, O15: 4.00, O25: 3.50, B42: 4.15, H10: 4.43, H20: 4.67 },
  { week: "Jan 19", E25: 3.56, E45: 2.22, E95: 4.00, O15: 3.90, O25: 2.71, B42: 3.25, H10: 3.50, H20: 4.00 },
  { week: "Jan 26", E25: 4.46, E45: 4.00, E95: 5.00, O15: 4.00, O25: 3.00, B42: 1.00, H10: 5.00, H20: 3.75 },
  { week: "Feb 2",  E25: 3.87, E45: 2.67, E95: 3.50, O15: 3.59, O25: 3.60, B42: 3.42, H10: 5.00, H20: 4.69 },
  { week: "Feb 9",  E25: 3.58, E45: 2.33, E95: 1.00, O15: 3.09, O25: 5.00, B42: 4.29, H10: 3.00, H20: 4.67 },
  { week: "Feb 16", E25: 3.63, E45: 3.17, E95: 5.00, O15: 3.64, O25: 3.13, B42: 2.83, H10: 5.00, H20: 3.75 },
  { week: "Feb 23", E25: 3.35, E45: 4.00, E95: 3.00, O15: 3.43, O25: 2.63, B42: 4.29, H10: 4.67, H20: 3.25 },
];

export const weeklyBSR = [
  { week: "Jan 5",  E25: 51, E45: 140, O15: 10, O25: 40, B42: 33, H10: 408, H20: 113 },
  { week: "Jan 12", E25: 46, E45: 138, O15: 9,  O25: 41, B42: 29, H10: 418, H20: 125 },
  { week: "Jan 19", E25: 45, E45: 137, O15: 7,  O25: 41, B42: 28, H10: 412, H20: 122 },
  { week: "Jan 26", E25: 43, E45: 130, O15: 7,  O25: 43, B42: 35, H10: 441, H20: 115 },
  { week: "Feb 2",  E25: 38, E45: 133, O15: 10, O25: 42, B42: 31, H10: 405, H20: 114 },
  { week: "Feb 9",  E25: 38, E45: 127, O15: 13, O25: 40, B42: 26, H10: 375, H20: 94 },
  { week: "Feb 16", E25: 43, E45: 114, O15: 5,  O25: 30, B42: 13, H10: 282, H20: 62 },
  { week: "Feb 23", E25: 40, E45: 103, O15: 3,  O25: 24, B42: 8,  H10: 209, H20: 48 },
];

export const wowDeltas = [
  { sku: "O25", rating: 2.63, ratingDelta: -19.0, reviews: 635, reviewsDelta: 1.4, netNew: 9, bsr: 24, bsrDelta: 6 },
  { sku: "O15", rating: 3.43, ratingDelta: -6.2, reviews: 800, reviewsDelta: 4.4, netNew: 35, bsr: 3, bsrDelta: 2 },
  { sku: "E25", rating: 3.35, ratingDelta: -8.5, reviews: 4394, reviewsDelta: 0.6, netNew: 25, bsr: 40, bsrDelta: 3 },
  { sku: "E45", rating: 4.00, ratingDelta: 20.8, reviews: 1844, reviewsDelta: 0.7, netNew: 12, bsr: 103, bsrDelta: 11 },
  { sku: "E95", rating: 3.00, ratingDelta: -66.7, reviews: 53, reviewsDelta: 1.9, netNew: 1, bsr: 789, bsrDelta: -789 },
  { sku: "B42", rating: 4.29, ratingDelta: 33.9, reviews: 320, reviewsDelta: 4.1, netNew: 13, bsr: 8, bsrDelta: 5 },
  { sku: "H10", rating: 4.67, ratingDelta: -7.1, reviews: 75, reviewsDelta: 5.3, netNew: 4, bsr: 209, bsrDelta: 73 },
  { sku: "H20", rating: 3.25, ratingDelta: -15.4, reviews: 1128, reviewsDelta: 0.4, netNew: 4, bsr: 48, bsrDelta: 14 },
  { sku: "E75", rating: 4.10, ratingDelta: null, reviews: 434, reviewsDelta: null, netNew: 434, bsr: 481, bsrDelta: null },

];

// Real O25 daily star data - days with reviews only (Jan-Mar 2026)
export const o25Daily = [
  {date:"1/3",s5:1,s4:0,s3:0,s2:0,s1:0},{date:"1/4",s5:0,s4:1,s3:0,s2:1,s1:0},{date:"1/5",s5:0,s4:0,s3:0,s2:0,s1:1},
  {date:"1/7",s5:0,s4:0,s3:1,s2:0,s1:0},{date:"1/8",s5:0,s4:0,s3:0,s2:0,s1:1},{date:"1/11",s5:1,s4:0,s3:0,s2:0,s1:0},
  {date:"1/12",s5:0,s4:1,s3:0,s2:0,s1:1},{date:"1/13",s5:1,s4:0,s3:0,s2:1,s1:0},{date:"1/18",s5:4,s4:1,s3:1,s2:1,s1:3},
  {date:"1/19",s5:1,s4:1,s3:0,s2:1,s1:1},{date:"1/25",s5:0,s4:0,s3:0,s2:0,s1:2},{date:"1/26",s5:0,s4:0,s3:0,s2:1,s1:0},
  {date:"2/1",s5:3,s4:1,s3:1,s2:0,s1:3},{date:"2/2",s5:0,s4:1,s3:0,s2:0,s1:1},{date:"2/3",s5:1,s4:0,s3:0,s2:0,s1:0},
  {date:"2/8",s5:0,s4:0,s3:1,s2:0,s1:1},{date:"2/9",s5:1,s4:0,s3:0,s2:0,s1:0},{date:"2/10",s5:2,s4:0,s3:0,s2:0,s1:0},
  {date:"2/15",s5:1,s4:0,s3:0,s2:1,s1:1},{date:"2/17",s5:2,s4:1,s3:0,s2:0,s1:0},{date:"2/22",s5:1,s4:0,s3:0,s2:2,s1:2},
  {date:"2/23",s5:1,s4:0,s3:0,s2:0,s1:0},{date:"2/25",s5:0,s4:0,s3:0,s2:2,s1:1},{date:"3/1",s5:0,s4:2,s3:0,s2:1,s1:1},
].map(d => ({...d, total: d.s1+d.s2+d.s3+d.s4+d.s5}));

export const COLORS = {
  E25: "#3B82F6", E45: "#F59E0B", E75: "#F97316", E95: "#A855F7", O15: "#EC4899",
  O25: "#EF4444", B42: "#14B8A6", H10: "#6366F1", H20: "#22C55E"
};

export const ALL_SKUS = ["E25","E45","E75","E95","O15","O25","B42","H10","H20"];
