import {
  ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselProgress,
  ScrollXCarouselWrap
} from "@/components/ui/scroll-x-carousel";
import {
  CardHoverReveal,
  CardHoverRevealMain,
} from '@/components/ui/reveal-on-hover'

const CNC_STORIES = [
  {
    id: 'story-1',
    title: 'Precision Engineering',
    description: 'From concept to creation, our CNC machines deliver unmatched precision in every cut, ensuring your parts meet the tightest tolerances.',
    services: ['precision', 'engineering', 'quality'],
    type: 'Manufacturing',
    imageUrl: '/images/1.png',
  },
  {
    id: 'story-2',
    title: 'Rapid Prototyping',
    description: 'Turn your ideas into reality in days, not weeks. Our advanced CNC technology accelerates your product development cycle.',
    services: ['prototyping', 'speed', 'innovation'],
    type: 'Development',
    imageUrl: '/images/2.png',
  },
  {
    id: 'story-3',
    title: 'Material Mastery',
    description: 'From aluminum to titanium, our CNC machines handle diverse materials with expertise, delivering consistent results across all projects.',
    services: ['materials', 'versatility', 'expertise'],
    type: 'Materials',
    imageUrl: '/images/3.png',
  },
  {
    id: 'story-4',
    title: 'Smart Manufacturing',
    description: 'AI-powered optimization and real-time monitoring ensure maximum efficiency and minimal waste in every production run.',
    services: ['automation', 'AI', 'efficiency'],
    type: 'Technology',
    imageUrl: '/images/4.png',
  },
  {
    id: 'story-5',
    title: 'Quality Assurance',
    description: 'Every part undergoes rigorous quality checks using advanced measurement systems, guaranteeing perfection in every delivery.',
    services: ['quality', 'testing', 'precision'],
    type: 'Quality',
    imageUrl: '/images/5.png',
  },
  {
    id: 'story-6',
    title: 'Custom Solutions',
    description: 'Every project is unique. Our team works closely with you to deliver custom CNC solutions tailored to your specific requirements.',
    services: ['custom', 'consultation', 'solutions'],
    type: 'Service',
    imageUrl: '/images/1.png',
  },
  {
    id: 'story-7',
    title: 'Advanced Tooling',
    description: 'State-of-the-art cutting tools and techniques ensure superior surface finishes and dimensional accuracy.',
    services: ['tooling', 'surface', 'accuracy'],
    type: 'Technology',
    imageUrl: '/images/2.png',
  },
  {
    id: 'story-8',
    title: 'Production Scale',
    description: 'From single prototypes to high-volume production runs, we scale with your business needs.',
    services: ['production', 'scale', 'volume'],
    type: 'Manufacturing',
    imageUrl: '/images/3.png',
  },
  {
    id: 'story-9',
    title: 'Industry Expertise',
    description: 'Decades of experience serving aerospace, automotive, medical, and industrial sectors.',
    services: ['aerospace', 'automotive', 'medical'],
    type: 'Experience',
    imageUrl: '/images/4.png',
  },
  {
    id: 'story-10',
    title: 'Future Ready',
    description: 'Continuous investment in cutting-edge technology keeps us at the forefront of manufacturing innovation.',
    services: ['innovation', 'future', 'technology'],
    type: 'Innovation',
    imageUrl: '/images/5.png',
  },
];

export default function StoryCarousel() {
  // Create seamless carousel by duplicating stories
  const seamlessStories = [...CNC_STORIES, ...CNC_STORIES];

  return (
    <ScrollXCarousel className="h-[250vh]">
      <ScrollXCarouselContainer className="h-dvh place-content-center flex flex-col gap-8 py-12">
        {/* Left gradient overlay */}
        <div className="pointer-events-none w-[12vw] h-[103%] absolute inset-[0_auto_0_0] z-10 bg-[linear-gradient(90deg,_var(--background)_35%,_transparent)]" />
        
        {/* Right gradient overlay */}
        <div className="pointer-events-none bg-[linear-gradient(270deg,_var(--background)_35%,_transparent)] w-[15vw] h-[103%] absolute inset-[0_0_0_auto] z-10" />
        
        {/* Story cards */}
        <ScrollXCarouselWrap 
          className="flex-4/5 flex space-x-8"
          xRagnge={['-0%', '-50%']}
        >
          {seamlessStories.map((story, index) => (
            <CardHoverReveal
              key={`${story.id}-${index}`}
              className="min-w-[70vw] md:min-w-[38vw] shadow-xl border xl:min-w-[30vw] rounded-xl overflow-hidden"
            >
              <CardHoverRevealMain hoverScale={1.1}>
                <img
                  alt={story.title}
                  src={story.imageUrl}
                  className="size-full aspect-square object-cover"
                />
              </CardHoverRevealMain>
            </CardHoverReveal>
          ))}
        </ScrollXCarouselWrap>
        
        {/* Progress bar */}
        <ScrollXCarouselProgress
          className="bg-secondary mx-8 h-1 rounded-full overflow-hidden"
          progressStyle="size-full bg-black rounded-full"
        />
      </ScrollXCarouselContainer>
    </ScrollXCarousel>
  );
}