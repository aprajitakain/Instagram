#!/bin/bash

# Function to find and kill processes running on a specific port
kill_process_on_port() {
    local port=$1
    local pid=$(lsof -t -i:$port)
    if [ -n "$pid" ]; then
        echo "Killing process on port $port (PID: $pid)"
        kill -9 $pid
    fi
}

# Function to handle cleanup
cleanup() {
    # Kill the Flask server process
    pkill -f "python3 server.py"

    # Kill the React server process on port 5000
    kill_process_on_port 5000
     # Kill the React server process on port 3000
    kill_process_on_port 3000

}

# Trap the EXIT signal to call the cleanup function
trap cleanup EXIT

# Kill any process running on port 5000
kill_process_on_port 5000
# Navigate to the backend folder
cd backend

# Start the backend server
python3 server.py &

# Wait for 3 seconds (adjust as needed)
sleep 3

# Navigate to the frontend folder
cd ../
cd frontend

# Install dependencies if not already installed
# You can skip this step if you've already installed the dependencies
# npm install

# Kill any process running on port 3000
kill_process_on_port 3000

# Start the frontend server
npm start
