# National Park Digital Platform 

This project is a web-based platform designed to serve as a digital websited for kenya National Parks. The system allows users to explore park information, including wildife, activities, and visitor guidelines, and book park approved lodges located within the park. 


## Key Features

Park-Centered Information Pages:
- A homepage showcasing different national parks
- Pages dedicated to different parks with descriptions, wildlife highlights, activities, and visitor information.

Lodge Management Layer:
- Listings of park-approved loddges within each park.
- Detailed pages for each lodge showing room types, pricing, eco-rating, and availability.
- A Structured room inventory per lodge

Booking Engine:
- Date-based stay duration calculation
- Guest input validation.
- Visitor category differentiation (Kenyan, EA, International).
- Dynamic total cost Computation
- Availability validation before confirmation
- Automatic capacity updates after succesful booking
- Overbooking prevention
- Low availability warnings to users


## User Flow
When a user interacts with the platform:
1. The user selects a national park,
2. Navigate to select a lodge,
3. Enters booking details including dates, guest count, and visitor category.
4. The System calculates the duration of stay and applies pricing rules,
5. Checks room inventory against requested capacity,
6. Confirms booking if availability is sufficient, and updates room inventory.
7. If the availability is insufficient, the system prevents confirmation 
