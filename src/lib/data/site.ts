// Contact details from the Residential Capabilities deck (v01). Discipline copy is draft.

import { carpentryGlyph, joineryGlyph, sprayingGlyph, upholsteryGlyph } from './glyphs.js';

export const contacts = [
	{
		name: 'Johnnie Wynne',
		email: 'johnnie@ewmbespokeinteriors.co.uk',
		phone: '07515 829 261'
	},
	{
		name: 'Georgie Wynne',
		email: 'georgie@ewmbespokeinteriors.co.uk',
		phone: '07734 387 217'
	}
];

export const company = {
	name: 'EWM Bespoke Interiors Ltd',
	email: 'info@ewmbespokeinteriors.co.uk',
	address: [
		'Unit 12, Nathan Way Business Park',
		'82–100 Nathan Way',
		'Thamesmead, London SE28 0FS'
	],
	hours: 'Monday to Friday, 8am to 5pm. Saturday by appointment. Closed Sunday.'
};

export const disciplines = [
	{
		title: 'Bespoke joinery',
		items: [
			'Kitchens and utilities',
			'Wardrobes and dressing rooms',
			'Media walls',
			'Vanity units'
		],
		icon: joineryGlyph
	},
	{
		title: 'Upholstery',
		items: ['Built-in seating', 'Banquettes', 'Headboards', 'Reupholstery'],
		icon: upholsteryGlyph
	},
	{
		title: 'Spraying',
		items: [
			'Farrow & Ball, Little Green, Dulux and more',
			'Water or PU-based paints',
			'Staining and sealing with Osmo',
			'Restoring existing furniture',
			'A standalone service for other makers'
		],
		icon: sprayingGlyph
	},
	{
		title: 'Carpentry',
		items: ['First and second fix', 'Panelling', 'Staircase storage', 'Site-fitted joinery'],
		icon: carpentryGlyph
	}
];

// Sector copy from the EWM Concept Presentation (v02, page 4), lightly edited.
export const sectors = [
	{
		title: 'Residential',
		text: 'Kitchens, wardrobes, media walls and storage, designed and made to fit your home exactly.',
		image: {
			src: '/images/placeholder/sector-residential.svg',
			alt: 'Placeholder for a finished living space showing EWM joinery in context',
			width: 1200,
			height: 800
		}
	},
	{
		title: 'Retail',
		text: 'From reception desks to banquette seating, we make a wide range of pieces for shops, restaurants and showrooms to complement your design.',
		image: {
			src: '/images/placeholder/sector-retail.svg',
			alt: 'Placeholder for a reception desk or banquette in a retail space',
			width: 1200,
			height: 800
		}
	},
	{
		title: 'Heritage & Culture',
		text: 'Buildings of historic and cultural importance need a careful approach to detail and specification. We have worked in everything from Grade I listed museums to high-end art galleries, mostly on bespoke joinery and carpentry.',
		image: {
			src: '/images/placeholder/sector-heritage.svg',
			alt: 'Placeholder for joinery in a listed museum or gallery',
			width: 1200,
			height: 800
		}
	},
	{
		title: 'Cat A/B office fit-out',
		text: 'Our widest range of services: first and second fix carpentry, bespoke joinery, vanity units and office furniture. A dedicated team handles each element and works closely with yours.',
		image: {
			src: '/images/placeholder/sector-office.svg',
			alt: 'Placeholder for reception or meeting room joinery in an office',
			width: 1200,
			height: 800
		}
	}
];

// Suppliers named in the concept presentation. Logos to follow, once each brand's usage terms are checked.
export const suppliers = [
	'ASSA ABLOY',
	'Camira',
	'Egger',
	'Farrow & Ball',
	'Häfele',
	'Kronospan',
	'Kvadrat',
	'Panelco',
	'Verco'
];
