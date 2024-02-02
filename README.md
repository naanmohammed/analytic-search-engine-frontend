# Analytic Search Engine

## Overview

Analytic Search Engine is a Rails application that captures and analyzes search queries grouped by IP addresses. The application allows tracking searches, grouping them based on similarity, and displaying analytics.
- [Live Link](https://naanmohammed.github.io/analytic-search-engine-frontend/)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Capture and store search queries along with IP addresses.
- Group similar searches within a 60-second window.
- Provide analytics for grouped searches.

## Installation

### Prerequisites

- Ruby (version X.X.X)
- Ruby on Rails (version X.X.X)
- [Text gem](https://github.com/threedaymonk/text)

### Setup

Clone the repository:

   ```bash
   git clone https://github.com/naanmohammed/analytic-search-engine.git
   cd analytic-search-engine
   bundle install
   rails db:create
   rails db:migrate
   rails s
   ```

## Usage

The application provides endpoints to capture and analyze search queries. It also includes a simple frontend for interacting with the API.


## Frontend

The application includes a frontend with a real-time search feature. Users can type queries, view search results, and access analytics for IP addresses.

## Dependencies

- Ruby
- Ruby on Rails
- Text gem

## Contributing

Contributions are welcome!

## License

This project is licensed under the MIT License.



# INDIVIDUAL PROJECT: AWS EC2 - Documentation

## Objective

The objective of this documentation is to provide a step-by-step guide on how I deployed a basic website on Amazon EC2. The objective of the project is to demonstrate I can successfully log in to the AWS Management console, launch an EC2 instance, configure security groups to allow inbound traffic on ports 80 (HTTP) and 22 (SSH), connect to the EC2 instance using SSH, properly setup SSH connection and login, execute a bash script to update packages and install & enable Nginx to start on boot, and finally that I can use an existing HTML (which I did instead of creating a new one because an option was given on the rubric) to host and access it from the Instance's public IPv4 address on a web browser.

## Steps I used

### 1. AWS Account Setup and Login

- **Visit AWS Website:**
  - Open your web browser and go to [aws.amazon.com](https://aws.amazon.com/).
  ![AWS Homepage]('https://drive.google.com/file/d/1yo5Ok1y45t6tyua_5jI_-_-i6ehmOGOG/view?usp=sharing')

- **Log in:**
  - Click on "Sign In to the Console" and enter your AWS email address & password.

### 2. Launch an EC2 Instance

- **Navigate to EC2 Dashboard:**
  - In the AWS Management Console, click on "Services" and select "EC2" under the "Compute" section.

- **Launch an Instance:**
  - Click the "Launch Instances" button.

- **Choose an Amazon Machine Image (AMI):**
  - Select an AMI, for example, choose the Amazon Linux 2 AMI.

- **Choose an Instance Type:**
  - Select an instance type, e.g., `t2.micro` for free tier eligibility.

- **Configure Instance:**
  - Leave the default settings for "Configure Instance Details."

- **Add Storage:**
  - Leave the default storage settings.

- **Add Tags:**
  - (Optional) Add tags for better organization.

- **Configure Security Group:**
  - Create a new security group.
  - Allow inbound traffic on ports 22 (SSH) and 80 (HTTP).

- **Review and Launch:**
  - Review your configuration and click "Launch."

- **Key Pair:**
  - Choose "Create a new key pair" and download the key pair (.pem file).
  - Save it in a secure location.

- **Launch Instances:**
  - Click "Launch Instances."

### 3. Connect to EC2 Instance via SSH

- **Open Command Prompt (CMD) as Administrator:**
  - Open a CMD window as an administrator.

- **SSH Connection:**
  - Use the following command to connect to the EC2 instance:
    ```bash
    ssh -i ./Downloads/NDIVIDUAL-PROJECT-AWS-EC2.pem ec2-user@51.20.129.27
    ```

### 4. Install and Configure Nginx

- **Update Packages:**
  ```bash
  sudo yum update -y
  ```

- **Install Nginx:**
  ```bash
  sudo yum install -y nginx
  ```

- **Start Nginx:**
  ```bash
  sudo systemctl start nginx
  ```

- **Enable Nginx on Boot:**
  ```bash
  sudo systemctl enable nginx
  ```

### 5. Deploy the Website

- **Navigate to Nginx Web Root:**
  ```bash
  cd /usr/share/nginx/html
  ```

- **Remove Existing Files:**
  ```bash
  sudo rm -rf *
  ```

- **Download and Deploy HTML Content:**
  ```bash
  wget https://github.com/your-username/your-html-repo/archive/main.zip
  unzip main.zip
  rm main.zip
  ```

- **Restart Nginx:**
  ```bash
  sudo systemctl restart nginx
  ```

### 6. Access the Website

- **Copy Public IPv4 Address:**
  - Go to the EC2 instance details page in the AWS Management Console and copy the public IPv4 address.

- **Open Web Browser:**
  - Enter the public IPv4 address in your web browser.

## Conclusion

Congratulations! You have successfully set up a basic website on Amazon EC2 using Nginx. This project provides hands-on experience with AWS, covering key tasks such as launching an EC2 instance, configuring security groups, connecting via SSH, installing Nginx, and deploying a web application.
