# Handcrafted Haven User Stories

## Account Management

- [ ] As a visitor, I can create an account so I can make purchases and save my preferences
  - Description: Adding an account system to the project with registration and login functionality

## Product Browsing & Search

- [ ] As a user, I can view detailed product information including materials used and how it was made
  - Description: View what materials was used for the product and how it was made
- [ ] As a user, I can filter between specific craft types like leatherwork and woodwork
  - Description: Search for specific works like leatherworking or woodworking
- [ ] As a user, I can use a search bar to find specific products
  - Description: Adding a search functionality to the products page
- [ ] As a user, I can compare one product with another to help make decisions
  - Description: Being able to compare one product from another

## Shopping Experience

- [ ] As a customer, I can add products to a cart for checkout
  - Description: Adding a cart for checkout of products
- [ ] As a customer, I can initiate returns for products I've purchased
  - Description: Adding a page to establish that they want to return product

## Reviews & Feedback

- [ ] As a user, I can add reviews and view reviews from other customers
  - Description: Adding a way that reviews can be added and shown

## User Experience Features

- [ ] As a user, I can switch to dark mode for better viewing in low light
  - Description: To make the screen go into a dark mode
- [ ] As a user, I can access FAQs and help screens when I need support
  - Description: Adding a support feature for those who have commonly asked questions and a help screen

## Priority Order (Sprint Planning)

### Sprint 1 (Weeks 1-2) - Core Foundation

- Account system (registration/login)
- Basic product viewing with materials and creation details
- Simple search bar functionality

### Sprint 2 (Weeks 3-4) - Product Features

- Filter system for craft types (leatherwork/woodwork)
- Shopping cart functionality
- Basic review system (add and view reviews)

### Sprint 3 (Weeks 5-6) - Enhanced Experience

- Product comparison feature
- Returns process page
- FAQs and help screen

### Sprint 4 (Weeks 7-8) - Polish & Launch

- Dark mode implementation
- UI/UX improvements
- Mobile responsiveness
- Testing & deployment

## Technical Notes

- **Cart System**: Will need session/local storage for guest users, database storage for logged-in users
- **Product Comparison**: Consider limiting to 2-3 products at a time for better UX
- **Dark Mode**: Implement with CSS variables or Tailwind dark: classes
- **Search**: Start with basic text search, can enhance with filters later
- **Returns**: Create clear return policy and process workflow
