export const mapEmployeesData = (data = []) => {
  return {
    metaData: {
      title: "Employees | TOTE"
    },
    mainSection: {
      employeesTable: {
        isFilters: true,
        isPagination: true,
        rowLabels: ['Full Name', 'Email id', 'Phone Number', 'Address', 'Role', 'Salary', 'Action'],
        rows: data?.map((item) => {
          // Convert 'Salary' from string to number if it exists and is a non-empty string
          const salary = item?.salary && !isNaN(parseFloat(item.salary)) ? parseFloat(item.salary) : '-';
          return {
            action: 'Update',
            id: item?._id,
            cells: [
              { value: item?.name ?? '-' },
              { value: item?.email ?? '-' },
              { value: item?.phone ?? '-' },
              { value: item?.address ?? '-' },
              { value: item?.role ?? '-' },
              { value: salary }, // Display the converted salary as a number or '-' if it's not convertible
            ],
          };
        }),
      },
    },
  };
};
