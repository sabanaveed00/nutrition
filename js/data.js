window.ASET_DATA = {
  clients: [
    { id: "sarah", name: "Sarah Jenkins", goal: "Weight Loss", weight: 72.4, target: 64, height: 168, age: 31, streak: 14, avatar: "assets/images/person-sarah.jpg", pattern: "Mediterranean", allergies: "None", bmi: 25.7 },
    { id: "marcus", name: "Marcus Vance", goal: "Muscle Hypertrophy", weight: 84.2, target: 88, height: 182, age: 34, streak: 21, avatar: "assets/images/person-marcus.jpg", pattern: "High Protein", allergies: "Shellfish", bmi: 25.4 },
    { id: "elena", name: "Elena Rostova", goal: "PCOS Management", weight: 66.1, target: 62, height: 164, age: 29, streak: 9, avatar: "assets/images/person-elena.jpg", pattern: "Low GI", allergies: "Lactose", bmi: 24.6 },
    { id: "david", name: "David Kim", goal: "Heart Health", weight: 78.5, target: 73, height: 176, age: 47, streak: 18, avatar: "assets/images/person-david.jpg", pattern: "DASH", allergies: "Peanuts", bmi: 25.3 }
  ],
  week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  meals: [
    { type: "Breakfast", time: "08:00", name: "Protein Berry Oatmeal Bowl", note: "Cook oats in water or almond milk, stir in Greek yogurt and top with blueberries and chia.", foods: [
      ["Organic Rolled Oats", "60g dry", 228, 8, 41, 4, "assets/images/food-oats.jpg"],
      ["Greek Yogurt 0% Fat (Plain)", "200g bowl", 89, 15, 5, 1, "assets/images/food-yogurt.jpg"],
      ["Fresh Blueberries (Wild)", "125g cup", 71, 1, 18, 0, "assets/images/food-blueberries.jpg"],
      ["Chia Seeds", "20g (2 tbsp)", 48, 2, 4, 3, "assets/images/food-chia.jpg"]
    ]},
    { type: "Morning Snack", time: "10:45", name: "Raw Almonds & Apple Slices", note: "Chew slowly with a large glass of water.", foods: [
      ["Raw Almonds", "30g handful", 173, 6, 6, 15, "assets/images/food-almonds.jpg"]
    ]},
    { type: "Lunch", time: "13:15", name: "Mediterranean Grilled Chicken & Quinoa Salad", note: "Drizzle with olive oil and lemon juice, then mix with spinach and tomatoes.", foods: [
      ["Grilled Chicken Breast (Skinless)", "150g cooked", 247, 47, 0, 5, "assets/images/food-chicken.jpg"],
      ["Steamed Quinoa (Tri-color)", "150g cooked", 180, 7, 32, 3, "assets/images/food-quinoa.jpg"],
      ["Baby Spinach (Fresh)", "100g salad", 23, 3, 4, 0, "assets/images/food-spinach.jpg"],
      ["Cherry Tomatoes (Sweet)", "120g bowl", 22, 0, 5, 0, "assets/images/food-tomatoes.jpg"],
      ["Extra Virgin Olive Oil", "1 tbsp (14g)", 119, 0, 0, 14, "assets/images/food-olive-oil.jpg"]
    ]},
    { type: "Afternoon Snack", time: "16:30", name: "Sourdough Toast with Natural Peanut Butter", note: "Pair with water or unsweetened tea.", foods: [
      ["Whole Wheat Sourdough Bread", "2 slices (80g)", 95, 4, 18, 1, "assets/images/food-bread.jpg"],
      ["Natural Peanut Butter", "2 tbsp (32g)", 141, 6, 5, 12, "assets/images/food-peanut-butter.jpg"],
      ["Cavendish Banana", "1 medium (118g)", 53, 1, 14, 0, "assets/images/food-banana.jpg"]
    ]},
    { type: "Dinner", time: "19:45", name: "Wild Baked Salmon with Roasted Sweet Potato & Broccoli", note: "Season salmon with herbs and lemon. Avoid added salt.", foods: [
      ["Atlantic Salmon Fillet (Baked)", "140g cooked", 288, 35, 0, 16, "assets/images/food-salmon.jpg"],
      ["Sweet Potato (Roasted with Skin)", "180g medium", 162, 4, 37, 0, "assets/images/food-sweet-potato.jpg"],
      ["Steamed Broccoli Florets", "150g bowl", 52, 4, 10, 1, "assets/images/food-broccoli.jpg"],
      ["Hass Avocado", "1/2 medium (80g)", 65, 1, 3, 6, "assets/images/food-avocado.jpg"]
    ]}
  ],
  recipes: [
    { id: 1, title: "Mediterranean Chicken Bowl", category: "High Protein", time: "25 min", calories: 540, protein: 48, image: "assets/images/recipe-chicken.jpg", ingredients: ["150g chicken breast", "3/4 cup cooked quinoa", "Baby spinach", "Cherry tomatoes", "Lemon and herbs"], steps: ["Season and grill the chicken.", "Prepare quinoa and vegetables.", "Slice chicken and assemble the bowl.", "Finish with lemon and herbs."] },
    { id: 2, title: "Avocado Sunrise Toast", category: "Breakfast", time: "12 min", calories: 385, protein: 18, image: "assets/images/recipe-toast.jpg", ingredients: ["2 slices sourdough", "1/2 avocado", "2 eggs", "Tomatoes", "Black pepper"], steps: ["Toast the bread.", "Mash and season avocado.", "Cook eggs to preference.", "Assemble and serve."] },
    { id: 3, title: "Rainbow Nourish Bowl", category: "Vegetarian", time: "20 min", calories: 460, protein: 21, image: "assets/images/recipe-salad.jpg", ingredients: ["Mixed greens", "Chickpeas", "Purple cabbage", "Carrot", "Tahini dressing"], steps: ["Wash and prepare vegetables.", "Warm the chickpeas.", "Arrange ingredients in a bowl.", "Drizzle with tahini."] },
    { id: 4, title: "Lemon Herb Salmon", category: "Heart Healthy", time: "30 min", calories: 510, protein: 42, image: "assets/images/recipe-salmon.jpg", ingredients: ["Salmon fillet", "Broccoli", "Sweet potato", "Lemon", "Fresh herbs"], steps: ["Preheat the oven.", "Season the salmon.", "Roast vegetables and salmon.", "Serve with lemon."] },
    { id: 5, title: "Berry Chia Parfait", category: "Breakfast", time: "8 min", calories: 310, protein: 20, image: "assets/images/recipe-parfait.jpg", ingredients: ["Greek yogurt", "Blueberries", "Chia seeds", "Rolled oats", "Cinnamon"], steps: ["Spoon yogurt into a glass.", "Layer oats and berries.", "Sprinkle chia and cinnamon.", "Chill or serve immediately."] },
    { id: 6, title: "Green Protein Salad", category: "Vegetarian", time: "15 min", calories: 420, protein: 27, image: "assets/images/recipe-green-salad.jpg", ingredients: ["Spinach", "Edamame", "Quinoa", "Avocado", "Pumpkin seeds"], steps: ["Prepare quinoa.", "Combine greens and edamame.", "Add avocado and seeds.", "Toss with dressing."] }
  ],
  clinics: [
    { city: "NEW YORK", name: "ASET Manhattan Clinical Center", address: "645 5th Ave, Suite 1200, New York, NY 10022", hours: "Mon - Fri: 8:00 AM - 7:00 PM • Sat: 9:00 AM - 2:00 PM", lead: "Dr. Elena Rostova, PhD, RD", phone: "+1 (212) 555-0198", image: "assets/images/clinic-new-york.jpg" },
    { city: "SAN FRANCISCO", name: "ASET Bay Area Metabolic Institute", address: "450 Sutter St, Suite 840, San Francisco, CA 94108", hours: "Mon - Fri: 7:30 AM - 6:30 PM", lead: "Amy Smith, RD, CDN", phone: "+1 (415) 555-0142", image: "assets/images/clinic-san-francisco.jpg" },
    { city: "LONDON", name: "ASET Harley Street Health Pavilion", address: "10 Harley Street, Marylebone, London W1G 9PF", hours: "Mon - Sat: 8:00 AM - 6:00 PM", lead: "Marcus Sterling, MSc, RD", phone: "+44 20 7946 0351", image: "assets/images/clinic-london.jpg" },
    { city: "SYDNEY", name: "ASET Sydney Dietetics & Vitality Center", address: "200 George St, Level 14, Sydney NSW 2000", hours: "Mon - Fri: 8:00 AM - 7:00 PM", lead: "Dr. Chloe Martin, APD", phone: "+61 2 5550 0193", image: "assets/images/clinic-sydney.jpg" },
    { city: "GLOBAL TELEHEALTH", name: "ASET Virtual Tele-Nutrition Network", address: "100% Online Consultations across 40+ countries", hours: "Appointments available 24/7", lead: "Multilingual Certified Dietitian Panel", phone: "+1 (800) 555-ASET", image: "assets/images/clinic-telehealth.jpg" }
  ],
  testimonials: [
    { name: "Marcus Vance", role: "Corporate Executive & Marathon Runner", result: "-14.5 kg in 16 weeks", quote: "ASET completely transformed how I fuel my body. Instead of crashing on extreme calorie deficits, my dietitian set up progressive carbohydrate cycling that gave me endless energy while melting body fat.", image: "assets/images/person-sarah.jpg" },
    { name: "Sophia Chen", role: "Software Architect", result: "HbA1c down from 6.8% to 5.3%", quote: "The meal scanner and interactive water tracker kept me honest every single day. My dietitian helped me make practical ingredient swaps in seconds.", image: "assets/images/person-sofia.jpg" },
    { name: "David Miller", role: "CrossFit Athlete", result: "+6.2 kg Lean Mass", quote: "Having precise clinical macro breakdowns made progressive muscle hypertrophy straightforward. The recipe book is filled with genuinely delicious meals.", image: "assets/images/person-daniel.jpg" }
  ],
  appointments: [
    { id: 1, client: "Sarah Jenkins", date: "Aug 22, 2026", time: "09:30", type: "Progress Review", status: "Confirmed" },
    { id: 2, client: "Marcus Vance", date: "Aug 22, 2026", time: "13:00", type: "Meal Plan Review", status: "Confirmed" },
    { id: 3, client: "David Kim", date: "Aug 23, 2026", time: "11:15", type: "Initial Consultation", status: "Pending" }
  ],
  diary: [
    { meal: "Breakfast", client: "Sarah Jenkins", time: "08:12", description: "Oatmeal with berries, chia and Greek yogurt", calories: 436, note: "Felt full until lunch.", approved: true, image: "assets/images/recipe-parfait.jpg" },
    { meal: "Lunch", client: "Sarah Jenkins", time: "13:20", description: "Grilled chicken quinoa salad", calories: 591, note: "Used lemon instead of bottled dressing.", approved: false, image: "assets/images/recipe-chicken.jpg" },
    { meal: "Dinner", client: "Sarah Jenkins", time: "19:48", description: "Baked salmon, broccoli and sweet potato", calories: 567, note: "Really enjoyed this meal.", approved: true, image: "assets/images/recipe-salmon.jpg" }
  ],
  records: [
    { date: "Aug 21, 2026", weight: 72.4, bmi: 25.7, fat: 28.1, muscle: 26.3 },
    { date: "Aug 07, 2026", weight: 73.2, bmi: 25.9, fat: 28.7, muscle: 26.1 },
    { date: "Jul 24, 2026", weight: 74.0, bmi: 26.2, fat: 29.4, muscle: 25.9 },
    { date: "Jul 10, 2026", weight: 75.1, bmi: 26.6, fat: 30.2, muscle: 25.7 }
  ]
};
