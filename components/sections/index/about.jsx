import Section from '../../structure/section';
import Container from '../../structure/container';

import SectionTitle from '../../blocks/section.title.block';

import BadgesBlock from '../../blocks/about.badges.block';
import CopyBlock from '../../blocks/about.copy.block';

import about from '../../../styles/sections/index/about.module.scss';
import css from '../../../styles/structure/footer.module.scss';

export default function About() {
  return (
    <div className={css.container}>
      <canvas id="gradient-canvas" className={''} data-transition-in></canvas>
      <Section classProp={about.section}>
        <Container spacing={['verticalXXXLrg']}>
          <SectionTitle
            title="About ArguAI"
            subTitle="ArguAI is an AI-powered debate platform that pits two intelligent systems against each other in lively debates. Users provide the topics, and our AIs do the rest—engaging in logical, insightful, and sometimes surprising discussions!"
          />
          <section className={about.content}>
            <div className={about.copy}>
              <CopyBlock
                title="Model-Powered Debates"
                containerClass={about.container}
                iconClass={about.icon}
                icon={['fat', 'robot']}
                copy="ArguAI leverages top-tier models, including Meta-Llama-3.1-8B-Instruct hosted on Hypermode, as well as GPT-4, GPT-3.5 Turbo, and others, to deliver the most engaging and insightful debates possible. Each output from one model serves as input for the opposing model, creating a dynamic, flowing debate. 
						Additionally, Modus, an open-source framework, facilitates the integration of various AI models and APIs, ensuring seamless communication between the debating models."
              />

              <CopyBlock
                title="AI Judge for Deciding the Winner"
                containerClass={about.container}
                iconClass={about.icon}
                icon={['fat', '']}
                copy="The debates are judged by a third AI model — an impartial AI judge that listens to both sides and determines the winner based on the strength of the arguments. 
						The AI judge evaluates factors like logical consistency, clarity, and argumentation quality to declare the more persuasive model as the winner."
              />

              <BadgesBlock
                title="Custom Personas for Models"
                containerClass={about.container}
                list={methods}
                fullContainer="fullContainer"
                block="methods"
                icon=""
                copy="Users can apply custom personas to the AI models, shaping their debate style, tone, and approach. Whether you want one model to be more aggressive and another to be calm, the personas ensure that each AI model has a distinct character. 
						These personas influence how the models argue, making debates more diverse, engaging, and interesting."
                headerIcon={`${about.icon}`}
              />

              <CopyBlock
                title="User-Centered Debate Creation"
                containerClass={about.container}
                iconClass={about.icon}
                icon={['fat', '']}
                copy="Users can select two AI models with specific personas and provide a debate topic. Once set, the AI models engage in a structured back-and-forth conversation, with the AI judge observing the entire exchange. 
						This hands-on approach allows users to create their own custom debates, tailored to their interests or curiosity."
              />
            </div>
          </section>
        </Container>
      </Section>
    </div>
  );
}

const methods = [
  { key: 'planet-moon', name: 'pragmatic analyst', type: 'fad' },
  { key: 'qrcode', name: 'visionary idealist', type: 'fad' },
  { key: 'window', name: 'data driven skeptic', type: 'fad' },
  { key: 'cubes', name: 'empathetic humanist', type: 'far' },
];
