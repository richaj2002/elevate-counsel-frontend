# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# elevate-counsel-frontend
Appointment Scheduler for Career and Soft Skills Counseling
===========================================================
# Project Overview
This project focuses on developing the frontend of an Appointment Scheduler designed for students seeking career counseling, soft skills improvement (such as communication or grooming), and mental health support. The system facilitates booking sessions, managing schedules, and providing a user-friendly interface for both students and counselors.

# Key Objectives:
Enable students to book sessions for career counseling, soft skills improvement, and mental health support.
Provide a user-friendly dashboard for students to manage their appointments and profiles.
Ensure timely notifications and confirmations through emails or in-app notifications.

# Features
User Registration and Login: Secure user registration and authentication.
Dashboard: A central hub for managing appointments, viewing upcoming sessions, and accessing profile settings.
Appointment Scheduling: Easy booking process with real-time availability checks.
Notifications: Automated email or in-app notifications for appointment confirmations and reminders.
Profile Management: Users can update their personal information and manage their account settings.

# User Stories
Present user stories to Explain how different types of users (students, counselors) will interact with the system.
For example:
As a student, I want to view available time slots for counseling sessions.
As a counselor, I want to manage my availability and see booked appointments.
As an administrator, I want to monitor overall system activity and manage user accounts.

# Data Models
--------------------------------------------------
### User Table
| Column Name | Data Type | Description |
| ----------- | --------- | ----------- |
| UserID      | INT       | Primary Key, Auto-increment |
| Username    | VARCHAR   | Username of the user |
| Email       | VARCHAR   | Email address of the user |
| Password    | VARCHAR   | Encrypted password |
| UserType    | ENUM      | Type of user (student, counselor, administrator, etc.) |

### Appointment Table
| Column Name       | Data Type | Description |
| ----------------- | --------- | ----------- |
| AppointmentID     | INT       | Primary Key, Auto-increment |
| UserID            | INT       | Foreign Key referencing User.UserID |
| CounselorID       | INT       | Foreign Key referencing Counselor.CounselorID |
| AppointmentDate   | DATE      | Date of the appointment |
| StartTime         | TIME      | Start time of the appointment |
| EndTime           | TIME      | End time of the appointment |
| AppointmentType   | ENUM      | Type of appointment (career counseling, soft skills improvement, mental health, etc.) |
| Status            | ENUM      | Status of the appointment (pending, confirmed, canceled, etc.) |

### Counselor Table
| Column Name | Data Type | Description |
| ----------- | --------- | ----------- |
| CounselorID | INT       | Primary Key, Auto-increment |
| Name        | VARCHAR   | Name of the counselor |
| Email       | VARCHAR   | Email address of the counselor |
| Specialization | VARCHAR | Area of specialization (career counseling, soft skills improvement, mental health, etc.) |
