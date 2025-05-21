import Navbar from '../components/Navbar';
import '../styles/index.css';
import { Heading } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';

import { Section } from '@radix-ui/themes';
import { Flex } from '@radix-ui/themes';
import { Container } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';
import FeatureCard from '../components/FeatureCard';
import StepCard from '../components/StepCard';
import { Cell } from '@radix-ui/themes/components/table';
import { NavLink, useLocation } from 'react-router-dom';
import { useRef } from 'react';

export default function Home() {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <Section pl="5" pr="5" id="hero-section" size="1" minHeight="10vh">
        <Flex justify="center" gap="5" className="hero-container">
          <Flex direction="column" gap="5" justify="center" className="hero-content-container">
            <Heading size="8">Lost Pet? Let’s Bring Them Home—Together.</Heading>
            <Heading weight="medium" size="5">
              CopoApp makes it fast and easy to report missing pets and mobilize your local NYC
              community.
            </Heading>
            <Flex gap="5">
              <NavLink to={'/sign-up'}>
                <Button size="3">Get Started</Button>
              </NavLink>
              <Button variant="outline" size="3" onClick={scrollToSection}>
                How it Works
              </Button>
            </Flex>
          </Flex>
          <Flex>
            <img
              className="hero-image"
              src="https://copoapp-images.s3.us-east-1.amazonaws.com/other/homepic.jpg"
              alt="A woman hugging her dog"
              style={{
                width: '20rem',
              }}
            />
          </Flex>
        </Flex>
      </Section>
      <Container size={'8'} pt={'30px'} pl={'9'} pr={'9'}>
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
        <Section id="how-it-works-section" ref={sectionRef}>
          <Flex direction="column" align="center" gap="5">
            <Heading size="7" align="center">
              How it Works
            </Heading>
            <Flex direction="column" gap="5">
              <StepCard
                title={'Step 1'}
                subtitle={'Create an Account'}
                content={'Quick signup with just your email, username, and password.'}
                imgSrc={'https://copoapp-images.s3.us-east-1.amazonaws.com/other/feature1.png'}
              ></StepCard>
              <Flex justify={'center'}></Flex>
              <StepCard
                title={'Step 2'}
                subtitle={'Submit a Missing Pet Report'}
                content={'Upload a photo, last known location, and details. Hit "Submit."'}
                imgSrc={'https://copoapp-images.s3.us-east-1.amazonaws.com/other/feature2.png'}
              ></StepCard>
              <StepCard
                title={'Step 3'}
                subtitle={'Engage the Community'}
                content={'Neighbors comment and add sightings.'}
                imgSrc={'https://copoapp-images.s3.us-east-1.amazonaws.com/other/feature3.png'}
              ></StepCard>
              <StepCard
                title={'Step 4'}
                subtitle={'Celebrate the Reunion'}
                content={'Track updates, respond to tips, and rejoice when your pet comes home.'}
                imgSrc={
                  'https://copoapp-images.s3.us-east-1.amazonaws.com/other/happy_woman_with_dog.jpg'
                }
              ></StepCard>
            </Flex>
          </Flex>
        </Section>
      </Container>

      <Section id="call-to-action-section" pl="5" pr="5">
        <Flex direction="column" align="center" gap="5">
          <Heading size="7" align="center">
            Your Eyes Could Save a Life
          </Heading>
          <Heading weight="medium" size="5">
            Whether you're a pet parent, neighbor, or animal lover—you can help someone bring their
            best friend home.
          </Heading>

          <NavLink to={'/sign-up'}>
            <Button size="3">Join CopoApp Today</Button>
          </NavLink>
        </Flex>
      </Section>
    </>
  );
}
