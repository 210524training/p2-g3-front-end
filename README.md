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

## Get Started

> First navigate to the location where you would like to store a clone of this repository on your local device using Git Bash. Use the following command:
   - `git clone https://github.com/210524training/p2-g3-front-end.git`
> Once you have cloned the repository, open the folder in the terminal and install all required dependancies by typing in the following commands: 
   - `cd p2-g3-front-end`
   - `npm install`
   - `amplify pull`

## Usage

> To launch the application on a device or virtual machine, use the this command: 
   - `npm start`
> Once the application is loaded, your web browser will launch a page prompting you to select a virtual device.
   - If you are using a physical device, make sure to install the Expo mobile app from Google Play store(Android) or the App store(IOS) and select the Tunnel option next to connection before scanning the QR code on the screen.
> Once the application has loaded onto an device or virtual machine, you will be greeted by the login screen.
   <img src="https://user-images.githubusercontent.com/84411139/126687107-0befa03c-c373-4a67-a169-014501b7d4a9.png" width="200" height="400" />
   
> If you have an account, simply type in the credentials then press the login button.
   - If you have not created an account, you may do so by pressing the No Account text displayed below the login button.
   - You will then be taken to the register screen where you can enter your credentials, select your interests, then press the register button to create your account
> Once login is complete you will be directed to the chats page where you will see all of your recent chats.
> To continue chatting you can select a chat from the list and once redirected to that room, you may proceed with your messages.
   <img src="https://user-images.githubusercontent.com/84411139/126687737-e5512666-d003-4f75-afd7-c0049b6b24a0.png" width="200" height="400" />
   
   - To create a new chat you can press the message icon at the bottom right corner of the screen, select the contact you would like to send a message to, then begin      your messaging.
> You can navigate through different pages by selecting the tabs on the nav bar (Top for androind, bottom for ios)

> The profile screen provides information about the current account you're logged in as, an option to logout of the current account and a help link for any         assistance with your account.
   <img src="https://user-images.githubusercontent.com/84411139/126687891-b44db8e6-376b-4e0c-9eb2-e2b4e69aaf3e.png" width="200" height="400" />
   
   - To edit your profile, press on the pencil icon on the bottom right corner of the screen. As of now you are only able to edit your profile status. Press the save      button to save changes.
> By navigating to the discussions tab you can view recommended discussion posts, search for posts, and create your own posts by pressing the message icon on the bottom right.
   <img src="https://user-images.githubusercontent.com/84411139/126687971-dff138a0-c9ef-4182-b934-85d019b4e695.png" width="200" height="400" />
   
   - Select a post from the list to view it. On this page you can view, add a comment/reply, and like the post you have selected.
> The next tab is the Search tab that allows you to search for users by their usernames.
   <img src="https://user-images.githubusercontent.com/84411139/126688044-325b11d0-84e5-4740-b289-9ad1f361ac5f.png" width="200" height="400" />


## Contributors

> Dustin Diaz, 
> Charles Ammons, 
> Prem Patel, 
> Taiwo Ogunseye

## License

This project uses the following license: [MIT](./LICENSE).

