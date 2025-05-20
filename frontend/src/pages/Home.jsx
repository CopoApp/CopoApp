import Navbar from '../components/Navbar';
import '../styles/index.css';
import { Heading } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';

import { Section } from '@radix-ui/themes';
import { Flex } from '@radix-ui/themes';
import { Grid } from '@radix-ui/themes';
import { Box } from '@radix-ui/themes';
import { AspectRatio } from '@radix-ui/themes';
import { Container } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';
import { Card } from '@radix-ui/themes';
import FeatureCard from '../components/FeatureCard';
import StepCard from '../components/StepCard';
import { Cell } from '@radix-ui/themes/components/table';
import { NavLink, useLocation } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Section pl="5" pr="5" id="hero-section" size="1" minHeight="10vh">
        <Flex justify="center" gap="5">
          <Flex direction="column" gap="5" justify="center">
            <Heading size="8">Lost Pet? Let’s Bring Them Home—Together.</Heading>
            <Heading weight="medium" size="5">
              CopoApp makes it fast and easy to report missing pets and mobilize your local NYC
              community.
            </Heading>
            <Flex gap="5">
              <NavLink to={'/sign-up'}>
                <Button size="3">Get Started</Button>
              </NavLink>
              <Button variant="outline" size="3">
                How it Works
              </Button>
            </Flex>
          </Flex>
          <Flex>
            <img
              src="https://copoapp-images.s3.us-east-1.amazonaws.com/other/homepic.jpg"
              alt="A woman hugging her dog"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Flex>
        </Flex>
      </Section>
      <Section id="value-section">
        <Flex direction="column" align="center" gap="5">
          <Heading size="7" align="center">
            What You Can Do with CopoApp
          </Heading>
          <Flex direction="column" gap="5">
            <FeatureCard
              title={'🚀 Post in Seconds'}
              content={
                'Whether your pet is missing or you’ve found someone else’s, you can create a report quickly—complete with photos, details, and location.'
              }
            ></FeatureCard>
            <FeatureCard
              title={'🌍 Community Comments & Tips'}
              content={
                'Neighbors can comment directly on your report to share sightings, encouragement, or updates.'
              }
            ></FeatureCard>
            <FeatureCard
              title={'🔖 Save Reports That Matter'}
              content={
                'Spotted a post you want to follow up on? Save it to your profile for easy tracking andfaster help.'
              }
            ></FeatureCard>
            <FeatureCard
              title={'🔧 Full Control of Your Posts'}
              content={
                'You can always go back to edit or update your reports and even your comments—because things change fast.'
              }
            ></FeatureCard>
          </Flex>
        </Flex>
      </Section>
      <Section id="how-it-works-section">
        <Flex direction="column" align="center" gap="5">
          <Heading size="7" align="center">
            How it Works
          </Heading>
          <Flex direction="column" gap="5">
            <StepCard
              title={'Step 1'}
              subtitle={'Create an Account'}
              content={'Quick signup with just your email, username, and password.'}
            ></StepCard>
            <StepCard
              title={'Step 2'}
              subtitle={'Submit a Missing Pet Report'}
              content={'Upload a photo, last known location, and details. Hit "Submit."'}
            ></StepCard>
            <StepCard
              title={'Step 3'}
              subtitle={'Engage the Community'}
              content={
                'Share your report via link or QR code. Neighbors comment and add sightings.'
              }
            ></StepCard>
            <StepCard
              title={'Step 4'}
              subtitle={'Celebrate the Reunion'}
              content={'Track updates, respond to tips, and rejoice when your pet comes home.'}
            ></StepCard>
          </Flex>
        </Flex>
      </Section>
      <Section id="call-to-action-section" pl="5" pr="5">
        <Flex direction="column" align="center" gap="5">
          <Heading size="7" align="center">
            Your Eyes Could Save a Life
          </Heading>
          <Heading weight="medium" size="5">
            Whether you're a pet parent, neighbor, or animal lover—you can help someone bring their
            best friend home.
          </Heading>
          <Container size="5">
            <img
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
              src="https://copoapp-images.s3.us-east-1.amazonaws.com/other/happy_woman_with_dog.jpg"
              alt="Happy woman with dog"
            />
          </Container>
          <NavLink to={'/sign-up'}>
            <Button size="3">Join CopoApp Today</Button>
          </NavLink>
        </Flex>
      </Section>
    </>
  );
}
