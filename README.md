# CIS 1200 Study Tool

## What is this?

This is a study tool I built for University of Pennsylvania CIS 1200 students, focused on practicing OCaml.

The main idea is to give students a few different ways to practice and see where they stand. You can work through OCaml exercises, use a Try OCaml IDE, take a proficiency test inspired by language proficiency tests, and receive a proficiency level based on your performance. The site also includes some AI-generated videos for simple visual explanations.

Users can create their own profile to keep track of their progress and points, or use the site in guest mode. The project currently has an initial set of exercises and videos, with the intention that more content can be added as I progress through CIS 1200.

I built the project as a full-stack application using **React, Express/Node.js, and MongoDB**.

## Features I chose to include

### Frontend

* React-based interface with reusable components
* Interactive OCaml exercises
* Exercise filtering by topic and difficulty
* Try OCaml IDE integration
* Proficiency test
* Progress and points tracking
* AI-generated instructional videos
* Guest mode and user profiles

### Backend

* User registration
* User login and logout
* Authentication using JWT
* API calls between the frontend and backend
* MongoDB database integration using Mongoose
* Storage of user profiles, exercise data, and progress
* Exercise answer submission and automatic grading
* Proficiency level calculation based on points

### Full Stack

The frontend and backend are connected through a REST API. The React frontend communicates with the Express backend, which handles authentication, exercise data, progress, and database operations.

## Time Spent

I did my best to stick to the four-hour limit specified for the assessment.

**Approximately 4 hours.**

Because I wanted to respect that limit (and still have a life and do my actual homework), there are some bugs and unfinished ideas that I am aware of but intentionally left for later. I also did not have enough time to deploy the application properly.

A few of the things I would work on next include adding more exercises and videos, improving the mobile experience, and continuing to expand the progress-tracking and IDE functionality.

> **Note:** While the project is entirely my own work, I definitely took advantage of proper outside resources — documentation, online resources, and AI assistance. But AI can't make nice ideas, nor can it debug — talking from experience.

## Running the Project

The easiest way to run the project is through **GitHub Codespaces**.

### Backend

From the root of the repository:

```bash
npm install
npm start
```

The backend runs on **port 5001**.

### Frontend

In a second terminal:

```bash
cd frontend
npm install
npm start
```

The frontend runs on **port 3000**.

For the application to communicate with the backend in a Codespace, the backend port needs to be made publicly accessible.

### Database

The application uses **MongoDB** for storing users, exercises, and progress.

Depending on the environment in which the project is run, MongoDB's IP access restrictions may prevent the database from being reached. If you have trouble accessing the database or loading the exercise content when running the project locally, please contact me, and I can help provide access to a working version :))

## Working Demo

I also have a video demonstrating the working application and its main features.

**[Watch the working demo](https://drive.google.com/file/d/1oyV5kGs3lVEIUra4rKMBOc64JqYXBATV/view?usp=sharing)**

## Repository

**[Marymelkady/CIS-1200-Study-app](https://github.com/Marymelkady/CIS-1200-Study-app)**
