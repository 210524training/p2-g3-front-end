# Chatapredu

## Project Description

**Chatapredu** is a chat-oriented application that incorporates some social media-like functionalities. In this application, you have the main chat functionality that lets a user directly message another user, or create a group chat to message multiple users at once. This application also contains a forum discussion system that allows users to create a discussion and post it with certain tags to identify the topic(s) discussed or shown in the post. This forum system allows other users to comment/reply to the post and like the post.

## Technologies Used

### Frontend

* TypeScript
* React Native with Redux
* React Navigation

### Backend

* [Cognito](https://aws.amazon.com/cognito/)
* [AWS Lambda](https://aws.amazon.com/lambda/)
* [AWS S3](https://aws.amazon.com/s3/)
* [DynamoDB](https://aws.amazon.com/dynamodb/)

## Features

* Global Chat
* Create a new account/login with previous account
* Create forum discussions
* Comment on posts
* Search for users
* Adding/changing profile status

### To-do:

* Group messaging
* Direct messaging
* Setting and resetting profile image
* Setting rooms to public or private
* Changing interests when editing profile

## Usage

> Once the application has loaded onto an device or virtual machine, you will be greeted by the login screen.
   - (Screenshot of Login screen)
> If you have an account, simply type in the credentials then press the login button.
   - If you have not created an account, you may do so by pressing the No Account text displayed below the login button.
   - You will then be taken to the register screen where you can enter your credentials, select your interests, then press the register button to create your account
> Once login is complete you will be directed to the chats page where you will see all of your recent chats.
> To continue chatting you can select a chat from the list and once redirected to that room, you may proceed with your messages.
   - (Screenshot of Chats page)
   - To create a new chat you can press the message icon at the bottom right corner of the screen, select the contact you would like to send a message to, then begin      your messaging.
> You can navigate through different pages by selecting the tabs on the nav bar (Top for androind, bottom for ios)
> The profile screen provides you information about the current account you're logged in as, an option to logout of the current account and a help link for any         assistance with your account.
   - (Screenshot of Profile page)
   - To edit your profile, press on the pencil icon on the bottom right corner of the screen. As of now you are only able to edit your profile status. Press the save      button to save changes.
> By navigating to the discussions tab you can view recommended discussion postsand create your own posts by pressing the message icon on the bottome right.
   - (Screenshot of Discussions page)
   - Select a post from the list to view it. On this page you can view, add a comment/reply, and like the post you have selected.
> The next tab is the Search tab that allows you to search for users by their usernames.
   - (Screenshot of Search page with example search)

## Contributors

> Dustin Diaz, 
> Charles Ammons, 
> Prem Patel, 
> Taiwo Ogunseye

## License

This project uses the following license: [MIT](./LICENSE).

