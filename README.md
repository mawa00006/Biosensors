# Biosensors

Biosensors is a project aimed at visualizing data measured with biosensors in a user-friendly way.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Configuration](#configuration)
5. [Features](#features)
6. [Contributing](#contributing)
7. [Credits](#credits)
8. [License](#license)
9. [Additional Notes](#additional-notes)

## Introduction

Biosensors is designed to provide an interface for visualizing data collected from biosensors. The project includes graphs for steps, heart rate, temperature, and calories, offering users an insightful view of their health metrics.

## Installation

To install Biosensors, follow these steps:

1. Clone the repository: `git clone [repository_url]`
2. Navigate to the project directory: `cd biosensors`
3. Install dependencies: `npm install`
4. Start the application: `npm start`

## Usage

Once installed, you can access Biosensors by opening the `index.html` file in your web browser. The interface includes buttons for different metrics such as steps, heart rate, temperature, and calories. Click on each button to visualize the corresponding data graph.
Additionally, the Date Range Picker feature allows users to select a specific time range for a more detailed view of their data.

## Workflow

1. Click on the button 'Open calendar' in the toolbar on the left corner and select a time point to get further information about your data.
2. If the selection of your date worked, the correct date should be updated beneath the 'Open calendar' button.
3. To visualize the dataset you first need to press the 'Step'-Button (two footprints).
4. A selected button is highlighted in light blue. (To check if the button is currently pressed).
5. Now you should see the steps of the selected day per hour in the format of a bar chart. Every bar chart includes a number which represents the explizit height of the bar.
   The red line which is horizontally aligned displays the mean of the steps of the day.
6. The question sign can give you the information about the total steps you performed at this day and a star highlights the bar with the most steps at the day.
7. Hovering over the graph or the icon can show you additional informations and fun facts about the subject.
8. Now you should select a time point which draws your attention for further analysis by clicking on the step graph.
9. The requested time point should light up in a vertical green bar.
10. Now you can click on one of the remaining buttons (curve symbol = Heartrate; thermostat symbol = temperatrue; burger symbol = calories) to display the related data.
11. If you hover throught the different graphs, you get the same highlight in the datasets.
12. Maybe you want to select a new time point? No problem. Execute step 8 again and hover of the remaining graphs to get the the new region of interest for analysis.

### Configuration

Biosensors does not require specific configuration. However, if you encounter issues, ensure that you have the necessary dependencies installed and that your browser is up to date.

## Features

- **Graph Visualization:** Display data graphs for steps, heart rate, temperature, and calories.
- **User-Friendly Interface:** Simple and intuitive interface for easy navigation.
- **Date Range Picker:** Select a specific time range for data visualization.

## Contributing

Contributions to Biosensors are welcome. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add a new feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

Please adhere to the [Contributor Covenant Code of Conduct](CONTRIBUTING.md).

## Credits

- [D3.js](https://d3js.org/) - Data visualization library.
- [Bootstrap](https://getbootstrap.com/) - Front-end framework.
- [DateRangePicker](https://github.com/dangrossman/daterangepicker) - Date range picker library.

## License

This project is licensed under the [MIT License](LICENSE).

## Additional Notes

### Custom Data

Users can modify the tool to use their own individual data by ensuring it is in the correct format.

### Future Steps

Given more time, the following steps could have been explored:

1. **User Authentication:** Implement user accounts to securely store and retrieve personal health data.
2. **Data Import/Export:** Allow users to import/export their biosensor data in various formats.
3. **Additional Metrics:** Expand the tool to include more health metrics and customizable dashboard components.
4. **Responsive Design:** Optimize the interface for a seamless experience across different devices.
