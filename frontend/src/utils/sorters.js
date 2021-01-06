// Find average effort of the reports
// Returns an array of numbers representing a reports average effort
export const avgEffort = (data) => {
  return data
    .map((report) =>
      report.data.map((subject) => {
        return subject.effort;
      })
    )
    .map(
      (report) =>
        report.reduce((total, effort) => total + effort) / report.length
    );
};

// Sort the array of reports, newest first
export const orderedReports = (data) => {
  return data.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

//   Sort the sorted data by subject rather than by report date
export const subjectSorter = (data) => {
  let subjectReports = [];
  data.forEach((report) => {
    console.log(report);
    report.data.forEach((subject) => {
      console.log(subject);
      // If the subject name appears in the subjectreports array
      if (!subjectReports.some((o) => o.subjectName === subject.subjectName)) {
        // Add a new object
        let obj = { subjectName: subject.subjectName, data: [] };
        subjectReports.push(obj);
        subject.date = report.createdAt;
        obj.data.push(subject);
      } else {
        subjectReports.forEach((subjectArr) => {
          if (subjectArr.subjectName === subject.subjectName) {
            subject.date = report.createdAt;
            subjectArr.data.push(subject);
          }
        });
      }
    });
  });
  return subjectReports;
};
