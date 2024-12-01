// Core packages
import Image from 'next/image'

// Section structure
import Section from '../../structure/section';
import Container from '../../structure/container';

// Section general blocks
import SectionTitle from '../../blocks/section.title.block'
import SectionGridBg from '../../blocks/section.grid.block'

// Section specific blocks
import BadgesBlock from '../../blocks/about.badges.block'
import CopyBlock from '../../blocks/about.copy.block'

// Section scss
import about from '../../../styles/sections/index/about.module.scss'

/**
 * Section: Technical
 * Highlight your technical skills with a short blurb about you,
 * Then display the programs you are proficient with and the technologies you use if applicable.
 * 
 * @returns {jsx} <Technical />
 */
export default function Technical() {
	return (
		<Section classProp={`${about.section} borderBottom`}>	
			<Container spacing={['verticalXXXLrg']}>
				<SectionTitle
					title="Core Technologies "
				/>
				<section className={`${about.content} ${about.container}`}>
					<div className={about.copy}>

						<BadgesBlock 
							title="Technology Stack Summary" 
							copy="This platform is built with a modern and efficient tech stack to ensure smooth AI interactions and easy scalability. It combines tools for interacting with hosted AI models, managing debates, and providing a seamless user experience."
							list={tech} 
							block="tech"
							fullContainer="fullContainer" 
							icon="laptop-code"
							containerClass={about.container}
							headerIcon={about.icon} 
						/>							
					</div>
				</section>	
			</Container>
			{/* <SectionGridBg gridSize={4}/> */}
		</Section>
	)
}


const tech	= [
	{ key: 'go', 		    name: 'GoLang', 			type: 'devicon' },
	{ key: 'modus', 		name: 'Modus', 			    type: 'devicon' },
	{ key: 'azure', 		name: 'Azure Cloud', 		type: 'devicon' },
	{ key: 'postgres', 		name: 'Postgres SQL', 		type: 'devicon' },
	{ key: 'javascript', 	name: 'JavaScript', 		type: 'devicon' },
	{ key: 'react', 		name: 'React', 				type: 'devicon' },
	{ key: 'nextjs', 		name: 'NextJS', 			type: 'devicon' },
	{ key: 'git', 			name: 'Git', 				type: 'devicon' },
]