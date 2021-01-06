import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ReportsList = ({ reports, id }) => {
  console.log('reports', reports);
  return (
    <div>
      <h2>Reports</h2>
      <ListGroup>
        {reports.map((report, index) => {
          const reportDate = new Date(report.createdAt);
          return (
            <LinkContainer
              key={report._id}
              to={`/student/${id}/report/${report.createdAt}`}
            >
              <ListGroup.Item action variant='light'>
                Report Date:{reportDate.getDate()}/{reportDate.getMonth() + 1}/
                {reportDate.getFullYear()}{' '}
                {index === 0 && <span>(Latest)</span>}
              </ListGroup.Item>
            </LinkContainer>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default ReportsList;
