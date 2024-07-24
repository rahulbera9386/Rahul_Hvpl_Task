Overview:

This project involves transforming data from an Excel file into a specified JSON format and sending the transformed data to an API endpoint. The transformation process involves reading data from an Excel file, processing it to meet specific requirements, and then posting it to an API. The API endpoint receives and logs the data, and returns a success or failure message.

Project Structure:

index.js - Main application file that performs data transformation and API integration.
input_excel_file_v1.xlsx - Sample Excel file containing input data.
README.md - This documentation file.

Installation:-

1.Clone the repository:

git clone https://github.com/rahulbera9386/Rahul_Hvpl_Task.git

Install dependencies:

npm install

Configuration:-

Ensure that the Excel file input_excel_file_v1.xlsx is placed in the root directory of the project. This file will be read and transformed by the application.

Running the Application
To run the application, use the following command:

node index.js

Functionality
Reading the Excel File:

The application reads data from input_excel_file_v1.xlsx.
Transforming the Data:

The data is transformed into a specific JSON format.
This involves:
Aggregating customer data.
Creating a nested structure for panels and parameters.
Pushing Data to API:

The transformed JSON data is sent to the API endpoint: https://stage.myhealthvectors.com/testserver/receive-report.
Logs the success or failure message from the API response.