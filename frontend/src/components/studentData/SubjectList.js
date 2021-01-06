import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SubjectList = ({ subjects, id }) => {
  console.log(subjects);
  return (
    <div>
      <h2>Subject Reports</h2>
      <ListGroup>
        {subjects.map((subject, index) => {
          const reportDate = new Date(subject.createdAt);
          return (
            <LinkContainer
              key={subject.subjectName}
              to={`/student/${id}/subject/${subject.subjectName}`}
            >
              <ListGroup.Item action variant='light'>
                {subject.subjectName}
              </ListGroup.Item>
            </LinkContainer>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default SubjectList;
