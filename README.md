# On Wave Task
"Explore the ultimate sports and fitness hub, where passion meets performance. Our website is your go-to destination for all things sports, delivering the latest news, expert insights, and in-depth coverage of various athletic disciplines. Dive into a world of fitness tips, workout routines, and wellness inspiration to elevate your game and lead a healthier lifestyle. Whether you're a seasoned athlete or a fitness enthusiast, discover the power of sport and wellness on our dynamic platform."

## API Routes

| **Endpoint**                        | **Method** | **Description**                                            | **Parameters**                                      |
| ----------------------------------- | ---------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| `/api/users/:userId`                 | GET        | Retrieve user information based on the provided user ID.  | `userId` (required): The ID of the user to retrieve. |
| `/api/users`                         | POST       | Create a new user.                                        | Request Body: `email` (required), `password` (required) |
| `/api/users/upload/:userId`          | POST       | Upload an image for a specific user.                      | `userId` (required): The ID of the user. Request Body: `image` (required) |
| `/api/users/images/:userId`          | GET        | Retrieve a list of images associated with a specific user. | `userId` (required): The ID of the user.            |

## How to Run

Follow these steps to run the application using Docker.

### Prerequisites

- [Docker](https://www.docker.com/) installed on your machine.

### Instructions

1. Clone the repository:

   ```bash
   git clone git@github.com:mirsahib/onwave-task.git
2. ```bash 
    cd onwave-task
3. ```bash
    docker-compose up
4. in your browser open http://localhost:8080

### Notes
- phypmyadmin: http://localhost:8081