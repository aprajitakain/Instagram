# Instagram Notes App

## Introduction
This shell script is designed to run the Instagram Notes application. The application comprises a Flask backend (Python) and a React frontend (JavaScript).

## Prerequisites
Before running the script, ensure you have the following prerequisites installed and set up:

1. **PostgreSQL Database**
   - Ensure that you have PostgreSQL installed on your system.
   - Create a database named `Instagram`.

2. **Database Table**
   - Create a table named `notes` within the `Instagram` database.

## Usage
1. Clone the repository: `git clone https://github.com/aprajitakain/Instagram.git`
2. Navigate to the project directory: `cd Instagram`

## Running the Script
Execute the shell script by running the following command:
./start_instagram.sh


Cleanup
The script automatically handles cleanup when it exits. It kills any processes running on ports 5000 and 3000.

Notes
The backend server runs on port 5000.
The frontend server runs on port 3000.

Important
Make sure to configure your PostgreSQL database and create the necessary database and table as mentioned in the prerequisites.

