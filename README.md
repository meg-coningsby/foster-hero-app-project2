# 🐱 [Foster Hero App](https://foster-hero-app.onrender.com/) 🐱

This is Project 2 for my General Assembly Course - Software Engineering Immsersive.

**Table of Contents:**

-   [App Overview](#item-one)
-   [Technologies Used in App](#item-two)
-   [Getting Started](#item-three)
-   [App Screenshots](#item-four)
-   [Next Steps](#item-five)
-   [Resources / Links](#item-six)

<a id="item-one"></a>

## 📖 App Overview

A management app for animal rescue groups (more specifically cats, but it could be customised for any animals) that manage foster carers, animals, vets and vet appointments.

The core features of the app:

-   View all animals that are available for adoption (just as an overview - you can't click in to any animal details).
-   Log in to view the details behind the rescue animals, foster carers, vets and vet appts.
-   Add, edit or remove animals.
-   Add notes or vet appointments to a specific animal.
-   View all foster carers and then what animals are currently under their care.
-   View all rescue approved vets, and the appointments at those vets.

<a id="item-two"></a>

## 💻 Technologies Used in App

This app is coded using:

-   JavaScript
-   HTML
-   CSS
-   Mongoose
-   Express
-   Node

<a id="item-three"></a>

## 🏁 Getting Started

Head over to the app [here](https://foster-hero-app.onrender.com/).

1. Log in

You will need to log in to see most of the pages on the app. Unauthenticated users can only see a list of cats that are currently up for adoption - no other pages. Logging in does create a user profile for you - which is added to the app's Foster Carers (as if this app was used with a real world rescue group, all that log in would be members of the group). You can delete your profile once you are finished browsing the app, see step 3 below.

2. Browse the app.

You will notice that some things are not editable by your user - you can only:

-   Edit or delete your own Foster Carer profile.
-   Edit or remove any cats you created (all other cats are not editable by your user).
-   Add a vet appointment for a cat you created.
-   Add or delete notes to a cat. You can only delete a note you created.

3. Delete your user profile (if you wish).

If you want to remove your user profile on the app, head to Foster Carers and then your specific user page. You should see a 'Remove' button. Please note, removing your user profile will log you out of the app.

_Please note, all the data included in the app is just for demo purposes. Most of the data in the app has been made up, although all the cats linked to the Foster Carer 'Meg' were all my foster cats at one point. The details of each of these cats are still made up, but their photos and names are real! All have been adopted and are now in new homes._

<a id="item-four"></a>

## 📸 App Screenshots

Homepage - Not Logged In:
![](./public/screenshots/Homepage-Not%20Logged%20In.png)

Homepage - Logged In:
![](./public/screenshots/Homepage-Logged%20In.png)

All Cats:
![](./public/screenshots/All%20Cats.png)

Show a Cat:
![](./public/screenshots/Show%20Cat.png)

All Foster Carers:
![](./public/screenshots//All%20Foster%20Carers.png)

All Vets
![](./public/screenshots/All%20Vets.png)

<a id="item-five"></a>

## ⏭️ Next steps

Planned future enhancements for the app:

-   Link animals together via a parent or sibling relationships.
-   ~~Have filtering of vet appointments between past & upcoming appointments.~~ Completed 23/12
-   ~~Allow editing / deletion of vet appointments, but only by the foster carer of the animal or an admin.~~ Completed 22/12
-   ~~Search functionality for searching through all cats.~~ Completed 27/12
-   ~~Pagination for the cat index page.~~ Completed 28/12
-   Ability to upload image (not add an image URL).

<a id="item-six"></a>

## 🔎 Resources / Links

-   [Initial Wireframes](https://www.figma.com/file/kGZDQ7w3JM5P3DmKD5l1LK/Project-2-Wireframes?type=design&node-id=0%3A1&mode=design&t=vPxW2SMYDmTOVvFf-1)
-   [ERD](https://miro.com/app/board/uXjVNKYebR0=/?share_link_id=298463988797)
-   [Trello Board](https://trello.com/b/PgzfXyUs/general-assembly-project-2): includes user stories and links to the wireframes and ERD.
