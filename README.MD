### Requirements:
* AWS Account
* Slack Web Hook (https://api.slack.com/incoming-webhooks)

### Quick Start

Open your AWS console

#### Create a lambda function
Go to AWS Lambda service, press `create function` button and fill the following fields
* Name - anything
* Runtime - Node.js 6.10
* Role - Create new role from template
    * Role Name - anything
    * Policy templates - AWS IoT Button permissions

#### Deploy code
```
You have already opened lambda configuration page, if not go to `lambda service/functions/your function`
```
Find the `Function code` block with inline editor and replace default code with content of `index.js`
Don't forget to save your changes.

#### Configure triggers
```
You have already opened lambda configuration page, if not go to `lambda service/functions/your function`
```
* Find a `Designer` block
* Select `AWS IoT` from the list on the left. `Configure triggers` will be appeared after
* Configure your button:
    * IoT type - IoT Button
    * Device Serial Number
    * Enable trigger - true
* Press `Generate certificate and keys` (save and don't loose it!)
* Follow the instructions to configure your button
* Submit the form by clicking the `add` button
* Don't forget to save your changes.

Useful links:
* [Configure an AWS IoT Button](https://docs.aws.amazon.com/iot/latest/developerguide/configure-iot.html)
* [Where I can get a password to the button's Wi-Fi access point](https://docs.aws.amazon.com/iot/latest/developerguide/images/rear_housing_wifi_password.png)


#### Configure environment variables
```
You have already opened lambda configuration page, if not go to `lambda service/functions/your function`
```

* Select a lambda in the designer graph (if it wasn't selected before)
* Find `Environment variables` block
* Add a new variable with key `path` and value `/services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX`. You can get if from your [Your Apps](https://api.slack.com/apps)<YOUR APP>/Incoming Webhooks

#### Customize messages
Open `index.js` and customize `singleClickMessage` and `doubleClickMessage` according to Slack messages format [(Doc)](https://api.slack.com/docs/message-attachments)
You can use [Message builder](https://api.slack.com/docs/messages/builder?msg=%7B%22text%22%3A%22I%20am%20a%20test%20message%20http%3A%2F%2Fslack.com%22%2C%22attachments%22%3A%5B%7B%22text%22%3A%22And%20here%E2%80%99s%20an%20attachment!%22%7D%5D%7D)
to see preview of your message
