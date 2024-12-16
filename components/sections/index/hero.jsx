import Section from '../../structure/section';
import Container from '../../structure/container';

import space from '../../utils/spacing.util';

import HeroBg from '../../blocks/hero.bg/bg-color-1';

import hero from '../../../styles/sections/index/hero.module.scss';
import button from '../../../styles/blocks/button.module.scss';

import content from '../../../content/index/hero.json';
import Link from 'next/link';
import Navbar from '../../layout/navbar';

export default function Hero() {
  return (
    <>
      {' '}
      <Navbar />
      <Section classProp={`${hero.section}`}>
        <Container spacing={'VerticalXXXL'}>
          <section>
            <h1 className={`${hero.header} ${hero.primaryDim}`}>
              {content.header.usp}
            </h1>
          </section>
          <section>
            <p
              className={`${hero.primaryBright} subtitle ${space(['verticalLrg'])}`}
            >
              {content.paragraph}
            </p>
          </section>
          <section>
            <button className={`button ${button.primary}`}>
              <Link style href="/chat">
                {content.buttons.primary.title}
              </Link>
            </button>

            <button
              className={`button ${button.secondary} leaveSite`}
              onClick={() =>
                window.open('https://github.com/hypermodeinc/modus', '_blank')
              }
            >
              {content.buttons.secondary.title}
            </button>
          </section>
        </Container>
        <HeroBg theme="bg-color-1" />
      </Section>
    </>
  );
}
