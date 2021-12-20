# Introduction to Authentication Module Project

## Introduction

Use `Node.js`, `Express` and `Knex` to build an API that provides register, login and logout functionality.

## MVP

1. User can create/register as a `client` and login with the registered credentials.

2. User can create/register as an `instructor` by entering an additional Auth Code during signup, and can login with the registered credentials.

3. `client` and `instructor` are both presented with the appropriate on-boarding walkthrough on first sign-in, with an option to skip it.

4. Authenticated `Instructor` can create update and delete a `class`. At a minimum, each `class` must have the following properties:

- `Name`
- `Type`
- `Start time`
- `Duration`
- `Intensity level`
- `Location`
- `Current number of registered attendees`
- `Max class size`

5. Authenticated `client` can search for available classes. At a minimum, they must be able to search by the following criteria:

- `class time`
- `class date`
- `class duration`
- `class type`
- `intensity level`
- `class location`

6. Authenticated `instructor` can create virtual punch pass categories for each type of group fitness class they offer (yoga, insanity, RIPPED, pilates, etc.)

7. Authenticated `user` can reserve a spot in a `class` with available seats open, and can reschedule or cancel their current `reservation` from the mobile app.

## 🏃‍♀️**Stretch**

1. Implement payments using PayPal, Stripe or another 3rd party API.
