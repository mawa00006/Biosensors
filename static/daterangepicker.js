/*
Author: Sophia Gaupp
Author: Mattes Warning
*/

// Initialize first with the current day
var selectedDateRange = {
    startDate: moment(),
    endDate: moment()
};
        $(document).ready(function () {
            // Initialize DateRangePicker
            $('#reportrange').daterangepicker({
                startDate: moment().subtract(7, 'days'),
                endDate: moment(),
                ranges: {
                    'Today': [moment(), moment()],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            });

            // Show the default date range
            $('#reportrange').find('span').html(selectedDateRange.startDate.format('MMMM D, YYYY') + ' - ' + selectedDateRange.endDate.format('MMMM D, YYYY'));

            // Show the selected date range
            $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
                $(this).find('span').html(picker.startDate.format('MMMM D, YYYY') + ' - ' + picker.endDate.format('MMMM D, YYYY'));
                selectedDateRange = {
                    startDate: picker.startDate,
                    endDate: picker.endDate
                }

            });

            // Open DateRangePicker when the button is clicked
            $('#openPickerBtn').click(function () {
                $('#reportrange').trigger('click');
            });
        });

        // Function to get the selected date range
function getSelectedDateRange() {
    return selectedDateRange;
}