import React from 'react';
import { Container } from '@mui/system';

// material
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// axios
import axios from 'axios';

// base URL
import BASE_URL from 'utils/baseUrl';
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from '@syncfusion/ej2-react-schedule';

const Section = styled(Box)(({ theme }) => ({
  padding: '0 80px',
  position: 'relative',
  backgroundColor: '#FFFFFF',
  [theme.breakpoints.down('sm')]: {
    padding: '0 24px',
    backgroundSize: '138px 144px',
  },
  [theme.breakpoints.down(321)]: {
    padding: '0 15px',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '29px',
  lineHeight: '33px',
  color: '#01110C',
  textAlign: 'center',
  margin: '50px 0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

const Agendas = () => {
  const [dataAgenda, setDataAgenda] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}agenda/public`, {
          headers: {
            'Content-Type': 'application/json',
            'Api-Version': 'v1',
          },
        });

        const data = response.data.data.map((item: any) => ({
          Id: item.id,
          Subject: item.title,
          StartTime: new Date(item.startDateTime),
          EndTime: new Date(item.endDateTime),
        }));
        setDataAgenda(data);
      } catch (error) {
        console.error('Error fetching agenda data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Section>
        <Container>
          <Title>View All Events</Title>
          <ScheduleComponent
            selectedDate={new Date()}
            eventSettings={{
              dataSource: dataAgenda,
            }}
          >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </Container>
      </Section>
    </>
  );
};

export default Agendas;
