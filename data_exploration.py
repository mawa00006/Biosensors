# Author: Mattes Warning
import pandas as pd


def count_entries_per_hour_per_day(df):
    """
    Counts the number of entries for each hour of each day from a Dataframe with time-stamped measurements.

    :param: df (pd.DataFrame): A pandas Dataframe containing time measurements.
    :return: entries_per_hour_per_day (pd.Series): A Pandas Series with a MultiIndex
      (day, hour) representing the count of entries for each hour of each day.
    """

    # Convert the 'Time' column to datetime format
    df['Time'] = pd.to_datetime(df['Time'])

    # Create new columns for day and hour
    df['day'] = df['Time'].dt.date
    df['hour'] = df['Time'].dt.hour

    # Count the number of entries per hour per day
    entries_per_hour_per_day = df.groupby(['day', 'hour']).size()

    return entries_per_hour_per_day


def replace_missing_values(df):
    """
    Reads a CSV file containing time-stamped entries, replaces missing values,
    and creates new entries for each minute not in the original DataFrame.

    :param: df (pd.DataFrame): A pandas Dataframe containing time measurements.
    :return: filled_df (pd.DataFrame): The DataFrame with missing values replaced and new entries added.
    """

    # Convert the 'Time' column to datetime format
    df['Time'] = pd.to_datetime(df['Time'])

    # Create a DataFrame with a complete time range at one-minute intervals
    time_range = pd.date_range(start=df['Time'].min(), end=df['Time'].max(), freq='1T')
    complete_df = pd.DataFrame({'Time': time_range})

    # Merge the complete DataFrame with the original DataFrame
    merged_df = pd.merge(complete_df, df, on='Time', how='left')

    # Fill missing values with the average of the original data
    filled_df = merged_df.fillna(merged_df.mean())

    return filled_df


# In the provided CSV file there are some missing datapoints (not every hour has 60 measurements)
# Therefore we need to figure out which measurements are missing, how many are missing in total and
# figure out a way to work with them (average? interpolate? predict?)

csv_file_path = 'static/biosensors.csv'

data = pd.read_csv(csv_file_path)
original_data = data.copy(deep=True)

# Count number of measurements for each hour
entries = count_entries_per_hour_per_day(data)
num_60 = sum(entries.values == 60)

# Calculate the time differences between consecutive entries
data['time_diff'] = data['Time'].diff().dt.total_seconds() / 60.0

# Calculate the average gap between measurements
data_filtered = data[data['time_diff'] > 1]
average_gap = data_filtered['time_diff'].mean()
max_gap = data_filtered['time_diff'].max()
# Result: We have measurements for 7403 hours, 5266 of them are complete (60 entries) -> 2137 incomplete
# The minimum number of entries for one hour is 1.
# Largest Gap: 3326 minutes (03.6 - 06.6)

# For now, we will replace missing measurements by their average value
filled_data = replace_missing_values(original_data)

# Save data
filled_data.to_csv('static/filled_biosensors.csv')
