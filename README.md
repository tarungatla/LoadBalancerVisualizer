# Load Balancing Algorithms Visualizer
This project simulates and visualizes different load balancing algorithms through backend simulations and an interactive frontend visualization. It aims to help students, developers, and system designers understand how various load balancing strategies operate in real-time.

## Introduction
Load balancing is a fundamental concept in system design that distributes incoming client requests or network traffic across multiple servers. This ensures no single server is overwhelmed, enhancing both performance and reliability.

With this project, you can simulate and visualize the behavior of the following load balancing algorithms:

🔁 **Round Robin**

⚖️ **Weighted Round Robin**

📉 **Least Connections**

## Features

🔧 Configurable number of servers

⚙️ Custom server weights for weighted algorithms

📊 Real-time request distribution and active connection tracking

🌐 Web-based visualizations with intuitive UI

## Tech Stack

### Backend
- Java – Core simulation logic

- Spring Boot – REST API for frontend communication

### Frontend
- React.js – Interactive visualization interface

- Tailwind CSS – Responsive and modern UI components

## Getting Started

### Prerequisites
- Java Development Kit (JDK) 8 or higher
- [Maven](https://maven.apache.org/) (optional, for managing dependencies)
- A code editor like IntelliJ IDEA or Visual Studio Code
- Node.js & npm

### Installation
1. Clone the repository:
   ```bash
      git clone https://github.com/tarungatla/LoadBalancerVisualizer.git
   ```

2. Open the project in IntelliJ IDEA.

3. Run the main class.

4. Frontend Setup:

    ```bash 
    cd frontend
    npm install
    npm run dev
    ```
5. Open your browser and go to http://localhost:5173 to view the visualization.
